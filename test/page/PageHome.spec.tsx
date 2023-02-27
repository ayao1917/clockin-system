import React from "react";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";

import { LOCAL_STORAGE_KEYS } from "../../src/constants/localStorage";
import PageHome from "../../src/page/PageHome";
import { locationGetAction } from "../../src/store/location/actions";
import * as LocationUtils from "../../src/utils/location";

import type { ClockInHistoryRecord } from "../../src/store/clockIn/types";

const mockStore = configureMockStore();
const mockCalculateDistance = jest.fn();

const mockClockInHistory = [{
  locationInfo: "locationInfo",
  status: "clockOut",
  timestamp: 1234567890,
}] as ClockInHistoryRecord[];

const mockUserSetting = {
  latitude: 12,
  longitude: 88,
  maxDistance: 10,
};

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
      t: (str: string) => str,
    };
  },
}));

jest.mock(
  "../../src/components/Clock",
  () => {
    return {
      "default": function DummyClock() {
        return <div data-testid="clock" />;
      },
    }
  },
);

jest.mock(
  "../../src/components/ClockInButton",
  () => {
    return {
      "default": function DummyClockInButton({ onUpdate }: unknown) {
        return (
          <button data-testid="clock-in-button" onClick={() => {
            onUpdate(mockClockInHistory);
          }}>onUpdate</button>
        );
      },
    }
  },
);

jest.mock(
  "../../src/components/ClockInHistory",
  () => {
    return {
      "default": function DummyClockInHistory() {
        return <div data-testid="clock-in-history" />;
      },
    }
  },
);

jest.mock(
  "../../src/components/UserStatus",
  () => {
    return {
      "default": function DummyUserStatus() {
        return <div data-testid="user-status" />;
      },
    }
  },
);

describe("Component: PageHome", () => {
  let store: MockStoreEnhanced<unknown, {}>;
  beforeEach(() => {
    store = mockStore({
      location: {
        location: {
          latitude: 0,
          longitude: 0,
        },
      },
    });
  });

  afterEach(() => {    
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CLOCK_IN_HISTORY, JSON.stringify(mockClockInHistory));
    localStorage.setItem(LOCAL_STORAGE_KEYS.OFFICE_SETTING, JSON.stringify(mockUserSetting));
    (LocationUtils as Writeable<typeof LocationUtils>).calculateDistance = mockCalculateDistance;
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <PageHome />
        </Router>
      </Provider>
    );

    expect(getByTestId("clock")).toBeInTheDocument();
    expect(getByTestId("clock-in-history")).toBeInTheDocument();
    expect(getByTestId("user-status")).toBeInTheDocument();

    const actions = store.getActions();
    expect(actions).toContainEqual(locationGetAction());
    expect(mockCalculateDistance).toHaveBeenCalled();
  });

  it("should update clockIn history from ClockInButton", () => {
    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.setItem = jest.fn();
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <PageHome />
        </Router>
      </Provider>
    );

    fireEvent.click(getByTestId("clock-in-button"));
    expect(localStorage.setItem).toBeCalledWith(LOCAL_STORAGE_KEYS.CLOCK_IN_HISTORY, JSON.stringify(mockClockInHistory));
  });
});
