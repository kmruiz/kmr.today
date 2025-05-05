---
layout: default.liquid
title: Software that changes, designing for maintainability in a world that won't sit still.
tags: [ software design ]
---

I'm writing this from the airport. My flight's been delayed by two hours.

I assumed I'd be in the air by now, heading to my team offsite in Copenhagen. But plans changed, unexpectedly,
inconveniently and without much warning.

And it made me think, this is exactly what happens in software design.

We build systems based on assumptions, about business rules, dependencies, stability, everything. And then, changes.
Requirements change, data is wrong, the timeline moves and you need to deliver on time.

So while I wait sitting on the floor at Barcelona's airport, and because I need to prepare some content for the team
gathering on Copenhagen, I want to share a few thoughts about how to build
software that changes well. And why most of our assumptions in design time don't hold well.

From my experience I believe this is the core problem:

<div class="fun-fact">
Maintainability degrades as code accumulates. More code means more surface area for confusion, coupling and decay.
</div>

We usually write code to implement a feature. That's likely not a surprise for you if you are reading
this post. This code is basically a way to tell a computational unit what to do to solve a specific
problem given an input. I'm not saying a machine because we are way past the time where we were writing
code for a single machine. While there are lots of developers focusing on more user-facing applications,
there is a huge percentage of software developers that work on cloud environments, where their applications
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

There are a lot of cultural, semantic, legal assumptions developers have to make to implement this feature. It opens dozens
of questions.

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

Knowing the quirks of PHP's database connection caching, how and when Java's GC kicks in, that Python's default arguments are
mutable singletons or when to use React's useEffect is useful. But none of these guarantee good software.

For most non-specialised domains, like the typical web app or mobile application, the specific technology you choose is often
secondary. The choice still matters for things like performance, cost, team speed or security, but they rarely determine if a
system is maintainable or correct. There are languages that are more dense and can contain more information (Rust for example),
but they are not enough.

Because in the end, you can build maintainable software in almost any stack if you:

* Know what to do: _The business_
* Know how to do it: _The technology_

And in most projects the hard part isn't the "how", it is the what. That's where most systems fail and that's what we are going to
focus.

## What the software does is not obvious

A software codebase is a frozen translation of the business knowledge by an organisation at a specific point in time. As the business
evolves, so does the code, but unevenly. Assumptions get outdated and new code layers on top of half-baked abstractions.

A software usually has several modules, or units, that solve specific problems. In Domain Driven Design, depending on
several factors, we may call them aggregates, domains, bounded contexts... And these modules have a relationship between them:

* Invoicing requires sending transactional emails
* Shipping requires paid orders

This happens at multiple levels:

* A service requires a repository
* A component requires other child components
* An event bubbles up on a DOM tree

These are different levels of interaction, and they are affected by different levels of coupling.
**If your software doesn't interact with anything, it's useless. When in interacts, it becomes a system.**

### Designing interactions is essential for evolving software

Developers love to debate folder structures, design patterns and the latest tech trends. You'll see endless threads about MVC being
obsolete, or which framework enforces best practices by default. But none of that matters in the long term if the boundaries are wrong.

** Conventions are helpful, add familiarity to a problem, but they don't solve the hard problems. **

Designing interactions and boundaries that reflect how the business actually works. When 

What is important is domain boundaries and interactions. When I was working as a MongoDB Consulting Engineer, 
one of the core principles I used to share was: _Data that is read together is stored together_. That's the heart
of the document model, and with a small tweak, it's also the heart of good software design.

The same principle shows up in Data Oriented Design, a paradigm often used in performance-critical systems: _Data that's
used together should be laid out together in memory._. It's a different context, different goals, but the idea is the same:
co-location improves efficiency, whether it's CPU, data access, or change.

The essential motto that describes maintainable and evolvable software is:

#### Code that changes together stays together

This is not about obsessing over how code looks like, avoiding duplication or minimising the amount of lines of code in your file. It's about
putting the right responsibilities next to each other, so change is predictable, local and change. Predictability in software design is one of the
most underrated properties.

Let me give you a concrete example from a past project.

We were building an internal tool to help salespeople generate personalised offers for customers in the energy sector. The logic behind these offers was
pretty complex and depended on volatile data from several legacy systems: consumption history, pricing, tariffs and more.

Instead of building a mesh of services to pull this data in real time, we took a different approach. We materialised a stable view of the relevant data into
a local database, updated asynchronously. This gave us a fast, reliable source of truth without being tightly coupled to the volatility of other peer services. Also,
made our system resilient to downtime from these peer legacy systems.

The core logic of the system was implemented using just two Java classes:

* Offer: encapsulated all the rules and calculations to generate a snapshot of the offer.
* (IIRC) OfferPrinter: handled the generation of the PDF for the customer.

Everything the salesperson needed was there. It wasn't glamorous, no fancy design patterns, no [Death by Glamour](https://www.youtube.com/watch?v=Q9kDr4na0ls) but it
was predictable, testable and easy to evolve. When the business changed the rules, we knew exactly where to go.

Not every project starts simple, though. Let me share an example where we overarchitected.

We were building a calendar application in JavaScript. Early on, we decided to apply the MVP pattern everywhere. Every screen had its own Presenter, and we used
RxJS heavily to model state and bind events reactively. On paper, it was amazing, in practice, it didn't age well.

With new requirements, like notification for invitees or marking events as done, we ended up growing the presenters with unrelated logic and complicated bindings, because
user interactions _had a lot of side effects_. What started as a really clean abstraction, turned into oversized classes with a lot of responsibilities.

We had presenters reacting to events across boundaries, wiring together streams that had little to do with each other just because we had to react to events. Refactoring became
complicated because the chain of streams was too tangled, that moving subscriptions around made unrelated functionalities stop working. In that situation, we were trying to design
something that on the book made sense, but became our enemy.

The best developers I've worked with have a wonderful sense of what belongs together. It's like a spider-sense for architecture, and gets better
when you improve your understanding of the  business domain.

We are taught to fear coupling, **but intentional coupling can improve maintainability.**.  It's easier to split one function into two than to make
two isolated systems with separate assumptions work together.

Let's take billing and shipping, as example domains.

You might want to start with a clean boundary: billing notifies shipping when an order is paid. But what would happen when the shipping costs need to
be included in the final price? Now billing depends on shipping and there is a circular dependency. And this happens because the business logic decided
that they need to be coupled. There is no way around that.

Forcing decoupling here creates fiction, not clarity.

#### Two modules are at least as coupled as the business requirements they implement.

Accept this and you'll design better systems.

Coupling has a bad reputation. But not all coupling is equal. There is _accidental coupling_: when two parts of the system depend on each other for the wrong
reasons. But there is also _intentional coupling_, which is based on business rules: it's aligned with reality. It makes behaviour easier to trace.

Abstractions are valuable, and a great tool: they can isolate volatility, reduce repetition, protect invariants... but when used prematurely, they also hide intention. Code that
is overabstracted is far from the business rules, and understanding the reason it's there becomes guesswork.

The goal is not to avoid decoupling. It's to couple the right things together for the right reason. Only decouple when there are actual tangible benefits of doing it.

When we are intentional with module boundaries and use coupling as a tool, on our favour, we can speed up development while guaranteeing maintainability.
It also becomes easier to see what should be split, because it will restrain the design and it will feel wrong. Just because two functionalities are in the
same module, doesn't mean they will be there forever.

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

However, deciding how to split based on these properties and when depends on the expertise of the developer.

#### Danger gravitates around the biggest modules

When working across modules, developers often refactor common logic into reusable functions or classes. That's fine, until that shared code becomes
a liability.

A module isn't big because of how many lines it has. It's big when it takes on too many responsibilities or has too many dependencies.

Take, for example, a Repository class that 30% of your codebase depends on because it includes handy utility methods for querying the database. Now
every change to that class, whether it's a performance tweak or a connection pooling fix, comes with risk. You're affecting a third of your system.
That kind of blast radius makes changes expensive even when they seem beneficial.

And it's rarely 1 or 0. A change might work perfectly for one consumer of the class but break another, worst case scenario, silently. Most languages don't
help there because they can't enforce all invariants. They can't guarantee that a module still behaves the way all its callers expect, especially if that
module depends on external services like databases.

Liskov Substitution sounds great on paper, but in practice, you can't verify behavioural compatibility across all consumers. That's where the real danger lives,
in shared assumptions you didn't know were made. Testing and monitoring can help, but they can't fix the problem.

#### Don't split a module until you need it

Premature splitting is ofter just intellectual vanity. It creates the illusion of thoughtful design, but at the end is just guessing.

Unless you deeply understand the domain and can anticipate how the system will evolve, you're likely guessing wrong. And even if you do
get it right, chances are that the module wasn't going to grow into a real problem.

In software design, patience is a virtue. The first signs of pain aren't always a call to action: they are a cue to watch closely your design.
A good software architect is stoic: resists the urge to reestructure at the first discomfort. Most design flaws expose themselves when they are
real. Until then, waiting, often leads to better decisions.

#### Don't overcommit to a design, until that business area becomes a commodity

In business, not all areas evolve at the same pace. Some areas are in constant motion, they are in their genesis, and are driven by market shifts, experimentation
or new customer needs. Others settle over time and become commodities, they are stable, well-understood and unlikely to change.

They need to be treated differently.

If you are working on a fast-moving domain, don't overdesign. Avoid deep encapsulation, rigid abstractions or being too clever. Keep it simple, direct, and easy to change.
The concept that puts everything in motion is the capacity of change. Premature structure locks you into decisions that you might not want to take.

Wait and observe.

Not all parts of a system change equally. Some areas are in constant motion, others stabilise and stop demanding attention.

In Domain Driven Design, this is the difference between core domains (where the competitive advantage lives and where you focus) and supporting domains. In Wardley Mapping,
it's the journey from genesis to commodity.

These models show us a key concept: change is uneven. Some parts of the system will fail apart first. They will be volatile and have unclear boundaries and suffer from
last minute changes.

One way to think about it: software design is like juggling. Not all the balls have the same weight or value. The parts of your system that evolve fast, change often, or
carry the actual business value are the ones that you don't want to let fall onto the floor. They are the ones that deserve more care, more intentional boundaries and more
flexibility.

## Now closing...

... good design starts with understanding of the "what": what you are trying to solve.

When you map the business clearly into your application, when you understand how different modules interact, avoid premature abstractions and refactor with
intent, you get real leverage and benefits. You get better software and faster teams. When teams align around clarity and simplicity, there are fewer surprises,
faster feedback and less fear of change.

It's not glamorous. There are no silver bullets, no architectural theatre. But it works.

<div class="fun-fact">
Overdesigned software doesn't fail by accident. It dies by glamour.
</div>