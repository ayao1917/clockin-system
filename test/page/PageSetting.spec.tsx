import React from "react";
import { HashRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";

import { LOCAL_STORAGE_KEYS } from "../../src/constants/localStorage";
import PageSetting from "../../src/page/PageSetting";

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

describe("Component: PageSetting", () => {
  it('should render correctly', () => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.OFFICE_SETTING, JSON.stringify(mockUserSetting));
    const { getByText } =  render(
      <Router>
        <PageSetting />
      </Router>
    );

    expect(getByText("Settings")).toBeInTheDocument();
    expect(getByText("Set clockIn range")).toBeInTheDocument();
    expect(getByText("Range in KM")).toBeInTheDocument();
    expect(getByText("Set office location")).toBeInTheDocument();
    expect(getByText("Latitude")).toBeInTheDocument();
    expect(getByText("Longitude")).toBeInTheDocument();
  });

  it("should store form value", () => {
    jest.spyOn(window, 'alert');
    window.alert = jest.fn();
    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.setItem = jest.fn();
    localStorage.setItem(LOCAL_STORAGE_KEYS.OFFICE_SETTING, JSON.stringify(mockUserSetting));
    const { getByRole, getByText } =  render(
      <Router>
        <PageSetting />
      </Router>
    );

    const mockLatitudeInput = 12;
    const mockLongitudeInput = 34;
    const mockClockinRangeInput = 10;
    fireEvent.change(getByRole("spinbutton", { name: "Latitude" }), { target: { value: mockLatitudeInput } });
    fireEvent.change(getByRole("spinbutton", { name: "Longitude" }), { target: { value: mockLongitudeInput } });
    fireEvent.change(getByRole("slider", { name: "Range in KM" }), { target: { value: mockClockinRangeInput } });
    fireEvent.click(getByText("Save"));
    expect(localStorage.setItem).toBeCalledWith(LOCAL_STORAGE_KEYS.OFFICE_SETTING, JSON.stringify({
      latitude: mockLatitudeInput,
      longitude: mockLongitudeInput,
      maxDistance: mockClockinRangeInput,
    }));
  });
});


