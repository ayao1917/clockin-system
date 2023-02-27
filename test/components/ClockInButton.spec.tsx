import React from "react";
import { Provider } from "react-redux";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";

import ClockInButton from "../../src/components/ClockInButton";

import type { ClockInHistoryRecord } from "../../src/store/clockIn/types";

const mockStore = configureMockStore();

const mockClockInHistory = [{
  locationInfo: "locationInfo",
  status: "clockOut",
  timestamp: new Date().getTime(),
}] as ClockInHistoryRecord[];

const mockOnUpdate = jest.fn();

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

describe("Component: ClockInButton", () => {
  let store: MockStoreEnhanced<unknown, {}>;
  beforeEach(() => {
    store = mockStore({
      location: {
        locationInfo: "locationInfo",
      },
    });
  });

  afterEach(() => {    
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <ClockInButton
          clockInHistory={mockClockInHistory}
          distance={5}
          maxDistance={10}
          onUpdate={mockOnUpdate}
        />
      </Provider>
    );

    expect(getByRole("button")).toHaveTextContent("Clock In");
  });

  it("should call onUpdate when click on button", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <ClockInButton
          clockInHistory={mockClockInHistory}
          distance={5}
          maxDistance={10}
          onUpdate={mockOnUpdate}
        />
      </Provider>
    );

    fireEvent.click(getByRole("button"));
    expect(mockOnUpdate).toHaveBeenCalled();
  });

  it("should not call onUpdate if locationInfo is null when click on button", () => {
    const { getByRole } = render(
      <Provider store={mockStore({
        location: {
          locationInfo: null,
        },
      })}>
        <ClockInButton
          clockInHistory={mockClockInHistory}
          distance={5}
          maxDistance={10}
          onUpdate={mockOnUpdate}
        />
      </Provider>
    );

    fireEvent.click(getByRole("button"));
    expect(mockOnUpdate).not.toHaveBeenCalled();
  });
});
