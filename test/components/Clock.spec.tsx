import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import Clock from "../../src/components/Clock";

describe("Component: Clock", () => {
  it('should render correctly', () => {
    const now = new Date();
    const { getByText } =  render(<Clock />);
    const hour = (now.getHours() % 12) || 12;
    const minute = now.getMinutes();
    const isPm = now.getHours() >= 12;
    const hourText = `${hour}`.padStart(2, "0");
    const minuteText = `${minute}`.padStart(2, "0");
    const dayText = isPm ? "P.M." : "A.M.";
    expect(getByText(`${hourText}:${minuteText}`)).toBeInTheDocument();
    expect(getByText(dayText)).toBeInTheDocument();
  });
});


