import { unstable_createComponent } from "../utils/createComponent";
import { useHook } from "../system/useHook";
import {
  unstable_SeparatorOptions,
  unstable_SeparatorProps,
  useSeparator
} from "../Separator/Separator";
import { Keys } from "../__utils/types";
import { useToolbarState, unstable_ToolbarStateReturn } from "./ToolbarState";

export type unstable_ToolbarSeparatorOptions = unstable_SeparatorOptions &
  Partial<unstable_ToolbarStateReturn>;

export type unstable_ToolbarSeparatorProps = unstable_SeparatorProps;

export function useToolbarSeparator(
  options: unstable_ToolbarSeparatorOptions,
  htmlProps: unstable_ToolbarSeparatorProps = {}
) {
  htmlProps = useSeparator(options, htmlProps);
  htmlProps = useHook("useToolbarSeparator", options, htmlProps);
  return htmlProps;
}

const keys: Keys<unstable_ToolbarSeparatorOptions> = [
  ...useSeparator.__keys,
  ...useToolbarState.__keys
];

useToolbarSeparator.__keys = keys;

export const ToolbarSeparator = unstable_createComponent({
  as: "hr",
  useHook: useToolbarSeparator
});
