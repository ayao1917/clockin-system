import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import UserStatus from "../../src/components/UserStatus";

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

describe("Component: UserStatus", () => {
  it('should render `Please enable GPS` if location is null', () => {
    const { getByText } =  render(
      <UserStatus
        distance={null}
        location={null}
        settings={null}
      />
    );
    expect(getByText("Please enable")).toBeInTheDocument();
    expect(getByText("GPS")).toBeInTheDocument();
  });

  it('should render `Office not set` if location is null', () => {
    const { getByText } =  render(
      <UserStatus
        distance={null}
        location={{ latitude: 0, longitude: 0 }}
        settings={null}
      />
    );
    expect(getByText("Office")).toBeInTheDocument();
    expect(getByText("Not set")).toBeInTheDocument();
  });

  it('should render `You arrived` if user in range', () => {
    const { getByText } =  render(
      <UserStatus
        distance={5}
        location={{ latitude: 0, longitude: 0 }}
        settings={{ latitude: 0, longitude: 0, maxDistance: 10 }}
      />
    );
    expect(getByText("You")).toBeInTheDocument();
    expect(getByText("Arrived")).toBeInTheDocument();
  });

  it('should render distance info if out of range', () => {
    const { getByText } =  render(
      <UserStatus
        distance={11}
        location={{ latitude: 0, longitude: 0 }}
        settings={{ latitude: 0, longitude: 0, maxDistance: 10 }}
      />
    );
    expect(getByText("You are distance")).toBeInTheDocument();
    expect(getByText("Away from office")).toBeInTheDocument();
  });
});


