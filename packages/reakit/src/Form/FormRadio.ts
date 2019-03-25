import * as React from "react";
import { unstable_BoxOptions, useBox } from "../Box";
import {
  unstable_RadioOptions,
  unstable_RadioProps,
  unstable_useRadio
} from "../Radio/Radio";
import { useHook } from "../system/useHook";
import { unstable_createComponent } from "../utils/createComponent";
import { mergeProps } from "../utils/mergeProps";
import { As, PropsWithAs, Keys } from "../__utils/types";
import { FormRadioGroupContext } from "./FormRadioGroup";
import { unstable_FormStateReturn, unstable_useFormState } from "./FormState";
import { unstable_getIn } from "./utils/getIn";
import { formatInputName } from "./__utils/formatInputName";
import { DeepPath, DeepPathValue } from "./__utils/types";

export type unstable_FormRadioOptions<
  V,
  P extends DeepPath<V, P>
> = unstable_BoxOptions &
  Partial<unstable_FormStateReturn<V>> &
  Pick<unstable_FormStateReturn<V>, "values" | "update" | "blur"> & {
    /** TODO: Description */
    name: P;
    /** TODO: Description */
    value: DeepPathValue<V, P>;
  };

export type unstable_FormRadioProps = unstable_RadioProps;

export function unstable_useFormRadio<V, P extends DeepPath<V, P>>(
  options: unstable_FormRadioOptions<V, P>,
  htmlProps: unstable_FormRadioProps = {}
) {
  const rover = React.useContext(FormRadioGroupContext);

  if (!rover) {
    // TODO: Better error
    throw new Error("Missing FormRadioGroup");
  }

  const currentChecked = unstable_getIn(options.values, options.name);
  const checked = currentChecked === options.value;
  const allOptions: unstable_RadioOptions = { ...rover, ...options, checked };

  htmlProps = mergeProps(
    {
      name: formatInputName(options.name),
      onChange: () => options.update(options.name, options.value),
      onBlur: () => options.blur(options.name),
      onFocus: () => options.update(options.name, options.value)
    } as typeof htmlProps,
    htmlProps
  );

  htmlProps = unstable_useRadio(allOptions, htmlProps);
  htmlProps = useHook("useFormRadio", allOptions, htmlProps);
  return htmlProps;
}

const keys: Keys<unstable_FormRadioOptions<any, any>> = [
  ...useBox.__keys,
  ...unstable_useFormState.__keys,
  "name",
  "value"
];

unstable_useFormRadio.__keys = keys;

export const unstable_FormRadio = (unstable_createComponent({
  as: "input",
  useHook: unstable_useFormRadio
}) as unknown) as <V, P extends DeepPath<V, P>, T extends As = "input">(
  props: PropsWithAs<unstable_FormRadioOptions<V, P>, T>
) => JSX.Element;
