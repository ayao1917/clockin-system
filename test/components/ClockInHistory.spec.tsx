import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import ClockInHistory from "../../src/components/ClockInHistory";

import type { ClockInHistoryRecord } from "../../src/store/clockIn/types";

const mockClockInHistory = [
  {
    locationInfo: "locationInfo1",
    status: "clockOut",
    timestamp: 1677424570427,
  },
  {
    locationInfo: "locationInfo2",
    status: "clockIn",
    timestamp: 1677424570428,
  },
] as ClockInHistoryRecord[];

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

describe("Component: ClockInHistory", () => {
  it("should render correctly", () => {
    const { getByText } = render(
      <ClockInHistory clockInHistory={mockClockInHistory} />
    );

    mockClockInHistory.forEach(history => {
      expect(getByText(history.locationInfo)).toBeInTheDocument();
    });
  });
});
