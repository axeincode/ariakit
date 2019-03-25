import * as React from "react";
import { unstable_RoverStateReturn, useRoverState } from "../Rover/RoverState";
import { useHook } from "../system/useHook";
import { unstable_createComponent } from "../utils/createComponent";
import { mergeProps } from "../utils/mergeProps";
import { unstable_useCreateElement } from "../utils/useCreateElement";
import { As, PropsWithAs, Keys } from "../__utils/types";
import {
  unstable_FormGroupOptions,
  unstable_FormGroupProps,
  unstable_useFormGroup
} from "./FormGroup";
import { unstable_FormStateReturn, unstable_useFormState } from "./FormState";
import { DeepPath } from "./__utils/types";

export type unstable_FormRadioGroupOptions<
  V,
  P extends DeepPath<V, P>
> = unstable_FormGroupOptions<V, P> &
  Partial<unstable_FormStateReturn<V>> & {
    /** TODO: Description */
    name: P;
  };

export type unstable_FormRadioGroupProps = unstable_FormGroupProps &
  React.FieldsetHTMLAttributes<any>;

export const FormRadioGroupContext = React.createContext<unstable_RoverStateReturn | null>(
  null
);

export function unstable_useFormRadioGroup<V, P extends DeepPath<V, P>>(
  options: unstable_FormRadioGroupOptions<V, P>,
  htmlProps: unstable_FormRadioGroupProps = {}
) {
  htmlProps = mergeProps({ role: "radiogroup" } as typeof htmlProps, htmlProps);
  htmlProps = unstable_useFormGroup(options, htmlProps);
  htmlProps = useHook("useFormRadioGroup", options, htmlProps);
  return htmlProps;
}

const keys: Keys<unstable_FormRadioGroupOptions<any, any>> = [
  ...unstable_useFormGroup.__keys,
  ...unstable_useFormState.__keys,
  "name"
];

unstable_useFormRadioGroup.__keys = keys;

export const unstable_FormRadioGroup = (unstable_createComponent({
  as: "fieldset",
  useHook: unstable_useFormRadioGroup,
  useCreateElement: (type, props, children) => {
    const element = unstable_useCreateElement(type, props, children);
    const rover = useRoverState({ unstable_loop: true });
    const value = React.useMemo(() => rover, [
      rover.unstable_stops,
      rover.unstable_currentId,
      rover.unstable_pastId
    ]);
    return (
      <FormRadioGroupContext.Provider value={value}>
        {element}
      </FormRadioGroupContext.Provider>
    );
  }
}) as unknown) as <V, P extends DeepPath<V, P>, T extends As = "fieldset">(
  props: PropsWithAs<unstable_FormRadioGroupOptions<V, P>, T>
) => JSX.Element;
