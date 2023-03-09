# Megamind team's Coding and Style Guide



## Versioning

We use **Semantic Versioning 2.0.0** to set the version. Learn more [here](https://semver.org/)



## Tools that we use

- For code linting, we use [ESlint](https://eslint.org/) following [Airbnb's Style Guide](https://github.com/airbnb/javascript). We also use [eslint-config-airbnb-typescript](https://www.npmjs.com/package/eslint-config-airbnb-typescript) to support TypeScript.

- For code formatting, we use [Prettier](https://prettier.io/).

**Note:** We use the **same configuration files across all projects** to maintain coding consistency and readability. These configurations files are updated and maintained by Lead Developers (currently Mr.Dat). Please contact him if you need to set up your repository.



## Using inline comments
We use inline comments to explain hard-to-understand concepts (variables, logics, functions,..). 

Inline comments are for supporting purposes, so it **should be 1 sentence only** and **should only be used when necessary** .

- *Variable*: Explain the meaning of the variable in case you **do not know how to name it** in English or **not sure if you name it correctly**.
- *Function*: It is recommend to write 1 inline comment before to **summarize the purpose(s) of the function**. 
- *Logic*: For logic that is **not obvious**. Should have 1 inline comment to **explain the overall logic** before. You can add extra comments for each line of code if needed to explain the logic behind.
- (optional) *Section*: For long files or have multiple sections. Should have 1 inline comment before to explain the purpose of each section.



## Index

It is recommended to create a `index.ts` file in each folder and export (especially in folders that contain shared components or modules). Unless it's a special case, it is recommended to import from a folder instead of directly from a file.



## General rules 

Naming things is hard. This sheet attempts to make it easier.

### English language

Use English language when naming your variables and functions.

```js
/* Bad */
const primerNombre = 'Gustavo'
const amigos = ['Kate', 'John']

/* Good */
const firstName = 'Gustavo'
const friends = ['Kate', 'John']
```

### S-I-D

A name must be ***short***, ***intuitive*** and ***descriptive***:

- **Short**. A name **must not take long to type** and, therefore, remember;
- **Intuitive**. A name **must read naturally**, as close to the common speech as possible;
- **Descriptive**. A name **must reflect what it does/possesses** in the most efficient way.

```js
/* Bad */
const a = 5 // "a" could mean anything
const isPaginatable = a > 10 // "Paginatable" sounds extremely unnatural
const shouldPaginatize = a > 10 // Made up verbs are so much fun!

/* Good */
const postCount = 5
const hasPagination = postCount > 10
const shouldPaginate = postCount > 10 // alternatively
```

### Avoid contractions

**Do not** use contractions. They contribute to nothing but decreased readability of the code. Finding a short, descriptive name may be hard, but contraction is not an excuse for not doing so.

```js
/* Bad */
const onItmClk = () => {}

/* Good */
const onItemClick = () => {}
```

### Avoid context duplication

A name should not duplicate the context in which it is defined. Always remove the context from a name if that doesn't decrease its readability.

```js
class MenuItem {
  /* Method name duplicates the context (which is "MenuItem") */
  handleMenuItemClick = (event) => { ... }

  /* Reads nicely as `MenuItem.handleClick()` */
  handleClick = (event) => { ... }
}
```

### Reflect the expected result

A name should reflect the expected result.

```jsx
/* Bad */
const isEnabled = itemCount > 3
return <Button disabled={!isEnabled} />

/* Good */
const isDisabled = itemCount <= 3
return <Button disabled={isDisabled} />
```



## Naming Class

(to be defined)



## Naming Interface

Set "I" to the first letter of the interface's name. Example:

```js
interface IUser {}
interface ICustomeUser extends IUser {}
interface IThirdCustomeUser extends ICustomeUser {}
```



## Naming Variables

### Prefixes

Using Prefixes to enhance the meaning of a variable.

#### `is`

Describes a **characteristic or state** of the current context (usually `boolean`).

```js
const color = 'blue'
const isBlue = color === 'blue' // characteristic
const isPresent = true // state

if (isBlue && isPresent) {
  console.log('Blue is present!')
}
```

#### `has`

Describes whether the current context **possesses a certain value or state** (usually `boolean`).

```js
/* Bad */
const isProductsExist = productsCount > 0
const areProductsPresent = productsCount > 0

/* Good */
const hasProducts = productsCount > 0
```

#### `should`

Reflects a **positive conditional statement** (usually `boolean`) coupled with a certain action.

```js
function shouldUpdateUrl(url, expectedUrl) {
  return url !== expectedUrl
}
```

#### `min`/`max`

Represents a **minimum or maximum value**. Used when **describing boundaries or limits**.

```js
/**
 * Renders a random amount of posts within
 * the given min/max boundaries.
 */
function renderPosts(posts, minPosts, maxPosts) {
  return posts.slice(0, randomBetween(minPosts, maxPosts))
}
```

#### `prev`/`next`

Indicate the **previous or the next state of a variable** in the current context. Used when **describing state transitions**.

```jsx
async function getPosts() {
  const prevPosts = this.state.posts

  const latestPosts = await fetch('...')
  const nextPosts = concat(prevPosts, latestPosts)

  this.setState({ posts: nextPosts })
}
```



## Naming Functions

### A/HC/LC Pattern

There is a useful pattern to follow when naming functions:

```json
prefix? + action (A) + high context (HC) + low context? (LC)
```

Take a look at how this pattern may be applied in the table below.

| Name                   | Prefix   | Action (A) | High context (HC) | Low context (LC) |
| ---------------------- | -------- | ---------- | ----------------- | ---------------- |
| `getUser`              |          | `get`      | `User`            |                  |
| `getUserMessages`      |          | `get`      | `User`            | `Messages`       |
| `handleClickOutside`   |          | `handle`   | `Click`           | `Outside`        |
| `shouldDisplayMessage` | `should` | `Display`  | `Message`         |                  |

> **Note:** The order of context affects the meaning of a variable. For example, `shouldUpdateComponent` means ***you*** are about to update a component, while `shouldComponentUpdate` tells you that ***component*** will update on itself, and you are controlling when it should be updated.
> In other words, **high context tells the meaning of a variable**.

---

### Actions

The verb part of your function name. The most important part responsible for describing **what the function does**.

#### `get`

**Accesses data immediately** (i.e. shorthand getter of internal data).

```js
function getFruitCount() {
  return this.fruits.length
}
```

> See also [compose](#compose).

You can use `get` when **performing asynchronous operations** as well:

```js
async function getUser(id) {
  const user = await fetch(`/api/user/${id}`)
  return user
}
```

#### `set`

**Sets a variable in a declarative wa**y, with value `A` to value `B`.

```js
let fruits = 0

function setFruits(nextFruits) {
  fruits = nextFruits
}

setFruits(5)
console.log(fruits) // 5
```

#### `reset`

**Sets a variable back to its initial value or state.**

```js
const initialFruits = 5
let fruits = initialFruits
setFruits(10)
console.log(fruits) // 10

function resetFruits() {
  fruits = initialFruits
}

resetFruits()
console.log(fruits) // 5
```

#### `remove`

**Removes something _from_ somewhere.**

For example, if you have a collection of selected filters on a search page, removing one of them from the collection is `removeFilter`, **not** `deleteFilter`:

```js
function removeFilter(filterName, filters) {
  return filters.filter((name) => name !== filterName)
}

const selectedFilters = ['price', 'availability', 'size']
removeFilter('price', selectedFilters)
```

> See also [delete](#delete).

#### `delete`

**Completely erases something.**

Imagine you are a content editor, and there is that notorious post you wish to get rid of. Once you clicked a shiny "Delete post" button, the CMS performed a `deletePost` action, **not** `removePost`.

```js
function deletePost(id) {
  return database.find({ id }).delete()
}
```

> See also [remove](#remove).

> **`remove` or `delete`?**
>
> When the difference between `remove` and `delete` is not so obvious to you, I'd suggest looking at the key difference: `remove` needs a destination while `delete` **requires no destination**.
#### `compose`

**Creates new data from the existing one**. Mostly applicable to strings, objects, or functions.

```js
function composePageUrl(pageName, pageId) {
  return pageName.toLowerCase() + '-' + pageId
}
```

> See also [get](#get).

#### `handle`

**Handles an action**. Often used when **naming a callback method**.

```js
function handleLinkClick() {
  console.log('Clicked a link!')
}

link.addEventListener('click', handleLinkClick)
```

---

### Context

**A domain that a function operates on.**

A function is often an action on **something**. It is important to state what its operable domain is, or at least an expected data type.

```js
/* A pure function operating with primitives */
function filter(list, predicate) {
  return list.filter(predicate)
}

/* Function operating exactly on posts */
function getRecentPosts(posts) {
  return filter(posts, (post) => post.date === Date.now())
}
```

---
