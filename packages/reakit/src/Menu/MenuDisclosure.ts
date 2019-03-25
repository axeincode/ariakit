import { mergeProps } from "../utils/mergeProps";
import { unstable_createComponent } from "../utils/createComponent";
import { useHook } from "../system/useHook";
import {
  unstable_PopoverDisclosureOptions,
  unstable_PopoverDisclosureProps,
  usePopoverDisclosure
} from "../Popover/PopoverDisclosure";
import { Keys } from "../__utils/types";
import { useMenuState, unstable_MenuStateReturn } from "./MenuState";

export type unstable_MenuDisclosureOptions = unstable_PopoverDisclosureOptions &
  Partial<unstable_MenuStateReturn> &
  Pick<
    unstable_MenuStateReturn,
    "placement" | "show" | "unstable_first" | "unstable_last"
  >;

export type unstable_MenuDisclosureProps = unstable_PopoverDisclosureProps;

export function useMenuDisclosure(
  options: unstable_MenuDisclosureOptions,
  htmlProps: unstable_MenuDisclosureProps = {}
) {
  const [dir] = options.placement.split("-");

  htmlProps = mergeProps(
    {
      "aria-haspopup": "menu",
      onKeyDown: event => {
        const keyMap = {
          ArrowUp:
            dir === "top" || dir === "bottom" ? options.unstable_last : false,
          ArrowRight: dir === "right" && options.unstable_first,
          ArrowDown:
            dir === "bottom" || dir === "top" ? options.unstable_first : false,
          ArrowLeft: dir === "left" && options.unstable_first
        };
        if (event.key in keyMap) {
          const key = event.key as keyof typeof keyMap;
          const action = keyMap[key];
          if (typeof action === "function") {
            event.preventDefault();
            options.show();
            action();
          }
        }
      }
    } as typeof htmlProps,
    htmlProps
  );

  htmlProps = usePopoverDisclosure(options, htmlProps);
  htmlProps = useHook("useMenuDisclosure", options, htmlProps);
  return htmlProps;
}

const keys: Keys<unstable_MenuDisclosureOptions> = [
  ...usePopoverDisclosure.__keys,
  ...useMenuState.__keys
];

useMenuDisclosure.__keys = keys;

export const MenuDisclosure = unstable_createComponent({
  as: "button",
  useHook: useMenuDisclosure
});
