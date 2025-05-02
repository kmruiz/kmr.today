---
layout: default.liquid
title: Cascading Types
tags: [ programming languages ]
---

Types are the building blocks of all programming languages. While there are some languages
that do not explicitly allow specifying the types of objects, values are typed. Thinking
on types is how we categorise problems and their solutions: we define shapes, we define
behaviour, and we define how we expect a result, which will be another type.

```js
{ fullname: String } => { name: String, surname: String }
```

In addition, there are some languages, like Rust or Idris, that use a really strong type system to ensure
the correctness of an application. This is an important shift in the paradigm where types become more like
a way of defining invariants, more than encapsulating logic and data.

However, types are usually pretty static. We have simple types (like an int), there are dependent types (types that are mapped from other types),
there are higher-kinded types (types that depend on other types) and other variants that are pretty less common.

I love programming languages, and I study them, and I've been using types to ensure safety guarantees for more than a decade, and in different languages. For example,
in Java, I usually do things like this:

```java
interface OpenAccount {
   OpenAccount deposit(float amount);
   ClosedAccount close();
}

interface ClosedAccount {};
```

This way, I map type invariants into the actual language. This is pretty common in Domain Driven Design, and it's extremely useful. The code is
simpler, more explicit on what it does, and the compiler becomes a helpful ally.

However, there are other invariants that are far more complex to validate. Let's assume one of the most common scenarios in low-level languages:
finding an element in an array.

```c
int get_element_at(struct Array *array, int idx) {
	return array->items[idx];
}
```

I'm pretty sure that you realised that this code is extremely unsafe. As we are not checking if idx is in the boundaries of array, it can access
unowned memory and SEGFAULT or, even worse, work.

Usually, how you would fix this is by adding a guard into the function, and returning either a value or failing. C doesn't have an optional type,
so we'll use a pointer for this:

```c
int *get_element_at(struct Array *array, int idx) {
	if (idx >= 0 && idx < array->length) {
		return &array->items[idx];
	}

	return NULL;
}

```

We can consider this safer, thanks to the guardrails we know that idx is inside array, so we can return the element or NULL in case
we are out of boundaries. Now, the client of this function, needs to check for NULL _every time they get the element in an array_.

```c
int *el = get_element_at(array, n);
if (el != NULL) {
  // do some work
} else {
  // failure?
}
```

Some languages fix this by using either special syntax (the `?.` or `??` operators in JavaScript for example) or use an Option type.

## However, what if we could encode these invariants in a scope?

Let's consider we have an array type. I'll use the syntax of a programming language that I'm working on, but I'll explain any complex bit.

```lw
type(T) Array = struct(mut data: ptr(T), mut capacity: u32, mut length: u32) {
	let in_boundaries(idx: u32): boolean :in_boundaries(idx)
	let get(idx: u32:in_boundaries): T
}
```

In this snippet, we define a type called Array, that is a higher-kinded type with a single type parameter, that specifies
the value type that will be contained in the array.

This type has two functions attached to them:

* _in_boundaries_: It's a function that given an index, checks if it's safe to access inside the array.
* _get_: Returns an element in the array.

However, there is a bit more to it. Let's take a look deeper into it:

```lw
let in_boundaries(idx: u32): boolean :in_boundaries(idx)
//                                   ^-- What is this?
```

What ressembles a function call at the end of the function signature is called a cascading type. This is something that I'm working on, which
I believe it will be useful to give developers more power over how to define their APIs.

<div class="fun-fact">
A <b>Cascading Type</b> is a data-less and behaviour-less mark that is attached to an entity or scope in the code and disappears when another
cascading type removes it or the attached entity changes. Cascading types are always contextualised into an existing entity.
</div>

In this case, when _in_boundaries_ is called, if it returns true, the compiler will attach the :in_boundaries type to idx. 

So, let's consider this snippet:

```lw
let my_array = [ 1, 2, 3 ]
let idx = 0
if (my_array.in_boundaries(idx)) {
   // here the type of idx is u32 & my_array:in_boundaries
} else {
   // here the type of idx is u32 & my_array:!in_boundaries
}
```

Multiple cascading types can be attached to the same variable:

```lw
let my_array_1 = [ 1, 2, 3 ]
let my_array_2 = [ 4, 5, 6 ]
let idx = 0
if (my_array_1.in_boundaries(idx) && my_array_2.in_boundaries(idx)) {
   // here the type of idx is u32 & my_array_1:in_boundaries & my_array_2:in_boundaries
} else {
   // here the type of idx is u32
}
```

This allows, by using dependent types, to define new compilation rules, without writing macros or anything similar,
ensuring an API is properly used. This can map, for example, complex lifecycles like opening a file, checking validity,
writing and closing the file.

Cascading types are removed when a variable is mutated, as they can't guarantee that the variant is still valid. It's also
useful for defining overloaded functions depending on the knowledge we have in the context:

```lw
let get(idx: u32:in_boundaries): T // the compiler will choose this one if the cascading type is attached to idx
let get(idx: u32): Option(T) // or it will choose this one if it's not attached
```

Also, the owner of the cascading type can remove the cascading type of other entities under some circumstances. For example,
let's say we have a clear function in the array, that will remove all elements in the array. In that situation, any other
previous bourdary check would be invalid:

```lw
let clear(): all(:in_boundaries):!in_boundaries
```

All is a cascading selector, similar to CSS selectors. There are 3 selectors:

* all(...) -> All entities that match the selector.
* block(...) -> Entities in the block that match the selector.
* :... -> Specific entity that matches the selector.

### To summarise: types are contextual and related to other types

Cascading is the way we choose which types in a context need to change. When a cascading type is attached to a variable, the
compiler can optimise further the code while ensuring safety. There are other ways that I think this can be useful if we
attach them to iterators, or multithreaded environments, but I'm still designing how it should look like.


