import * as React from "react";
import { render } from "react-testing-library";
import { unstable_FormSubmitButton as FormSubmitButton } from "../FormSubmitButton";

test("render", () => {
  const { baseElement } = render(
    <FormSubmitButton baseId="base" submit={jest.fn()} />
  );
  expect(baseElement).toMatchInlineSnapshot(`
<body>
  <div>
    <button
      role="button"
      tabindex="0"
      type="submit"
    />
  </div>
</body>
`);
});
