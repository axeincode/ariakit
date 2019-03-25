import { mergeProps } from "../utils/mergeProps";
import { unstable_createComponent } from "../utils/createComponent";
import { useHook } from "../system/useHook";
import {
  unstable_DialogDisclosureOptions,
  unstable_DialogDisclosureProps,
  useDialogDisclosure
} from "../Dialog/DialogDisclosure";
import { Keys } from "../__utils/types";
import { usePopoverState, unstable_PopoverStateReturn } from "./PopoverState";

export type unstable_PopoverDisclosureOptions = unstable_DialogDisclosureOptions &
  Partial<unstable_PopoverStateReturn>;

export type unstable_PopoverDisclosureProps = unstable_DialogDisclosureProps;

export function usePopoverDisclosure(
  options: unstable_PopoverDisclosureOptions,
  htmlProps: unstable_PopoverDisclosureProps = {}
) {
  htmlProps = mergeProps(
    {
      ref: options.unstable_referenceRef
    } as typeof htmlProps,
    htmlProps
  );
  htmlProps = useDialogDisclosure(options, htmlProps);
  htmlProps = useHook("usePopoverDisclosure", options, htmlProps);
  return htmlProps;
}

const keys: Keys<unstable_PopoverDisclosureOptions> = [
  ...useDialogDisclosure.__keys,
  ...usePopoverState.__keys
];

usePopoverDisclosure.__keys = keys;

export const PopoverDisclosure = unstable_createComponent({
  as: "button",
  useHook: usePopoverDisclosure
});
