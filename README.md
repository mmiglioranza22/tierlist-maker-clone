# INTERACTIVE Doubly Linked Lists with FUN examples!

[Update 09/07/22]: I will be adding `insertBefore` method so there is no need for indexes to be used for `insert` operations.

A basic tierlist-maker "clone" with vanilla JS and pure HTML/CSS. **No frameworks.**
And lots of Naruto characters.

## About:

_Have you ever tried to ACTUALLY understand how does a **doubly linked list** work?_

_Surely there are plenty of good resources out there with accurate information (or you might already have a grasp of how it works), but how about learning **INTERACTIVELY** ?_

![google search](/src/public/google_search.png)

_Its funny what Google understands by "interactive" or "fun"... a whiteboard video explanation\_ 🙄.

_Ok, there MIGHT be out there a couple decent resources with code examples you can click, press play, pause, rewind... but let's be honest, are any of those actually **FUN** ?_

_Of course not. But don't give up just yet!_

_Now you will have EXACTLY that... and with Naruto characters!!_ 🥷 🍃 🍥

Now, self promotion and bad jokes aside, this is a very simple project that tries to clone how a [tierlist](https://tiermaker.com) works.
It gives a nice visual of how a doubly linked list structure can be applied to a real example and understand its internal working. (_Open your browser's console, you are in for a ride..._)

### Fun fact:

When I started this project, I was convinced that I needed a _doubly linked list_ DS in addition to all the javascript code I needed to simulate a tierlist's behaviour, being that part the first I developed with the corresponding tests. I also wanted to work with good ol' vanilla javascript and try learn a couple new tricks along the process.
However, the HTML [`Drag and Drop API`](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) provides all thats needed to create a fully functional tierlist, rendering all my previous code useless. (I will google stuff first... Lesson learnt 🥲).

So... to avoid throwing all that beautifully handcrafted code, I thought giving the project a more 'educational' focus.

**Note:** This project merely attemps to illustrate a concept that you should previously have a bare minimal idea, I hardly believe you can learn in depths the inner workings of this DS by just playing around _(to actually learn more, look at how the [DS is structured](/srs/modules/DoublyLinkedList.js), look the [tests](/test/index.test.js) too)_. Use it to reinforce that (or better, to classify shinobis).

## Demo:

- A ```DoublyLinkedList``` is created for every tier with which you can interact with from the your browser's console (Try typing its name).
- All operations will be seen on the console, and a brief description of each tier components will be shown as operations occur.
- That's it. Go play!

<img src="/src/public/demo.gif" width="650" height="400" alt="demo">

## Additional info:

API used: https://naruto-api.herokuapp.com/api/v1/characters
(Credits: https://github.com/Gustavonobreza/naruto-api) 🙌

Interested in DS and algorithms ? Check the awesome work of [trekhleb](https://github.com/trekhleb/javascript-algorithms).

Tests were made with Mocha (Chai).

MIT license

_Disclaimer: Project is intended to be used for educational purposes exclusively. Fork the repo and change it accordingly to meet your needs._
