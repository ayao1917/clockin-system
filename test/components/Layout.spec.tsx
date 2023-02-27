import React from 'react';
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import Layout from "../../src/components/Layout";

jest.mock(
  "../../src/components/Header",
  () => {
    return {
      "default": function DummyHeader() {
        return <div data-testid="header" />;
      },
    }
  },
);

describe("Component: Header", () => {
  it('should render correctly', () => {
    const { getByTestId } =  render(
      <Layout>
        <span>123</span>
      </Layout>
    );
    expect(getByTestId("header")).toBeInTheDocument();
  });
});
