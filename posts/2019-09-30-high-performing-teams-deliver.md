---
layout: default.liquid
title: How high-performing teams deliver software
tags: [ teams, agile, delivery ]
---

I've been part of different teams, with different backgrounds, set ups and goals, and each of them had totally different approaches to deliver software. Recently I focused on reading different books and posts about the challenges on building teams and today I sum up what I've found and my opinion on it.

This will be the first post of a series that will guide through my experience on teams, how teams can be improved and how resiliency is important on teams.

When we talk about high-performing teams, there are usually two topics that come in to mind for most people I've been talking to:

* How teams deliver software
* What software teams deliver

However, team dynamics are not only about how individuals in a team interact between each other, but how they interact with an entire system of stimulus that affect their daily work and performance.

That's the reason why this post is not going to focus only on how teams deliver, but on how they handle changes and ambiguous situations. Because the most difficult part of building teams is not helping software developers to write software, but to understand what we build and how we live in a ecosystem of other teams that deliver together.

So let's first start on *how* to deliver software.

When I ask about how teams should deliver software, the every answer I ever get is `Continuous Delivery`. Sadly when I try to deep more into the conversation, there are two scenarios:

* They redirect me to the `four key metrics` from Accelerate (more on this on a specific post)
* I hit a wall and I don't get any more information.

Even if `CD` is *utterly important* and everyone into agile software development advocate for doing it, `CD` is just a mean. In the process on *how* to deliver software, there are more steps.

In high-performing teams there are several practices *before* `CD` that boosted productivity and enabled a routine of delivery that was faster and safer. Must say though, that implementing those practices don't necessarily mean to boost the team productivity: teams are people, and not everything works for the same way for people.

First I want to talk about what *not to do* according to my experience. Even if doing things well is a guaranteed productivity boost, choosing which practices are toxic and *you don't want to do* is even better!

Separated code reviews (like Pull Requests) are dangerous for co-located teams (and they usually span across teams!) because they change the move the focus of teams to a usually subjective code quality check and not software quality (yep, they are different).

* They block the value delivery
* They mostly focus on conventions and subjective rules.
* They open and sometimes lead to toxic discussions as they are not part of the software design process, but later, so the feedback is slow and usually without context.

I personally advocate for pair programming because puts code review into the software design process, as soon as possible, based on direct human interaction, and with context sharing.

High-performing teams also understand how to split work and how to prioritize it, even if the team is not doing strictly Kanban, Scrum, or any other agile framework. Just make sure that your entire team understands the reasons behind the current process of work management, and not only how to apply the process.

Later, they start doing some `Continuous Integration`, probably they are already doing trunk-based development, and they use feature toggles to make sure the code is not exposed to the final customer before being ready.

Then the situation follows easily to `Continuous Delivery`, the last step and also one of the most valuables when the team chooses *what they need to do* but I will leave this to my next post.
