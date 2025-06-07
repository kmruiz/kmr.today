---
layout: default.liquid
title: Working with your running program, an interactive environment
tags: [ slime, lisp, repl, environment ]
---

Nowadays the process of working in software has a similar pattern on most environments. It doesn't depend on the language or runtime but on the design principles that prioritize shrinking the feedback loop and increasing the quality of information that we receive during the development of new features.

Several years ago, when the team where Alan Kay was working on, released Smalltalk, the mindset about developing software was totally different. Not only about practices but also about the importance of feedback and understanding the software. Smalltalk main implementations were far from what today we understand as a traditional development environment.

When we work in Java, Scala, Kotlin, C#, Haskell, JavaScript, what we usually do is:

* Write some code
* Run the program and see the results

Running the program can be running your test suite or the actual program, but there is a shared principle: the program is not running always. You can have a hot-reloading mechanism to reload the program, but usually the program state is lost in the process.

In Smalltalk and other environments (we will see later in Common Lisp) you are actually working in the running program. On those environments, the program is a block of wet clay that you are modeling and changing with your hands. And this actually works because there are is a principle shared between those runtimes: there is no difference between code and data.

In Smalltalk everything is an object (data, classes and messages) and in LISP, everything is a S-expression. In the case of LISP, being an [homoiconic language](https://en.wikipedia.org/wiki/Homoiconicity) you can manipulate the running program easily and change the S-expressions, thus also the algorithms that conform your application.

Let's see an example: Common Lisp. Common Lisp an advanced object-oriented and functional language, part of the LISP family. There are several runtimes that support Common Lisp, but we will use [SBCL](http://www.sbcl.org/) as the runtime and [Emacs 26](https://www.gnu.org/software/emacs/) and [SLIME](https://common-lisp.net/project/slime/) as the development environment. SLIME is a fantastic piece of software and supports the most important Common Lisp environments (even [ABCL](https://abcl.org/), a Common Lisp implementation for the JVM).

In the following gif we can see how we have a running REPL, we can compile a function, and run it directly on the buffer.

![Hello World!](https://i.imgur.com/7Ga5YZd.gif)

But this is not surprising at all, it's similar to what [Jupyter](https://jupyter.org/) does with Python. Let's see what happens when our code is not valid.

In the following situation we are going to change the Common Lisp code to:

```lisp
(defun hello-world ()
    (printkx "HELLO WORLD"))
```

And this won't work because `printkx` is not a function. We will see how the compiler prints a warning but it will still compile. That's because Common Lisp functions are late-bound: they are `linked` when they are called.

If we run the function, it will fail saying that `printkx` does not exist. Crap! It's a typo!. This failure is a `condition`, it will pause the runtime until the `condition` is satisfied, *maintaining the state of the runtime*. Now we can go back to the file with the error, fix it, compile, and retry the snippet of code (pressing 4 in the sldb buffer):

![Compiler error](https://i.imgur.com/AJOjYVk.gif)

This is simple, but yet very powerful. We are working with a stateful runtime that we can change, recompile and run whenever we want. It can also maintain the state between calls, like for example in this snippet of code:

```lisp
(defvar %counter 0)
(defun do-count () (setq %counter (+ 1 %counter)))
```

We will see that every time that we call the `do-count` function, the counter increases, even if we recompile the `defvar` expression.

![Stateful machine](https://i.imgur.com/MGsdSGt.gif)

And this is just a sneak peek on what an interactive environment can do.
