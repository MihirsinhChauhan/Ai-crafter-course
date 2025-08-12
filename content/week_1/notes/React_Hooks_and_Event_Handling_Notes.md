# React Hooks and Event Handling

## React Hooks
Hooks are functions that let you use state and other React features in functional components, introduced in React 16.8. They eliminate the need for class components in most cases, making code simpler and more reusable.

### Core Hooks

#### 1. useState
Manages state in functional components.
```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // Initial state: 0
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```
- **Syntax**: `const [state, setState] = useState(initialState);`
- `setState` updates the state and triggers a re-render.
- Can initialize with any data type (number, string, object, array, etc.).
- Use multiple `useState` calls for different state variables.

#### 2. useEffect
Handles side effects (e.g., data fetching, DOM updates, subscriptions).
```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
    return () => {
      document.title = 'React App'; // Cleanup on unmount
    };
  }, [count]); // Dependency array

  return <button onClick={() => setCount(count + 1)}>Increment</button>;
}
```
- **Syntax**: `useEffect(() => { effect; return () => { cleanup }; }, [dependencies]);`
- Runs after every render if dependencies change.
- Empty dependency array (`[]`) runs effect only once on mount.
- Cleanup function prevents memory leaks (e.g., clearing timers or subscriptions).

#### 3. useContext
Accesses context for sharing data across components without prop drilling.
```jsx
import React, { useContext } from 'react';

const ThemeContext = React.createContext('light');

function Display() {
  const theme = useContext(ThemeContext);
  return <div>Theme: {theme}</div>;
}

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Display />
    </ThemeContext.Provider>
  );
}
```
- **Syntax**: `const value = useContext(MyContext);`
- Simplifies access to global data like themes or user info.

### Additional Hooks

#### 4. useReducer
Manages complex state logic, similar to Redux.
```jsx
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
}
```
- **Syntax**: `const [state, dispatch] = useReducer(reducer, initialState);`
- Preferred for complex state transitions or when state depends on previous state.

#### 5. useCallback
Memoizes functions to prevent unnecessary re-renders.
```jsx
import React, { useState, useCallback } from 'react';

function Child({ onClick }) {
  return <button onClick={onClick}>Click me</button>;
}

function Parent() {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    console.log('Clicked!');
  }, []); // Empty deps: memoized forever

  return <Child onClick={handleClick} />;
}
```
- **Syntax**: `const memoizedCallback = useCallback(() => { ... }, [dependencies]);`
- Useful for passing callbacks to optimized child components.

#### 6. useMemo
Memoizes computed values to avoid expensive calculations.
```jsx
import React, { useState, useMemo } from 'react';

function ExpensiveComponent() {
  const [count, setCount] = useState(0);
  const expensiveValue = useMemo(() => {
    return computeExpensiveValue(count);
  }, [count]);

  return <div>{expensiveValue}</div>;
}
```
- **Syntax**: `const memoizedValue = useMemo(() => computeValue(), [dependencies]);`
- Optimizes performance by caching results.

#### 7. useRef
Creates a mutable reference that persists across renders.
```jsx
import React, { useRef } from 'react';

function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```
- **Syntax**: `const ref = useRef(initialValue);`
- Used for DOM access or persisting values without triggering re-renders.

### Custom Hooks
Combine hooks to create reusable logic.
```jsx
import { useState, useEffect } from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

function Component() {
  const { width, height } = useWindowSize();
  return <div>Window: {width}x{height}</div>;
}
```
- Name custom hooks with `use` prefix (e.g., `useWindowSize`).
- Encapsulate reusable logic for sharing across components.

### Rules of Hooks
- Only call hooks at the top level of components or custom hooks (not in loops, conditions, or nested functions).
- Only call hooks from React functional components or custom hooks.

## Event Handling
React uses synthetic events for consistent event handling across browsers.

### Basics
- Event handlers are defined in camelCase (e.g., `onClick`, `onChange`).
- Pass a function to the event handler, not a function call.
```jsx
function Button() {
  const handleClick = () => {
    console.log('Button clicked!');
  };
  return <button onClick={handleClick}>Click me</button>;
}
```
- Incorrect: `<button onClick={handleClick()}>` (calls immediately on render).
- Correct: `<button onClick={handleClick}>` (calls on click).

### Event Object
React’s synthetic events provide an event object similar to native DOM events.
```jsx
function Input() {
  const handleChange = (event) => {
    console.log(event.target.value);
  };
  return <input type="text" onChange={handleChange} />;
}
```
- Access properties like `event.target`, `event.type`, or `event.preventDefault()`.

### Common Events
- **Mouse Events**: `onClick`, `onMouseEnter`, `onMouseLeave`.
- **Form Events**: `onChange`, `onSubmit`, `onInput`.
- **Keyboard Events**: `onKeyDown`, `onKeyPress`, `onKeyUp`.
```jsx
function Form() {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={(e) => console.log(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}
```
- Note: Avoid using `<form onSubmit>` in sandboxed environments; use a button with `onClick` instead.

### Passing Arguments to Event Handlers
Use arrow functions or `bind` to pass custom arguments.
```jsx
function Item({ id, name }) {
  const handleDelete = (id) => {
    console.log(`Deleting item ${id}`);
  };
  return <button onClick={() => handleDelete(id)}>{name}</button>;
}
```

### Event Bubbling
React events follow DOM event bubbling.
```jsx
function Parent() {
  const handleParentClick = () => console.log('Parent clicked');
  return (
    <div onClick={handleParentClick}>
      <button onClick={() => console.log('Button clicked')}>Click me</button>
    </div>
  );
}
```
- Clicking the button triggers both button and parent handlers.
- Use `event.stopPropagation()` to prevent bubbling if needed.

### Performance Considerations
- Use `useCallback` for event handlers passed to memoized components to prevent re-renders.
```jsx
const MemoizedChild = React.memo(({ onClick }) => (
  <button onClick={onClick}>Click</button>
));

function Parent() {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);

  return (
    <div>
      <MemoizedChild onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>Update Count</button>
    </div>
  );
}
```

## Best Practices
- **Hooks**:
  - Use descriptive state variable names (e.g., `count` and `setCount`).
  - Break complex state into multiple `useState` calls or use `useReducer`.
  - Clean up effects to avoid memory leaks.
  - Create custom hooks for reusable logic.
- **Event Handling**:
  - Avoid inline arrow functions for frequently updated components to prevent re-renders.
  - Use `event.preventDefault()` for form submissions or links to prevent default behavior.
  - Ensure accessibility (e.g., `onKeyDown` for keyboard support).
- **General**:
  - Combine hooks and event handlers for interactive UIs.
  - Use TypeScript or PropTypes for type safety in event handlers and state.
  - Test event handlers with tools like React Testing Library.

## Example: Interactive Form with Hooks and Event Handling
<xaiArtifact artifact_id="846098a3-2d7d-4571-a2a0-fee0006d4503" artifact_version_id="717a6cc8-9af9-44f6-8361-c27649234ac5" title="index.html" contentType="text/html">
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React Form</title>
  <script src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.development.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.development.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@babel/standalone@7.18.9/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    function Form() {
      const [input, setInput] = React.useState('');
      const inputRef = React.useRef(null);

      React.useEffect(() => {
        inputRef.current.focus();
      }, []);

      const handleChange = (event) => {
        setInput(event.target.value);
      };

      const handleClick = React.useCallback(() => {
        alert(`Submitted: ${input}`);
        setInput('');
      }, [input]);

      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <h1 className="text-2xl font-bold mb-4">Input Form</h1>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleChange}
            className="p-2 border rounded mb-4"
            placeholder="Enter text"
          />
          <button
            onClick={handleClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
          <p className="mt-4">You typed: {input}</p>
        </div>
      );
    }

    ReactDOM.render(<Form />, document.getElementById('root'));
  </script>
</body>
</html>