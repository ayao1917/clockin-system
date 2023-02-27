import React from 'react';
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import Header from "../../src/components/Header";

jest.mock(
  "../../src/components/LanguageDropdown",
  () => {
    return {
      "default": function DummyLanguageDropdown() {
        return <div data-testid="language-dropdown" />;
      },
    }
  },
);

describe("Component: Header", () => {
  it('should render correctly', () => {
    const { getByTestId } =  render(<Header />);
    expect(getByTestId("language-dropdown")).toBeInTheDocument();
  });
});
