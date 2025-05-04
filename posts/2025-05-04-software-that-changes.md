---
layout: default.liquid
title: Software that changes
tags: [ software design ]
---

Now I am at the airport because my flight has been delayed for two hours. During this week,
my team is gathering in Copenhagen and we are preparing workshops, talks and discussions as a way to
do team building and align our expectations and team practices. Guess what, I'll use this dead time
waiting in Barcelona's Airport (Josep Tarradellas) preparing some content that I can reuse later.

I suggested discussing about how to ensure that software is maintainable during active development.
From my perspective and experience, one of the main issues with code is that maintainability is 
a property that gets worse with the amount of code. Basically, more code makes an application harder to 
maintain. But, why is that? 

We usually write code to implement a feature. That's likely not a surprise for you if you are reading
this post. This code is basically a way to tell a computational unit what to do to solve a specific
problem given an input. I'm not saying a machine because we are way past the time where we were writing
code for a single machine. While there are lots of developers focusing on more user-facing applications,
there is a huge percentage of software developers that work on cloud environmens, where their applications
are a mesh that treat a group of machines as a single unit of work.

When we write code, we translate high-level requirements to a consistent and theoretically deterministic language. 
During this translation process we lose part of the information that was implicit in the requirements because either
the team is not aware of these requirements or because they can't be easily modeled in time. Sometimes, even the language
is a barrier.

For example, this post is written in English, however I have two mother tongues: Catalan and Spanish. All three languages have
different ways to define requirements as there are cultural differences that restrict what words mean and even if
there is a word to define something. Also, the understanding of different phrases and words can change depending
on the listener due to culture, social status and other societal differences.

When we translate a requirement like, for example:

> All user transactions have to be stored and accessible by the user.

There are a lot of cultural, semantic, legal assumptions developers have to make to implement this feature.

* Can a user see other user transactions?
* What data is relevant to show to the user?
* Can transactions be filtered somehow?
* Do we have different transaction statuses? Do we show all of them?
* Do we actually need _all_ transactions?
* Does the user can see all transactions in all devices they have?
* Is the user going to write transactions every day? Every hour?
* Do users read or write more transactions?
* There are different types of users? What are their needs?

And probably you can find several different additional questions to ask. And most of them can be answered by
"it depends". And we can get even deeper on this complexity based on other cultural differences: positive
transactions are green? Red? Blue? And we can also add technical constraints: What do we show the user when
the system is unavailable?

Are we talking about bank transactions? Or any other type of transactions? Depending on your background, you
might be thinking on something different.

This is one of the main problems, in addition to developers not being experts of the business domain. There is
a low degree of specialisation in business domains, because our industry has been wasting a lot of time by
reinventing the wheel with new technologies that have questionable value or innovation. However, as engineering
is a social activity in addition to software engineering being a young discipline, while it will improve with
maturity, this issue will stay forever.

I am not against innovation: I believe new languages like Kotlin or Rust are a wonderful evolution for people that
come from Java or C++. Cloud engineering has boosted team performance (and wasted budget equally). AngularJS was an
impressive improvement over JQuery. However it's fair to say that our industry tends to waste engineering effort. Probably
lots of developers would say the same with React, but I find it quite questionable. Maybe I write about it at some point
during this week.

This mindset, rooted in our industry, complicates finding developers who actually know a domain, unless it's a
highly specialised domain like embedded software, gaming, low-level programming or developer tools. Instead, 
it's common to look for "technology" developers. Java Developers, React Developers, PHP Developers and so on. While
_it's  fair_ to require knowledge on a specific technology and we need experts on technologies, the actual knowledge of
most developers on these technologies is pretty shallow.

## Knowing technologies makes your job easier, but it's not enough

Knowing how PHP caches the connection to the database, when does the Java GC kicks in, when to use React's useEffect, or
if Python default arguments are mutable singletons is helpful, **but not enough**. Good software is complicated, and
we are at the point where _usually_ for _non specialised software_ like web applications, what technology you choose 
is not relevant anymore. 


<div class="fun-fact">
Here we are discussing maintainability, choosing a technology is relevant for oher properties like performance,
cost, team velocity, security...
</div>

You can write good software with any technology, if you:

* Know what to do: _The business_
* Know how to do it: _The technology_

The complicated part for _non specialised sotware_ is the "what to do", and this is what we are going to cover now.

## What the software does is not obvious

A software codebase is a snapshot of the translation of the business knowledge by a team or organisation. Eventually,
while the business evolves, also this snapshot evolves: assumptions are going to be broken, features are going to be implemented
and new customers are going to pay for your software.

A software usually has several modules, or units, that solve specific problems. In Domain Driven Design, depending on
several factors, we may call them aggregates, domains, bounded contexts... And these modules have a relationship between them:

* Invoicing requires sending transactional emails
* Shipping requires paid orders

This happens at multiple levels:

* A service requires a repository
* A component requires other child components
* An event bubbles up on a DOM tree

These are different levels of interaction, and they are affected by different levels of coupling. Interaction between modules
or systems are the secret sauce, and the main complexity of changing software. If your software doesn't interact with anyone,
it's useless.

### Designing interactions is essential for evolving software

I'm tired of scrolling in LinkedIn or Reddit and seeing developers discuss what is the best folder structure, or discussing if
MVC is deprecated, if you should use the latest technology because it gives you a template on how to do things. **Conventions**
are useful, but they are not important.

What is important is domain boundaries and interactions. When I was working as a MongoDB Consulting Engineer, basically, the guy
that helps you run MongoDB in your company the best way possible, one of the things I used to say is: _Data that is read together 
is stored together_. This is kind of the motto of the document model, and also _of good software design_ (but with a small tweak).

The essential motto that describes maintainable and efficient software is:

#### Code that changes together stays together

* It doesn't matter if there is some duplication.
* It doesn't matter if there is some coupling.
* It doesn't matter if there is there are tons of line of code.

Code aesthetics are not relevant, how code is structured and modules interact makes the difference.

In business, features define how different areas work together. It's essential to be able to tail relationships,
and the best developers have an special spider-sense to understand what things need to be close. This is far
easier when you understand the actual business domain. New features will shape the architecture and the interactions
between components, but if you can guess a direction, it just makes everything easier.

Because, _despite what the common understanding is about coupling_, **intentional coupling improves maintainability**. It's easier to split
a function in two halfs than making two entire systems with their assumptions work together. Because when we split something, we make
a lot of assumptions and hidden decisions that _might be wrong_ and harm maintainability and other properties of the codebase.

Take for example two loosely coupled modules: billing and shipping. They might have a single point on contact: when the order is billed,
a notification is sent to the shipping system, which prepares the shipping. However what if the final price depends on the shipping method? You'll
need another interaction so the billing system gets the actual shipping price. 

These interactions add coupling because the business is designed to be coupled: artificially splitting them makes everything harder. While there
_might_ be some benefits on decoupling modules, we can't force these benefits if the business model requires them coupled. So, in essence:

#### Two modules are at least as coupled as the business requirements they are responsible for

By accepting this, we can intentionally design better software.

When designing applications, if we are intentional with module boundaries and use coupling on our favour, we can speed up development while
guaranteeing maintainability. And in addition, we can focus on decoupling what actually makes sense to decouple. Because puttng
business requirements together in the same module, doesn't mean all business requiremens go together.

Things that don't change together, can be in different modules, even compilation units and deployment units if we want to. Where to put them
will depend on mutiple factors, like for example:

* Cost
* Scalability
* Availability
* Performance
* Security
* Privacy
* Consistency
* Data Sovereignity

#### Danger gravitate around the biggest modules

When working with different modules, people tend to refactor into different functions or classes, or any other topology, to reuse code. By
doing these refactors, there are some reusable chunks of code that are smaller and, theoretically, easier to maintain. However, it's important
to clarify that the size of the module is not in the amount of code but in the amount of responsibilities and usages. 

If you have a Repository class that 30% of your code depends on, because it has some utility methods, any change on that class can break 30% of your
code. That has an extreme impact on maintainability as it makes all these modules that depend on the Repository fragile over changes on the root class.
If a change on the repository has to be done, like for example, optimising a query or using a connection pool, the impact surface is huge both in the
positive way and it's risk.

Also, it's not a 1 or 0 situation. Changes on shared modules can work on some of the dependents, but break others, as it's hard to ensure Liskov as
programming languages don't have a way to ensure invariants, and even more when they might depend on external services like a database.

#### Don't split a module until you need it

Prematurely splitting forces you to make assumptions that might be incorrect. If you are a domain expert, and know how things are going to evolve, you
can relatively guide the direction of the design with care. However, you'll realise that lots of times you don't need to split modules as they are not
that big and never become a burden.

#### Don't overcommit to a design, until that business area becomes a commodity

In business, not all areas evolve at the same pace: there are areas where we invest more resources and time, and require fast changes, and there are other
areas that become a commodity and might not require more changes. If you need change things fast, keep designs simple, do not overencapsulate, and always
design with change on mind.

## Now closing...

... good design requires you to understand what you are trying to solve. By mapping the business to your application, understanding how different areas
interact, do not overdesigning, and being intentional on what you leave in and out of your refactors, makes a productivity boost. And with multiple developers,
the boost is multiplied.

