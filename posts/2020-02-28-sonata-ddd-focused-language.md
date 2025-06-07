---
layout: default.liquid
title: Sonata, a DDD-focused programming language
tags: [ ddd, languages, boundaries, showdev ]
---

A few days ago, when I published on Twitter that I was working on a DDD-focused programming language I received different types of feedback. That was the initial intention, honestly, I wanted to check if the community though that a new programming language was needed.

We are lucky that the Domain Driven Design community is quite diverse on what we think how to make DDD approachable and useful for everyone. That's why I wanted to share the reason behind Sonata in a more structured way, so I can redirect people to this post 😊.

First of all, programming is about abstraction. When we develop software, what we are doing is explicitly stating in a compute our understanding of a problem. If we understand that for sharing money, we need a bank account, our software will have some abstraction around what we understand as a bank account.

However, it's not that easy. When we think on the domain, and we try to design a model, we've found that the core abstractions that we have as the building blocks of our software are not enough. This means that we need a lot of bureaucracy to make our software work: services, layers, modules, libraries, APIs...

The reason behind all this bureaucracy is that the way we write our software doesn't match exactly how we understand the business problem. This has a huge impact, not only on the software itself, but of course on how teams organize themselves and communicate. Let me share some examples:

When we build APIs we expose a technical interface to solve a domain problem. Those APIs can be GraphQL, REST, gRPC, SOAP but none of them focus on giving a business driven view of the problem, but technical. They feel like a box and you need to get out of it to model properly a solution.

When we design with application services, we need to add layers to make sure that we can communicate passive objects, without identity and without lifecycle. Because those application services do not represent business objects, they end up as a toolbox for anything. *DRY* mostly happens because we are not focusing on the problem.

Usually we use higher level abstractions because we have a lot of infrastructure code that pollutes or domain. We need persistence, we need logging, we need orchestration, we need boundaries. When we build a service that handles users, and another one that handles bank accounts, and they communicate through an API, it's because we are afraid of breaking encapsulation between services: because we don't have the right tools to provide safety.

However, even those boundaries do not ensure encapsulation. I remember having a discussion with a college, just making jokes around microservices architectures where the communication mechanism between services was HTTP REST and GraphQL. We named the project a *service mess*, because data was just flowing around without meaning and, when a service failed, the whole system failed in cascade.

So, I've been thinking on those problems for several years, and I made a boost of knowledge when I joined the [vlingo team](https://vlingo.io/) and started to discuss those things, that were just ideas at the beginning, with really wonderful people. They helped me understand and exposed me to situations and ideas that were just a rough perception for me.

After some time, I decided to give it a try: let's try to fix those issues from the root cause. Let's build a language with more higher-level set of abstractions, something that talks, exposes and feels the business language, but is still practical for developers.

That's why I started Sonata: my closer friends already knew that I was designing a programming language for years, gathering feedback and understanding the problems that we, teams, have with our toolset. Now I just started implementing it.

<a href="https://github.com/kmruiz/sonata">GitHub: kmruiz/sonata</a>

Sonata is a statically typed functional and object oriented language that, right now, compiles to JavaScript. You can find some code examples in the [samples folder](https://github.com/kmruiz/sonata/tree/master/samples), but I want to do an initial walkthrought in this post.

Sonata focus on declarative code and encapsulation, mainly, to guarantee that boundaries can be changed without breaking the whole project. There are, right now, four building blocks in Sonata:

* functions with runtime dispatch
* entity classes
* value classes
* contracts

For the sake of time and length of the post, today I will introduce how functions work in Sonata.

# Functions

Functions are, like in any other language, used to define transformations of data. In Sonata, functions are defined with the let keyword. For example, let's build a function that sums two numbers:

```
let sum(a: number, b: number) = a + b
```

However, this is a quite simple function, and sometimes functions have conditional logic. A good example is fibonacci, which is a recursive function. In Sonata, you could write fibonacci the following way:

```
let f(a: number) = if (a <= 1) 1 else f(a - 1) + f(a - 2)
```

This is quite similar to other languages. You can do the same thing in most of them, no difference. However, in Sonata we can use function overloads. Function overloads can use conditions on the signature of the function to define special cases (like the condition in fibonacci) and let's the dispatcher to choose which function should be called during runtime. With an example is easier:

```
let f(a: number) = f(a - 1) + f(a - 2) ; specification
let f(a <= 1) = 1 ; overload << specific case where a <= 1
```

This allows testing and adding special cases easier without breaking the boundaries of the initial function.

## More information

* [Functions](https://github.com/kmruiz/sonata/wiki/03.-Functions)
* [Lambdas and Function Composition](https://github.com/kmruiz/sonata/wiki/11.-Lambdas-and-Function-Composition)
* [Streams example](https://github.com/kmruiz/sonata/blob/master/samples/streams/random.sn)
* [An example on how to model a basic domain (transactions in a bank account) using entity classes, value classes and functions.](https://github.com/kmruiz/sonata/blob/master/samples/bank/example.sn)


Thanks! I'll really appreciate feedback, ideas, comments, and of course, contributions!
