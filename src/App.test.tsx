import { render } from "@testing-library/react";
import React from "react";
import App from "./App";

test("renders learn react link", () => {
  const itRendered = render(<App />);
  console.log(itRendered);

  expect(itRendered).toBeDefined();
});
