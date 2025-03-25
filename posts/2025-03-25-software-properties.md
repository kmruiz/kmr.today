---
layout: default.liquid

title: Software properties, not paradigms
is_draft: false
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
<th>Paradigm</th><th>State</th><th>Modulariation</th>
</tr>
<tr>
<td>Procedural</td><td>Mutable shared state</td><td>Procedures that handle a slice of the state</td>
</tr>
<tr>
<td>Object Oriented</td><td>Mutable isolated state</td><td>Messages that trigger changes on a slice of the state</td>
</tr>
<tr>
<td>Functional</td><td>Immutable shared state</td><td>Functions that are composed and invoked to build new state</td>
</tr>
</tr>
</table>
