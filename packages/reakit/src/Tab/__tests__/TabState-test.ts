import { renderHook } from "react-hooks-testing-library";
import { useTabState } from "../TabState";
import { jestSerializerStripFunctions } from "../../__utils/jestSerializerStripFunctions";

expect.addSnapshotSerializer(jestSerializerStripFunctions);

function render(...args: Parameters<typeof useTabState>) {
  return renderHook(() => useTabState(...args)).result;
}

test("initial state", () => {
  const result = render({ unstable_baseId: "base" });
  expect(result.current).toMatchInlineSnapshot(`
Object {
  "unstable_baseId": "base",
  "unstable_currentId": null,
  "unstable_loop": true,
  "unstable_manual": false,
  "unstable_pastId": null,
  "unstable_selectedId": null,
  "unstable_stops": Array [],
}
`);
});

test("initial state selectedId", () => {
  const result = render({ unstable_baseId: "base", unstable_selectedId: "a" });
  expect(result.current).toMatchInlineSnapshot(
    {
      unstable_currentId: "a",
      unstable_selectedId: "a"
    },
    `
Object {
  "unstable_baseId": "base",
  "unstable_currentId": "a",
  "unstable_loop": true,
  "unstable_manual": false,
  "unstable_pastId": null,
  "unstable_selectedId": "a",
  "unstable_stops": Array [],
}
`
  );
});
