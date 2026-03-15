# @mekanysmos/react-smooth-dnd

A fast and lightweight drag & drop, sortable library for React with many configuration options covering many d&d scenarios. Uses CSS transitions for hardware-accelerated animations.

This is a modernized fork of [react-smooth-dnd](https://github.com/kutlugsahin/react-smooth-dnd), updated for **React 17, 18, and 19** compatibility.

## What changed from the original

- Functional components with hooks (no more class components)
- Removed `prop-types` dependency (TypeScript handles validation)
- No `defaultProps` (removed in React 19)
- Modern build tooling (Rollup 4, TypeScript 5)
- ESM + UMD output

## Installation

```shell
npm i @mekanysmos/react-smooth-dnd
```

## Usage

```tsx
import { Container, Draggable } from '@mekanysmos/react-smooth-dnd';

function SimpleSortableList({ items, onDrop, renderItem }) {
  return (
    <Container onDrop={onDrop}>
      {items.map((item) => (
        <Draggable key={item.id}>
          {renderItem(item)}
        </Draggable>
      ))}
    </Container>
  );
}
```

## API

### Container

Component that contains the draggable elements. Each child should be wrapped by a **Draggable** component.

#### Props

| Property | Type | Default | Description |
|-|:-:|:-:|-|
| children | Draggable | null | Should be of type **Draggable** |
| orientation | string | `vertical` | `horizontal` or `vertical` |
| behaviour | string | `move` | `move`, `copy`, `drop-zone` or `contain` |
| groupName | string | `undefined` | Containers with the same group name can exchange draggables |
| lockAxis | string | `undefined` | Lock movement to `x` or `y` axis |
| dragHandleSelector | string | `undefined` | CSS selector to enable dragging |
| nonDragAreaSelector | string | `undefined` | CSS selector to prevent dragging. Precedence over `dragHandleSelector` |
| dragBeginDelay | number | `0` (`200` touch) | Delay in ms before drag starts |
| animationDuration | number | `250` | Animation duration in ms |
| autoScrollEnabled | boolean | `true` | Auto-scroll nearest scrollable parent |
| dragClass | string | `undefined` | Class added to ghost element on drag |
| dropClass | string | `undefined` | Class added to ghost element before drop animation |
| removeOnDropOut | boolean | `undefined` | Call onDrop with removedIndex when dropped outside |
| dropPlaceholder | boolean \| object | `undefined` | Options: `className`, `animationDuration`, `showOnTop` |
| onDragStart | function | `undefined` | Called by all containers when drag starts |
| onDragEnd | function | `undefined` | Called by all containers when drag ends |
| onDropReady | function | `undefined` | Called when drop position index changes |
| onDrop | function | `undefined` | Called when drop is complete |
| getChildPayload | function | `undefined` | Returns payload for a child by index |
| shouldAnimateDrop | function | `undefined` | Return `false` to disable drop animation |
| shouldAcceptDrop | function | `undefined` | Overrides `groupName` to control drop acceptance |
| onDragEnter | function | `undefined` | Called when dragged item enters container |
| onDragLeave | function | `undefined` | Called when dragged item leaves container |
| getGhostParent | function | `undefined` | Returns element to append ghost to |
| render | function | `undefined` | Custom root element renderer |

#### Callback signatures

```ts
// onDragStart / onDragEnd
function onDragStart({ isSource, payload, willAcceptDrop }) { }

// onDrop / onDropReady
function onDrop({ removedIndex, addedIndex, payload, element }) { }

// getChildPayload
function getChildPayload(index: number) { return payload; }

// shouldAnimateDrop / shouldAcceptDrop
function shouldAnimateDrop(sourceContainerOptions, payload) { return true; }

// render
function render(ref: React.RefObject) { return <ul ref={ref}>...</ul>; }
```

#### Custom render example

```tsx
<Container render={(ref) => (
  <ul ref={ref}>
    <Draggable key="1"><li>Item 1</li></Draggable>
    <Draggable key="2"><li>Item 2</li></Draggable>
  </ul>
)} />
```

### Draggable

Wrapper component for Container's children. Every draggable element should be wrapped with **Draggable**.

> Set a unique `key` on each Draggable, especially when nesting Containers.

#### Props

| Property | Type | Default | Description |
|-|:-:|:-:|-|
| render | function | `undefined` | Custom root element renderer |
| className | string | `undefined` | Additional CSS class |

```tsx
<Draggable render={() => (
  <li>Drag me</li>
)} />
```

## License

MIT - Originally by [Kutlu Sahin](https://github.com/kutlugsahin), modernized by [Mekanysmos](https://github.com/lucasferreiraeng).
