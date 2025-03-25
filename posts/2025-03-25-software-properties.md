---
layout: default.liquid

title: Software properties, not paradigms
---

As software developers we have a need to build _good_ software. Due to this
need, we tried to find different heuristics to build better software easier.

Since we left the punch cards and started with assembler, we started researching
for tools to be more efficient and being able to understand better our code.
How we used these tools together and how we applied them, became patterns, and
a combination of these patterns, we started seeing paradigms.

Nowadays, we could say that there are three main paradigms on how we design 
software. Essentially, everything else distilles from a subset or superset
of these paradigms. These paradigms are, simplifying a bit the description:

* **Procedural Programming**: Aims to divide a program in routines or _procedures_
that mutate a subset of the state of the program.
* **Object Oriented Programming**: Aims to divide a program in objects, each with
it's own state, and mutation happens through messaging between objects.
* **Functional Programming**: Aims to divide a program in functions that through
a composition of these functions and effects, achieve an end result.

All paradigms, at least, try to solve _two_ specific questions of software development:

* How do we handle state?
* How do we split software components?

<table>			
<tr>
<th>Paradigm</th><th>State</th><th>Modularisation</th>
</tr>
<tr>
<td>Procedural</td><td>Mutable shared state</td><td>Procedures that mutate a slice of the state</td>
</tr>
<tr>
<td>Object Oriented</td><td>Mutable isolated state</td><td>Messages that trigger changes on a slice of the state</td>
</tr>
<tr>
<td>Functional</td><td>Immutable shared state</td><td>Functions that are composed and invoked to build new state</td>
</tr>
</tr>
</table>

All paradigms have their trade offs: despite the typical flame war of what paradigm is better, there is no
_best way_ of doing things. No wonder why all modern languages are now _multiparadigm_ and allow mixing
tools from all paradigms to make better software.

However, the discussion is still there: is it better to do OOP? or FP? Should we just
drop all of this and go back to procedural programming? Take a look at **Reddit**, **X** or
even **YouTube**. It's just easy content with lots of engagement: who doesn't want a quick discussion about
tabs vs spaces, vim or emacs or whatever?

For simple software, like a "Hello world", it doesn't matter. We can just do either way, it won't change,
it will be just called by 1 user in 1 machine, it doesn't need internasionalisation, or accessibility. It doesn't need
to be redundant or secure, there are no privacy concerns...

## Because issues happen at scale

How we split software is essentially an accidental necessity of scale. We need to scale teams, organisations, servers, data
storage... and so on and so forth. When we decide _how to split things_ is because we need are trying to capture a problem
and its solution in a formal language that needs to be useful for everyone in our _team_, _organisation_ or _community_.

When we are working in a team, there are _lots_ of things to consider: and let's keep us honest here. We are actually not
considering all of them. When you are building your software, are you considering how we can make features parallelisable?
Or faster to implement? Or safer? Are you considering how accessible it is to external contributors? Or what it would happen
if we deploy the software in another country?

### No, because software is situational

What do I mean by _situational_? That software is useful just for a set of problems. There is no good software, but
_good software for something_. Is your software designed to be efficient? Or is it designed to be easy to change? Maybe
none of them, it's designed to be easy to scale on multiple machines across different geographical regions and requires
strict procedures for deploying new versions due to legal requirements.

## Software Design is about boundaries and trade offs

A good software designer has to take into consideration how things evolve, devolve, fail, succeed, scale... and it is
extremelly complicated to handle all of this by yourself. While it's really easy to have opinions on whether it's easier
to understand two snippets of code between object oriented or functional programming, it doesn't matter in reality.

Because it's not about _adding_ or _removing_ lines of code, is about something more complicated: how software _evolves_
and behaves on change. Software has to bee like pottery: when you are working with clay, you mold and shape the software
while it's running. However, that software is not only changed by you, but also by other people.

### So, how do we design good software?

I could tell you to follow some guidelines or really known principles that **I know** they work fine: be agile, do DDD,
and test your software. That would be the easiest way to get out of this post, however, _I don't like the easy way_. What
I want to do now is to give you an idea on what are some _base rules_ and _properies_ to define good working software.

**Because good software is about expectations**.

So if you manage to define _your expectations_ and design software based on that, you have solved the easy part the problem.

## Software is about how components interact and change

If you've seen how paradigms are defined, they are usually focused on how you make components interact with each other to
solve problems. A good software designer is intentional when they define the boundaries between components, independently
of the shape they have.

![Module Boundaries](/static/posts/2025-03-25-software-properties/boundaries.png)

### Reactivity Boundaries

Components are not alone in a system: they need to react to changes in other components. The surface between
these two components is the reactivity boundary.

### Interactivity Boundaries

Components need to command other components to fulfill a business requirement. Usually components will
interact through some kind of interface, either being a function call or a method call. The surface
of interaction is the interactivity boundaries.

### Consistency Boundaries

Data in a component is usually related to data in other components: through deriving new data or by
owning the data. The relationship of the components through their data is the consistency boundaries.

### Evolution Boundaries

Which components need to change together.

## Boundary Map

Given two components:

<table>
<tr>
<th>Reactivity</th><th>Interactivity</th><th>Consistency</th><th>Evolution</th><th>Summary</th>
</tr>
<tr>
<td>No</td><td>Command</td><td>Atomic</td><td>Synchronous</td><td>High Coupling</td>
</tr>
<tr>
<td>Yes</td><td>Command</td><td>Atomic</td><td>Synchronous</td><td>High Coupling</td>
</tr>
<td>No</td><td>Command</td><td>Causal</td><td>Synchronous</td><td>Composition</td>
</tr>
<tr>
<td>Yes</td><td>Command</td><td>Causal</td><td>Synchronous</td><td>Reactive Composition</td>
</tr>
<tr>
<td>No</td><td>Command</td><td>Eventual</td><td>Synchronous</td><td>Highly Coupled Services</td>
</tr>
<tr>
<td>Yes</td><td>None</td><td>Eventual</td><td>Asynchronous</td><td>Event Driven / Callback</td>
</tr>
</tr>
</table>
