import * as React from "react";
import { render } from "react-testing-library";
import { unstable_FormRemoveButton as FormRemoveButton } from "../FormRemoveButton";

test("render", () => {
  const { baseElement } = render(
    <FormRemoveButton
      baseId="base"
      name="a"
      index={1}
      values={{ a: ["a", "b"] }}
      remove={jest.fn()}
    />
  );
  expect(baseElement).toMatchInlineSnapshot(`
<body>
  <div>
    <button
      role="button"
      tabindex="0"
      type="button"
    />
  </div>
</body>
`);
});
