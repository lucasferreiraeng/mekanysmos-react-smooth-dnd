# @mekanysmos/react-smooth-dnd

A fast and lightweight drag & drop, sortable library for React with many configuration options covering many d&d scenarios. Uses CSS transitions for hardware-accelerated animations.

This is a modernized fork of [react-smooth-dnd](https://github.com/kutlugsahin/react-smooth-dnd), updated for **React 17, 18, and 19** compatibility.

## What changed from the original

- Functional components with hooks (no more class components)
- Polymorphic `as` prop — render as any HTML element (`ul`, `section`, `main`, etc.)
- Full `ref` forwarding support
- Full HTML attribute pass-through (`className`, `style`, `id`, `data-*`, `aria-*`, etc.)
- Type-safe props with autocomplete for each element type
- Removed `prop-types` dependency
- No `defaultProps` (removed in React 19)
- 100% TypeScript source
- Modern build tooling (Rollup 4, TypeScript 5)
- ESM + UMD output

## Installation

```shell
npm i @mekanysmos/react-smooth-dnd
```

## Quick start

```tsx
import { Container, Draggable } from '@mekanysmos/react-smooth-dnd';

function SortableList({ items, onDrop }) {
  return (
    <Container onDrop={onDrop}>
      {items.map((item) => (
        <Draggable key={item.id}>
          {item.content}
        </Draggable>
      ))}
    </Container>
  );
}
```

## Full customization

### Polymorphic `as` prop

Render the container or draggable as any HTML element:

```tsx
<Container as="ul" className="my-list" onDrop={handleDrop}>
  <Draggable as="li" className="my-item" key="1">
    Item 1
  </Draggable>
  <Draggable as="li" className="my-item" key="2">
    Item 2
  </Draggable>
</Container>
```

### All HTML attributes supported

```tsx
<Container
  as="section"
  id="kanban-board"
  className="board"
  style={{ display: 'flex', gap: '1rem' }}
  data-testid="board"
  aria-label="Kanban board"
  orientation="horizontal"
  onDrop={handleDrop}
>
  {columns.map((col) => (
    <Draggable
      as="article"
      key={col.id}
      className="column"
      data-column-id={col.id}
      aria-label={col.title}
    >
      {col.content}
    </Draggable>
  ))}
</Container>
```

### Ref forwarding

```tsx
function MyComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLElement>(null);

  return (
    <Container ref={containerRef} onDrop={handleDrop}>
      <Draggable ref={itemRef} key="1">
        Content
      </Draggable>
    </Container>
  );
}
```

### Legacy render prop (still supported)

```tsx
<Container render={(ref) => (
  <ul ref={ref}>
    <Draggable key="1"><li>Item 1</li></Draggable>
  </ul>
)} />
```

## API

### Container

Component that contains the draggable elements. Each child should be wrapped by a **Draggable** component.

#### Props

| Property | Type | Default | Description |
|-|:-:|:-:|-|
| as | string | `'div'` | HTML element to render as |
| children | ReactNode | — | Should be **Draggable** components |
| ref | Ref | — | Forwarded ref to root element |
| className | string | — | CSS class name |
| style | CSSProperties | — | Inline styles |
| orientation | string | `'vertical'` | `'horizontal'` or `'vertical'` |
| behaviour | string | `'move'` | `'move'`, `'copy'`, `'drop-zone'` or `'contain'` |
| groupName | string | — | Containers with same group name can exchange draggables |
| lockAxis | string | — | Lock movement to `'x'` or `'y'` |
| dragHandleSelector | string | — | CSS selector to enable dragging |
| nonDragAreaSelector | string | — | CSS selector to prevent dragging |
| dragBeginDelay | number | `0` (`200` touch) | Delay in ms before drag starts |
| animationDuration | number | `250` | Animation duration in ms |
| autoScrollEnabled | boolean | `true` | Auto-scroll nearest scrollable parent |
| dragClass | string | — | Class added to ghost element on drag |
| dropClass | string | — | Class added to ghost element before drop |
| removeOnDropOut | boolean | — | Call onDrop with removedIndex when dropped outside |
| dropPlaceholder | boolean \| object | — | Options: `className`, `animationDuration`, `showOnTop` |
| onDragStart | function | — | Called when drag starts |
| onDragEnd | function | — | Called when drag ends |
| onDropReady | function | — | Called when drop position index changes |
| onDrop | function | — | Called when drop is complete |
| getChildPayload | function | — | Returns payload for a child by index |
| shouldAnimateDrop | function | — | Return `false` to disable drop animation |
| shouldAcceptDrop | function | — | Override `groupName` to control drop acceptance |
| onDragEnter | function | — | Called when dragged item enters container |
| onDragLeave | function | — | Called when dragged item leaves container |
| getGhostParent | function | — | Returns element to append ghost to |
| render | function | — | *(deprecated)* Custom root renderer |

Plus **any valid HTML attribute** for the chosen element (`id`, `data-*`, `aria-*`, etc.).

#### Callback signatures

```ts
function onDragStart({ isSource, payload, willAcceptDrop }) {}
function onDragEnd({ isSource, payload, willAcceptDrop }) {}
function onDrop({ removedIndex, addedIndex, payload, element }) {}
function onDropReady({ removedIndex, addedIndex, payload, element }) {}
function getChildPayload(index: number) { return payload; }
function shouldAnimateDrop(sourceContainerOptions, payload) { return true; }
function shouldAcceptDrop(sourceContainerOptions, payload) { return true; }
```

### Draggable

Wrapper component for Container's children.

> Set a unique `key` on each Draggable, especially when nesting Containers.

#### Props

| Property | Type | Default | Description |
|-|:-:|:-:|-|
| as | string | `'div'` | HTML element to render as |
| children | ReactNode | — | Content |
| ref | Ref | — | Forwarded ref to root element |
| className | string | — | CSS class name (merged with internal wrapper class) |
| style | CSSProperties | — | Inline styles |
| render | function | — | *(deprecated)* Custom root renderer |

Plus **any valid HTML attribute** for the chosen element.

## TypeScript

Full type inference for the `as` prop:

```tsx
// TypeScript knows these are <li> props
<Draggable as="li" value="test"> // ✓ valid li attribute
<Draggable as="li" href="/foo">  // ✗ compile error: href not valid on li

// Import types for custom use
import type { ContainerProps, DraggableProps } from '@mekanysmos/react-smooth-dnd';
```

## License

MIT - Originally by [Kutlu Sahin](https://github.com/kutlugsahin), modernized by [Mekanysmos](https://github.com/lucasferreiraeng).
