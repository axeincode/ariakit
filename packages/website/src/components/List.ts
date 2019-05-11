import { css, cx } from "emotion";
import { useBox, BoxProps, BoxOptions } from "reakit";
import { unstable_createHook } from "reakit/utils/createHook";
import { unstable_createComponent } from "reakit/utils/createComponent";

export type ListOptions = BoxOptions;
export type ListHTMLProps = BoxProps;
export type ListProps = ListOptions & ListHTMLProps;

export const useList = unstable_createHook<ListOptions, ListHTMLProps>({
  name: "List",
  compose: useBox,

  useProps(_, htmlProps) {
    const list = css`
      line-height: 1.5;
      li {
        margin-bottom: 0.5em;
      }
      #props ~ & {
        & > li {
          li {
            margin: 0;
          }
          strong ~ code {
            color: indianred;
          }
          margin-bottom: 1.5em;
          p {
            margin: 0.5em 0 0;
          }
        }
      }
    `;
    return { ...htmlProps, className: cx(list, htmlProps.className) };
  }
});

const List = unstable_createComponent({
  as: "ul",
  useHook: useList
});

export default List;
