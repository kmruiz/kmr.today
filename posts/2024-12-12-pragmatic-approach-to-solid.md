---
layout: default.liquid
title: A Pragmatic Approach to SOLID
tags: [ engineering, design, architecture ]
---

I usually don't watch videos about programming: I prefer to spend that time doing other things. However, I've realised that during my lunch break it helps me disconnect from work. Today, I was watching the following video from the ThePrimeTime channel:

<iframe width="560" height="315" src="https://www.youtube.com/embed/TT_RLWmIsbY?si=JN4xkLmnLpRv_5DR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

I tend to partially agree with some of his points and enjoy watching him. He is usually quite constructive and easy going, and in between jokes, he makes some really good points. 

In that video he reads an article about SOLID, and he does make some valid points: but they are not about SOLID. His complains, and not only hims to be fair, but from many people, is about the shallow understanding of SOLID. And it happens in other disciplines too: Agile, Functional Programming, Software Architecture, Databases... If you just scratch the surface, everything is either wrong or right and you lose the greys. 

I've been working professionally in software development for more than a decade now, and I've hated, loved, and then hated, and then slightly understood SOLID.

However, I'm not going to just copy what the Wikipedia says about SOLID: there are already *tons* of articles somewhere else that explain each letter and uses examples with rectangles and bookstores. This post assumes that you've already read at least one of them.

In this post I want to show you how SOLID is actually useful, how you actually use it more than we think, and how you can actually get *real* benefits from it. Also, I'll go around some myths and misconceptions about SOLID.

## The S

Hopefully you didn't read it as ASS. We know what the S of SOLID means right? But the important part of the S is not the S, it's the R. It's about responsibilities, not about singles. However, ROLID doesn't sound that good.

You'll see that people explain the Single Responsibility principle as "there is only one reason to change a class", but that's a myth. That's plainly wrong. That *must not* be your goal, never. 

Let's put a real example shall we? I'm going to use an analogy first, and then actual examples of the S. 

Let's say that you go to a restaurant. It's a fancy place downtown: your best friend recommended it to you because their vegetarian sushi is amazing, one of the bests in your city. You enter the restaurant, and then a waiter comes to you: "Hey there, how many people?". - "Two", you say, because you are going with a coworker. After that, the waiter sits you down. Eventually they will take your order, and send it to the kitchen. In the meantime, they will serve other customers and finally serve your dinner.

The S is about the waiter, it's about the kitchen. Each of them has one single responsibility, which is different, and they collaborate to fulfill the customers needs. That's it. Inside the kitchen, there are different cooks, and they will do different things and they will have their own responsibility to fulfill the needs of the kitchen. And you can go further and further.

S is not about functions: it's about responsibilities. It's not about addding numbers together and then having another module that prints the number into your standard output. A responsibility is hard to define, because you usually want it to be *useful*, *small*, and *isolated* at the same time. And there are other properties that are actually relevant: security, privacy of data, performance, and so on.

When you design software, you need to think on the analogy of the kitchen: don't do one thing, but solve one problem. In any programming language you have a standard library, right? It can be more or less extensive, but most programming languages have some minimum functionalities. Let's go to one of the lowest level languages: C.

When you work in C with stdio.h, you have a FILE struct. A FILE represents well, a file (potentially in disk), and you can read from that file, write into it, and seek to different parts of the file. However, it doesn't do only that: depending on the operating system, it can cache data until you do fflush, for example. You don't have a FileFlusher, a FileSeeker a FileWriter and FileReader. You just have a FILE.

So, if someone tells you that, to change the value of a property in an object, and save it in your database, you need a shitton of classes, they are likely overcomplicating things. S is about locality of behaviour and isolation of concerns.

## The O

The O principle. I've heard lots of developers say: "look, I can understand why I want to do the S and the I, but I hate the O because it's overengineering". O is literally "composition". Read it again. The "O" is literally: your modules should be extendable without changing their source code. There are different ways to "extend" software modules. In OOP is, however we feel about it, inheritance, but there are others. Monadic composition is about the O too. I can extend a system with new effects without changing the underlying function.

If someone tells you that the O is having an abstract class with a template method, an abstract factory to have different implementations and whatever enterprisy thing, they are likely overengineering. 

If your components are isolated, they have clear inputs and outputs, that can be composed without breaking that component isolation, you are doing the O. That's it.

For example, composing React components is the O. When you have a functional component that can compose other components without modifying them, that's the O. Your module is open to extension, but closed to modification.

Using the analogy of the restaurant: if you want to add a bar with spiritual drinks, you don't need to change the kitchen. You just add the bar. That's the idea, nothing else. There are different ways, of course, of implementing these concepts: as always, choose the simplest solution for your problem.

## The L

Of Liskov obviously. The L is not about subclasses, is about subtyping and the concept of behaviour. Basically it's about contracts. And you use this more than you think.

I'm going to simplify this, a lot, but I think it will make it clearer. The L says that, given some function with clear properties, I can change it with another function that has the same properties. These properties are usually preconditions, behaviour and postconditions.

Let's go to the kitchen analogy again. I'm a cook, working in the kitchen, and I'm using a knife. If I break the knife when I'm slicing the cucumber, I can use another knife, right? That's the L and the W at the same time.

When you are developing software, you try to isolate your modules. But that's not always possible, there is some contract and whoever wants to fulfill that contract, needs to do it correctly. That's it. That's L. 

When you read the original definition:

> Let ⁠ϕ(x) be a property provable about objects ⁠x⁠ of type T. Then ⁠ϕ(y) should be true for objects ⁠y of type S where S is a subtype of T.

It just means fulfilling the contract considering all the invariants. This is actually common in functional programming: these invariants are mapped as monads. In OOP, they can be mapped as classes or interfaces. In fact, the L is so common that in many languages, you can provide a subtype of a class to the main APIs and you don't even know, it just works.

The Java example is clear: you can pass to a Writer any OutputStream, independently of the actual implementation. It just works. In Rust for example, these invariants are actually mapped to traits and lifetimes. Each language has it's own way.

## The I

There is the ego and then the I. And, metaphorically, the I is each of the different ways others see us. So it's interface seggregation. We are back with the analogy of the kitchen.

How do people interact with the kitchen? Well, usually the waiter would send the command to the kitchen, so the actual customer doesn't have to do it. But, that's not the only interaction with the kitchen. Who is actually  stocking the kitchen? These people also interact with the kitchen and they are not the waiter! 

Interface seggregation is about separating parts of a single responsability independently of how it's implemented. The kitchen, to function, needs stock, and also needs a way to get commands from the waiter. It's just a conglomerate of functions that serve one single purpose: feeding you with an amazing nigiri.

And this is the actual goal in software: a module can have multiple consumers. And trust me, it *will* have multiple consumers eventually. And it's not about reusability, it's natural behaviour of systems. Big things grow more than small things, and small things will eventually become big things or disappear.

A good example in software of interface seggregation is a database: most databases have different APIs to produce and consume data. For example, you are writing a bunch of data? Use bulk writes. You need to do analytics? Use views. You need to manipulate a small amount of related data? Use transactions. Everything for a single responsibility: keeping your data safe and avaiable.

## The D

You were waiting this moment. I just realised when I had written most of the post that we would get to that point where I write this. It's fine. I actually like Tenacious D too, so this one is for them.

Dependency inversion means that you shouldn't depend on actual implementation details. It's not that much about having interfaces so you don't expose that you are connecting to a MongoDB or a PostgreSQL or whatever. It's about avoiding leakage.

If I have a module that uses a database, as a consumer of this module, I don't care. It's their responsibility. If they chose to use a database and it's a complex problem, I don't care. The same way that I don't care if the kitchen is using an electric oven or they are burning wood. 

I will depend on the contract exposed from the kitchen without leaking implementation details, and thus we will be both happy: the kitchen can change the oven, and I get a tasty meal.

You are using the principle every day in your job as a programmer. You use libraries that don't leak all their details, you use data structures that share a common interface, and you use frameworks that hide implementation details of the underlying infrastructure. This way, you can work on higher level abstractions without really caring about the implementation details. High-level code that depends on high-level abstractions that hide low-level implementation details.

# So, how do I write good software?

SOLID is about principles, not about patterns. Writing software is, essentially, a complex problem. People tend to avoid part of the complexity of writing software by relying on silver bullets: if they use whatever they feel comfortable with, they only need to tackle part of the problem because part of the solution is granted by the silver bullet.

That's why it's easy to find templates about DDD, about SOLID, about whatever. The philosophy of knowledge as a service: don't think about it, I know more. This way, you just write your CRUD and you are just happy with the solution. For a moment, don't think in templates, think in the properties of your software.

* You want your modules to resolve one single problem, so it's easy to reason about them. **That's the S**.
* You want your modules to be composable, so you can extend the program without breaking it. **That's the O**.
* You want your modules to be adaptable to changes, so I can replace parts of the program. **That's the L**.
* You want your modules to be easy to use to each of it's customers. **That's the I**.
* You want your modules to be explicit about the problem it solves without leaking implementation details. **That's the D**.

And by keeping it simple, you'll enjoy SOLID.
