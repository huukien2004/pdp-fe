# Coding rules and conventions

## File Naming for Class

```ts
export class PascalCaseSuffix {} //= pascal-case.suffix.ts
// Except for suffix, PascalCase to hyphen-case
class FooBarNaming {} //= foo-bar.naming.ts
class FooController {} //= foo.controller.ts
class BarQueryDto {} //= bar-query.dto.ts
```

## Interface Naming

Set "I" to the first letter of the interface's name

```ts
interface IUser {}
interface ICustomeUser extends IUser {}
interface IThirdCustomeUser extends ICustomeUser {}
```

## Index Exporting

```diff
# It is recommended to place index.ts in each folder and export.
# Unless it's a special case, it is import from a folder instead of directly from a file.
- import { FooController } from './controllers/foo.controller';
- import { BarController } from './controllers/bar.controller';
+ import { FooController, BarController } from './controllers';
# My preferred method is to place only one fileOrFolder name at the end of the path.
- import { UtilService } from '../common/providers/util.service';
+ import { UtilService } from '../common';
```

### Circular dependency

<https://docs.nestjs.com/fundamentals/circular-dependency>

```diff
# Do not use a path that ends with a dot.
- import { FooService } from '.';
- import { BarService } from '..';
+ import { FooService } from './foo.service';
+ import { BarService } from '../providers';
```

# Variables Naming

- [English language](#english-language)
- [Naming convention](#naming-convention)
- [S-I-D](#s-i-d)
- [Avoid contractions](#avoid-contractions)
- [Avoid context duplication](#avoid-context-duplication)
- [Reflect the expected result](#reflect-the-expected-result)
- [Naming functions](#naming-functions)
  - [A/HC/LC pattern](#ahclc-pattern)
    - [Actions](#actions)
    - [Context](#context)
    - [Prefixes](#prefixes)
- [Singular and Plurals](#singular-and-plurals)

---

Naming things is hard. This sheet attempts to make it easier.

Although these suggestions can be applied to any programming language, I will use JavaScript to illustrate them in practice.

## English language

Use English language when naming your variables and functions.

```ts
/* Bad */
const primerNombre = 'Gustavo';
const amigos = ['Kate', 'John'];

/* Good */
const firstName = 'Gustavo';
const friends = ['Kate', 'John'];
```

> Like it or not, English is the dominant language in programming: the syntax of all programming languages is written in English, as well as countless documentations and educational materials. By writing your code in English you dramatically increase its cohesiveness.

## Naming convention

Pick **one** naming convention and follow it. It may be `camelCase`, `PascalCase`, `snake_case`, or anything else, as long as it remains consistent. Many programming languages have their own traditions regarding naming conventions; check the documentation for your language or study some popular repositories on Github!

```ts
/* Bad */
const page_count = 5;
const shouldUpdate = true;

/* Good */
const pageCount = 5;
const shouldUpdate = true;

/* Good as well */
const page_count = 5;
const should_update = true;
```

## S-I-D

A name must be _short_, _intuitive_ and _descriptive_:

- **Short**. A name must not take long to type and, therefore, remember;
- **Intuitive**. A name must read naturally, as close to the common speech as possible;
- **Descriptive**. A name must reflect what it does/possesses in the most efficient way.

```ts
/* Bad */
const a = 5; // "a" could mean anything
const isPaginatable = a > 10; // "Paginatable" sounds extremely unnatural
const shouldPaginatize = a > 10; // Made up verbs are so much fun!

/* Good */
const postCount = 5;
const hasPagination = postCount > 10;
const shouldPaginate = postCount > 10; // alternatively
```

## Avoid contractions

Do **not** use contractions. They contribute to nothing but decreased readability of the code. Finding a short, descriptive name may be hard, but contraction is not an excuse for not doing so.

```ts
/* Bad */
const onItmClk = () => {};

/* Good */
const onItemClick = () => {};
```

## Avoid context duplication

A name should not duplicate the context in which it is defined. Always remove the context from a name if that doesn't decrease its readability.

```ts
class MenuItem {
  /* Method name duplicates the context (which is "MenuItem") */
  handleMenuItemClick = (event) => { ... }

  /* Reads nicely as `MenuItem.handleClick()` */
  handleClick = (event) => { ... }
}
```

## Reflect the expected result

A name should reflect the expected result.

```tsx
/* Bad */
const isEnabled = itemCount > 3;
return <Button disabled={!isEnabled} />;

/* Good */
const isDisabled = itemCount <= 3;
return <Button disabled={isDisabled} />;
```

---

## Naming functions

### A/HC/LC Pattern

There is a useful pattern to follow when naming functions:

```
prefix? + action (A) + high context (HC) + low context? (LC)
```

Take a look at how this pattern may be applied in the table below.

| Name                   | Prefix   | Action (A) | High context (HC) | Low context (LC) |
| ---------------------- | -------- | ---------- | ----------------- | ---------------- |
| `getUser`              |          | `get`      | `User`            |                  |
| `getUserMessages`      |          | `get`      | `User`            | `Messages`       |
| `handleClickOutside`   |          | `handle`   | `Click`           | `Outside`        |
| `shouldDisplayMessage` | `should` | `Display`  | `Message`         |                  |

> **Note:** The order of context affects the meaning of a variable. For example, `shouldUpdateComponent` means _you_ are about to update a component, while `shouldComponentUpdate` tells you that _component_ will update on itself, and you are but controlling when it should be updated.
> In other words, **high context emphasizes the meaning of a variable**.

---

### Actions

The verb part of your function name. The most important part responsible for describing what the function _does_.

#### `get`

Accesses data immediately (i.e. shorthand getter of internal data).

```ts
function getFruitCount() {
  return this.fruits.length;
}
```

> See also [compose](#compose).

You can use `get` when performing asynchronous operations as well:

```ts
async function getUser(id) {
  const user = await fetch(`/api/user/${id}`);
  return user;
}
```

#### `set`

Sets a variable in a declarative way, with value `A` to value `B`.

```ts
let fruits = 0;

function setFruits(nextFruits) {
  fruits = nextFruits;
}

setFruits(5);
console.log(fruits); // 5
```

#### `reset`

Sets a variable back to its initial value or state.

```ts
const initialFruits = 5;
let fruits = initialFruits;
setFruits(10);
console.log(fruits); // 10

function resetFruits() {
  fruits = initialFruits;
}

resetFruits();
console.log(fruits); // 5
```

#### `remove`

Removes something _from_ somewhere.

For example, if you have a collection of selected filters on a search page, removing one of them from the collection is `removeFilter`, **not** `deleteFilter` (and this is how you would naturally say it in English as well):

```ts
function removeFilter(filterName, filters) {
  return filters.filter((name) => name !== filterName);
}

const selectedFilters = ['price', 'availability', 'size'];
removeFilter('price', selectedFilters);
```

> See also [delete](#delete).

#### `delete`

Completely erases something from the realms of existence.

Imagine you are a content editor, and there is that notorious post you wish to get rid of. Once you clicked a shiny "Delete post" button, the CMS performed a `deletePost` action, **not** `removePost`.

```ts
function deletePost(id) {
  return database.find({ id }).delete();
}
```

> See also [remove](#remove).

> **`remove` or `delete`?**
>
> When the difference between `remove` and `delete` is not so obvious to you, I'd suggest looking at their opposite actions - `add` and `create`.
> The key difference between `add` and `create` is that `add` needs a destination while `create` **requires no destination**. You `add` an item _to somewhere_, but you don't "`create` it _to somewhere_".
> Simply pair `remove` with `add` and `delete` with `create`.

#### `compose`

Creates new data from the existing one. Mostly applicable to strings, objects, or functions.

```ts
function composePageUrl(pageName, pageId) {
  return pageName.toLowerCase() + '-' + pageId;
}
```

> See also [get](#get).

#### `handle`

Handles an action. Often used when naming a callback method.

```ts
function handleLinkClick() {
  console.log('Clicked a link!');
}

link.addEventListener('click', handleLinkClick);
```

---

### Context

A domain that a function operates on.

A function is often an action on _something_. It is important to state what its operable domain is, or at least an expected data type.

```ts
/* A pure function operating with primitives */
function filter(list, predicate) {
  return list.filter(predicate);
}

/* Function operating exactly on posts */
function getRecentPosts(posts) {
  return filter(posts, (post) => post.date === Date.now());
}
```

> Some language-specific assumptions may allow omitting the context. For example, in JavaScript, it's common that `filter` operates on Array. Adding explicit `filterArray` would be unnecessary.

---

### Prefixes

Prefix enhances the meaning of a variable. It is rarely used in function names.

#### `is`

Describes a characteristic or state of the current context (usually `boolean`).

```ts
const color = 'blue';
const isBlue = color === 'blue'; // characteristic
const isPresent = true; // state

if (isBlue && isPresent) {
  console.log('Blue is present!');
}
```

#### `has`

Describes whether the current context possesses a certain value or state (usually `boolean`).

```ts
/* Bad */
const isProductsExist = productsCount > 0;
const areProductsPresent = productsCount > 0;

/* Good */
const hasProducts = productsCount > 0;
```

#### `should`

Reflects a positive conditional statement (usually `boolean`) coupled with a certain action.

```ts
function shouldUpdateUrl(url, expectedUrl) {
  return url !== expectedUrl;
}
```

#### `min`/`max`

Represents a minimum or maximum value. Used when describing boundaries or limits.

```ts
/**
 * Renders a random amount of posts within
 * the given min/max boundaries.
 */
function renderPosts(posts, minPosts, maxPosts) {
  return posts.slice(0, randomBetween(minPosts, maxPosts));
}
```

#### `prev`/`next`

Indicate the previous or the next state of a variable in the current context. Used when describing state transitions.

```tsx
async function getPosts() {
  const prevPosts = this.state.posts;

  const latestPosts = await fetch('...');
  const nextPosts = concat(prevPosts, latestPosts);

  this.setState({ posts: nextPosts });
}
```

### Singular and Plurals

Like a prefix, variable names can be made singular or plural depending on whether they hold a single value or multiple values.

```ts
/* Bad */
const friends = 'Bob';
const friend = ['Bob', 'Tony', 'Tanya'];

/* Good */
const friend = 'Bob';
const friends = ['Bob', 'Tony', 'Tanya'];
```

## Research links

- [Nest Sample](https://github.com/nestjs/nest/tree/master/sample)
- [Awesome Nest](https://github.com/juliandavidmr/awesome-nestjs)
- [NestJS](https://docs.nestjs.com)
- [TypeORM](https://typeorm.io)
