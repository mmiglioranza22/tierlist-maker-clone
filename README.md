# tierlist-clone-maker

## 🚧 in progress

A basic tierlist-maker clone with vanilla JS and pure HTML/CSS. No frameworks.

## About

Have you ever googled how does a double linked list works with a tierlist but got no results?

![google search](/public/google.png)

Well, now you will have exactly that! 🤣

Jokes aside, this is a very simple project that tries to clone how a [tierlist](https://tiermaker.com) works. It gives a nice visual of how a doubly linked list can be applied to this and its internal working.

At first, I was convinced that I needed a _doubly linked list_ DS to achieve this so I developed it with the corresponding tests (a nice challenge). However, the _HTML Drag and Drop API_ provides all whats needed to create a fully functional tierlist. Lesson learnt 🥲.

So... to take advantage of this turned into a more 'educational' project,

- Tierlist uses a `doubly linked list` data structure for each tier.
- Each tier-item consists of `nodes`.
- The HTML [`Drag and Drop API`](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) is used for basic functionality.
- All data structures have their respective tests.

API used for examples: https://naruto-api.herokuapp.com/api/v1/characters (Credits: https://github.com/Gustavonobreza/naruto-api) 🙌

MIT license
