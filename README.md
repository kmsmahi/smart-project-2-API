# JavaScript ES6+ Fundamentals Guide

This documentation provides a comprehensive breakdown of the modern JavaScript concepts used in the development of the Green Earth Initiative project.

---

## 1. Difference between `var`, `let`, and `const`

ES6 introduced `let` and `const` to solve issues related to scope and variable hoisting found in the traditional `var` declaration.

| Feature | `var` | `let` | `const` |
| :--- | :--- | :--- | :--- |
| **Scope** | Function Scope | Block Scope `{}` | Block Scope `{}` |
| **Hoisting** | Hoisted with `undefined` | Hoisted (Temporal Dead Zone) | Hoisted (Temporal Dead Zone) |
| **Re-assignable** | Yes | Yes | **No** |
| **Redeclarable** | Yes | No | No |

**Recommendation:** Default to `const`. Use `let` only if the value must change. Avoid `var` entirely.

---

## 2. `map()`, `forEach()`, and `filter()`

These higher-order functions are used to manipulate arrays efficiently without manual loops.



* **`forEach()`**: Executes a function for each element. It returns `undefined`. Use it when you need to perform an action (like updating the DOM) for every item.
* **`map()`**: Creates a **new array** by applying a function to every element of the original array. Use it to transform data.
* **`filter()`**: Creates a **new array** containing only the elements that pass a specific test (truthy condition).

---

## 3. Arrow Functions

Arrow functions provide a more concise syntax for writing function expressions and inherit the `this` value from the enclosing lexical scope.

```javascript
// Traditional Function
function getDiscount(price) {
    return price * 0.1;
}

// ES6 Arrow Function
const getDiscount = (price) => price * 0.1;