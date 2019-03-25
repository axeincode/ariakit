import * as React from "react";
import { render } from "react-testing-library";
import { unstable_FormRadioGroup as FormRadioGroup } from "../FormRadioGroup";

test("render", () => {
  const { baseElement } = render(
    <FormRadioGroup baseId="base" touched={{ a: true }} errors={{}} name="a" />
  );
  expect(baseElement).toMatchInlineSnapshot(`
<body>
  <div>
    <fieldset
      aria-describedby="base-a-message"
      aria-invalid="false"
      aria-labelledby="base-a-label"
      id="base-a"
      role="radiogroup"
    />
  </div>
</body>
`);
});
