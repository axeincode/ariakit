---
path: /docs/separator/
redirect_from:
  - /components/divider/
---

# Separator

`Separator` is a static structure that provides a visible boundary for elements. It implements the [WAI-ARIA Separator Role](https://www.w3.org/TR/wai-aria-1.1/#separator).

<carbon-ad></carbon-ad>

## Installation

```sh
npm install reakit
```

Learn more in [Get started](/docs/get-started/).

## Usage

```jsx
import { Separator } from "reakit/Separator";

function Example() {
  return <Separator orientation="vertical" />;
}
```

## Accessibility

- `Separator` has role `separator`.

Learn more in [Accessibility](/docs/accessibility/).

## Composition

- `Separator` uses [Box](/docs/box/), and is used by [MenuSeparator](/docs/menu/) and [ToolbarSeparator](/docs/toolbar/).

Learn more in [Composition](/docs/composition/#props-hooks).

## Props

<!-- Automatically generated -->

### `Separator`

- **`orientation`**
  <code>&#34;horizontal&#34; | &#34;vertical&#34; | undefined</code>

  Separator's context orientation.
The actual separator's orientation will be flipped based on this prop.
So a `"vertical"` orientation means that the separator will have a
`"horizontal"` orientation.
