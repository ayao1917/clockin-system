import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";

import LanguageDropdown from "../../src/components/LanguageDropdown";
import { LOCAL_STORAGE_KEYS } from "../../src/constants/localStorage";

jest.mock(
  "../../src/i18n",
  () => {
    return {
      "default": {
        changeLanguage: jest.fn(),
      },
    }
  },
);

describe("Component: LanguageDropdown", () => {
  it('should render correctly', () => {
    const { getByRole } =  render(<LanguageDropdown />);

    expect(getByRole("combobox")).toHaveValue("en");
  });

  it("should change language correctly", () => {
    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.setItem = jest.fn();
    const { getByRole } =  render(<LanguageDropdown />);

    fireEvent.change(getByRole("combobox"), { target: { value: "tw" } });
    expect(localStorage.setItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.LANGUAGE, "tw");
  });
});
