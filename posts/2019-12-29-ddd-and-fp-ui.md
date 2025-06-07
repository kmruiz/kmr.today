---
layout: default.liquid
title: Domain Driven Design and Functional Pure UI Components
tags: [ javascript, functional, webdev, morphonent ]
---

Building applications is becoming more challenging with the huge quantity of possible user interactions and experiences customers can face. Users now want rich interactions, that feel natural and fast, and require applications that are reliable.

Now, evolving from our needs when building those complex applications, we have cutting-edge libraries and frameworks like [React](https://reactjs.org/), [Vue](https://vuejs.org/), [Svelte](https://svelte.dev/) or [Angular](https://angular.io/), to name a few.

Also, we are facing the situation where the application state management is a challenge by itself, and the community built different solutions to it, to name a few, we have [redux](https://redux.js.org/) and [MobX](https://mobx.js.org/README.html). This problem gets really complex when we also have asynchronous state with HTTP requests to a back-end.

I'm personally interested in distributed architectures and patterns, however, I've found that the complexity of programming the front-end of a system is also interesting, because it's inherently to the user needs. When we are working in a back-end with tons of requests per minute, we exchange thousands of megabytes of information per minute, is easy to forget about the user and start thinking on systems.

However, because of the nature of a front-end application, you have the opportunity to focus on a single user, so you try to understand their multiple needs. Even if we have a big opportunity to learn, sadly this doesn't happen that much and we build our application from basic UI patterns that are not efficient neither for our users nor for us as developers.

Building UIs today is far more easier, cheaper and automated than before. Still, most UIs are expensive for the user (take a look at the quantity of javascript you download for a single webpage) and also for the developers, because changing the structure of a webpage is hard once it's built.

I've been investigating on how to make UIs cheaper to change, composable and easier to test. And I've got to the following set of conclusions that would make a UI easy to change:

* Applications needs to be moldable, like clay.
* Transitions need to be reasonable and easy to track. Prefer 1-1 transitions, avoid whenever is possible to fan-out.
* Asynchronous by default, synchronous is just really fast asynchronous code.
* Testing an application automatically should be as easy as rendering it in the browser.

So, based on Agile and XP, I though on the following requirements for a library or framework to allow cheaper UIs.

* For an application to be moldable, changing it's structure needs to be done frequently.
* Make transitions natural, transitioning should be a fundamental part of how an application works.
* The library should understand the same way async and sync business logic.
* Each component of the application should be testable in isolation and fast.

I wrote a library, named `morphonent`, that implements those ideas. However, I believe that those patterns and design decisions, if useful, could be built on top of other more robust and bullet-proof libraries like the ones mentioned above. The important thing here is not the library, which is something I've built to enable those patterns, but the patterns themselves.

<a href="https://github.com/kmruiz/morphonent/">GitHub: kmruiz/morphonent</a>

## Hello World

Probably it's easier if we can take a look at some code. Let's see a `Hello World` example.

```js
// https://codepen.io/kmruiz/pen/rNazPxG
const {element, renderOn} = morphonent;

const helloWorld = () => element('div', {}, 'Hello World!')
renderOn('#content', helloWorl)
```

As you can see, our component is just a function, like a *React* function component. The library, by default, doesn't support JSX, but in the [README](https://github.com/kmruiz/morphonent#using-jsx) there is a tutorial on how to enable JSX. For matter of showing the patterns, I'll stick with plain JavaScript functions.

## Interactions

Component interaction is done by events, which are processed by event-handlers. The difference here is that functions does not contain mutable state, like `React hooks`. How then can a component change?

The event-handler needs to define which is going to be the next component that is going to be rendered. This allows us to think on behaviors, not state. For example, let's map the interactions that happen on a toggle button:

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/imd9k2a0293ddnddgcw1.png)

Code implementing this pattern is similar to the image, actually:

```js
/// https://codepen.io/kmruiz/pen/rNazPKv
const {element, renderOn} = morphonent;

const toggleOn = () => element('button', { onclick: toggleOff }, 'Toggle Off')
const toggleOff = () => element('button', { onclick: toggleOn }, 'Toggle On')

renderOn('#content', toggleOn)
```

As you can see, we are not changing the state of the button, similar to what we would do in mutable components with hooks or properties. What we are doing in the event handler, is returning which function is going to handle the event, and this function will return the `new component` that will handle further interactions. Doing the DOM diff and optimizing will be handled by the library itself.

This allows us to define interactions and components without actually caring on the actual implementation of any of them. Mounting a component is not a binding decision anymore.

For example, we can change the DOM completely, from a button to a span, when we clicked 10 times on the button.

```js
// https://codepen.io/kmruiz/pen/jOELdeL
const {element, renderOn} = morphonent;

const counter = (count) => element('button', { onclick: () => game(count + 1) }, `You clicked ${count} times`)
const gameOver = () => element('span', {}, 'Game is over')
const game = (count) => {
  if (count === 10) {
    return gameOver()
  } else {
    return counter(count)
  }
}

renderOn('#content', game(0))
```

Now what are important are interactions, not components anymore. Components are an implementation detail on how things are going to be rendered, interactions are not limited anymore to the structure of the components. This makes applications moldable. And we can work on more complex scenarios, like a todo-list and the ability to remove items.


```js
//  https://codepen.io/kmruiz/pen/XWJaOyP
const {element, renderOn} = morphonent;

// components
const todoItem = ({ onRemoveItem }, text) => (
  element('li', { onclick: () => onRemoveItem(text) }, text)
)

const todoList = (items) => (
  element('ul', {}, items.map(item => todoItem({ onRemoveItem: removingItem(items) }, item )))
)

// interactions
const removingItem = (items) => (item) => todoList(items.filter(x => x !== item))

// binding
// click an element on the list to remove it
renderOn('#content', todoList([ 'Be Awesome', 'Be Cool', 'Write Code', 'Be Fast' ]))
```

Of course, the logic here is quite simple, but this mindset and patterns allows us to build UIs in a more powerful way. Because later, we can bind interactions to different types of personas, rendering completely different applications based on them, easily.

## Asynchronous components and transitions

Usually an interaction requires to gather information for the user from external services that might be slow or error prone. To fix this, our application needs to understand that interactions might need slow transitions. For this, we need a higher-level component: `transition`.

Transitions occur during an interaction, and need two different parameters:

* What to show during the transition
* The result of the long-term interaction.

We can see in the following application how this works querying the github API for the repositories of a user:

```js
https://codepen.io/kmruiz/pen/OJPjdYb
const {element, renderOn, transition} = morphonent;

// async code
const allRepositoriesOf = async username => {
  const res = await fetch(`https://api.github.com/users/${username}/repos`)
  const repos = await res.json()
  return repos.map(repo => repo.name)
} 

// components
const repository = name => element('p', {}, name)
const usernameInput = ({ onNewUsername }, username) => element('input', { type: 'text', onchange: ev => onNewUsername(ev.currentTarget.value), value: username })
const weAreLoading = username => element('span', {}, `We are loading ${username} repositories.`)

const application = (username, repositories) => {
  return element('div', {}, usernameInput({ onNewUsername: loadNewUser }, username), repositories.map(repository))
}

// interactions
const loadNewUser = async username => transition(weAreLoading(username), async () => {
  const repos = await allRepositoriesOf(username)
  return application(username, repos)
})

// binding
renderOn('#content', loadNewUser('kmruiz'))
```

## Personas and dynamic layouts

Now we can iterate further on the UI and change the layout of the list completely when the list of repositories is big enough (15 repositories). If we have less than 15 repositories, we will just show an ordered list `ol`. If it's bigger, we will show `div`s with flex-box. So big contributors will see the list of repositories they have completely different as smaller contributors do.

You can use this information to test:

* Small contributor: kmruiz
* Big contributor: vlingo

You can use the buttons to check the samples.

```js
// https://codepen.io/kmruiz/pen/KKwvEdo
const {element, renderOn, transition} = morphonent;

// business logic
const isBigList = repos => repos.length > 15

// async code
const allRepositoriesOf = async username => {
  const res = await fetch(`https://api.github.com/users/${username}/repos`)
  const repos = await res.json()
  return repos.map(repo => repo.name)
} 

// components
const smallRepositoryList = repositories => element('ol', { class: 'small-list' }, repositories.map(repo => element('li', {}, repo)))
const bigRepositoryList = repositories => element('div', { class: 'big-list' }, repositories.map(repo => element('div', {}, repo)))
const usernameInput = ({ onNewUsername }, username) => element('input', { type: 'text', onchange: ev => onNewUsername(ev.currentTarget.value), value: username })
const weAreLoading = username => element('span', {}, `We are loading ${username} repositories.`)

const smallContributor = (username, repositories) => {
  return element('div', {}, usernameInput({ onNewUsername: loadNewUser }, username), smallRepositoryList(repositories))
}

const bigContributor = (username, repositories) => {
  return element('div', {}, usernameInput({ onNewUsername: loadNewUser }, username), bigRepositoryList(repositories))
}

// example contributors
const sampleSmallContributor = () => element('button', { onclick: () => loadNewUser('kmruiz') }, 'Sample Small Contributor')
const sampleBigContributor = () => element('button', { onclick: () => loadNewUser('vlingo') }, 'Sample Big Contributor')

// interactions
const loadNewUser = async username => transition(weAreLoading(username), async () => {
  const repos = await allRepositoriesOf(username)
  if (isBigList(repos)) {
    return element("div", {},
      sampleSmallContributor(),
      sampleBigContributor(),
      bigContributor(username, repos)
    )
  } else {
    return element("div", {}, 
      sampleSmallContributor(),
      sampleBigContributor(),
      smallContributor(username, repos)
    )
  }
})

// binding
renderOn('#content', loadNewUser('kmruiz'))
```

You'll see that changing the layout completely, based on the user information is easy, because it's how the whole framework works. The idea behind is precisely that: components are implementation details, what is important is how the user interaction works.

## Testing

Now it comes the last step, testability. How do we make our interactions and components easy to test? There are several properties that we can now take advantage of, to make our code easier to test:

* Side effects are handled by the user interactions
* Our components are pure functions
* Interaction binding is done at the most abstract level

I personally think that how enzyme and react-test work are actually good. The main problem is that they are relatively slow because they need to handle a lot of different diffing and state logic. I've made a sample test library for morphonent that implements a similar fluent API, but for morphonent. Tests with the library take usually less than 1ms per test for small components and interactions.

<a href="https://github.com/kmruiz/morphonent-test/">GitHub: kmruiz/morphonent-test</a>

Because tests run on node, I can't share this time a codepen, however, I will share some code examples.

### How to test interactions

```js
// fake data
const firstId = faker.internet.userName()
const secondId = faker.internet.userName()
const text = faker.internet.userName()

// example components (clicking on firstComponent will render secondComponent)
const secondComponent = () => element('div', { id: secondId }, text)
const firstComponent = () => element('button', { id: firstId, onclick: secondComponent })

// interactions
const result = await testing(firstComponent) // wrap into a test container
                 .findById(firstId) // find the button
                 .trigger(click()) // click it (will return the result of the handler)
                 .findById(secondId) // find the div with the new content
                 .textContent() // get the text content

// expectations
expect(result).toBe(text)
```

# Summary

I believe those patterns allows us to focus on user interactions, and allows us to treat the DOM as clay, which is easy to change. If we make possible those kind of patterns, we can do amazing things like:

* Adapt our application at runtime for different personas, and focusing on them.
* Compose our application as functions.
* Experimentation and A/B testing easier (by definition).
* Test our applications easier, as they are made of just normal functions.

What do you think? I would love to know more about other ideas and opinions.

Thanks!
