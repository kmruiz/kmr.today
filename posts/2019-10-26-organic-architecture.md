---
layout: default.liquid
title: Organic Software Architecture
tags: [  software,teams,culture,architecture ]
---

I've been thinking for several years already about the reason of the inefficiency of most long-term companies that built their business around software. It's not uncommon to join teams that are forced to implement solutions in systems with high levels of technical and business debt. Usually in companies with this situation, people complain about the a monster they call `The Monolith` and whenever possible, try to avoid feeding it with more time and energy.

Usually `The Monolith` is represented as a big chunk of code that is written in a old stack that is not fancy anymore for teams. Most of the times the solution is coupled, so teams are afraid to write any new code there. Domains are unclear, so teams don't understand their boundaries and there is friction between teams because code ownership is blurred. Usually it doesn't have automated tests, or at least test quality is very low, so adding new features is slow and needs lots of manual testing and even teams dedicated most of the time to it.

That's why organizations with this plague called `The Monolith` invest a lot of people energy and money to implement a decoupling strategy, or `transformation`, that would allow teams to increase their performance, because the common understanding is that a more advanced architecture should unleash the potential of teams.

And a better *architecture* notorably increases the performance of an organization, but it will unlikely remain efficient across the time if we repeat the same failures. Changing the technical solution won't do anything if the backbones of organizational structures remain as they are.

That's why changing an organization is complex and takes years. Because we are not changing just the structure of the delivered solution to our customers, but we are changing **the culture of designing and delivering value to the customers and stakeholders**.

I personally don't see software architecture as a discipline of just building software blueprints, in any of the formats. It worked ten years ago because teams and solutions were smaller, but nowadays with distributed teams and with worldwide business solutions, it just doesn't work well.

In my experience, software architecture is the discipline of growing and shrinking organizations elastically to build software solutions based on business needs. It's a bit more meta: you are not building blueprints, you are growing teams that build solutions. That's why I like to say that the future of software architecture is `organic`.

Infusing `Organic` to Software Architecture empowers a more people-centric vision of systems, with principles that allow organizations to scale up and down, to build success upon failure and leads to a culture of cultivation to teams, so they are ready for the challenges that organizations will be facing in the near future.

So what are the principles of an organic software architecture? At least those are my guidelines when I'm working on a software project.

Explaining everything would take lot of time, so I will like to share just a high-level checklist on each category, and if is there any topic that needs further discussion and explanation, I can write more posts about it.

#### Business
* Plans should be short-lived, driven by long-term goals.
* Metrics and goals should be transparent and understood by everyone interested.
* Business is expected to change goals based on shared facts.
* Business should embrace failure as a way for learning.
* Business should provide a sandbox for teams to fail.

#### Teams
* Team performance should be lead by individual growth and collaboration.
* Business change, so do teams.
* Methodologies should be lead by culture, not otherwise.
* Teams decide how they communicate globally in the organization.
* Team vision, expectations, goals and boundaries should be clear.

#### Solutions
* Together define a technical vision, strategy and principles driven by business needs.
* Don't make cheap code, make code cheap.
* Infrastructure is cheap in terms of budget, but expensive in cognitive load.
* Solutions are driven by the whole team.

Those principles depend on the situation of the company, but at least the decision of dropping one of them should be conscious.

What do you think? I'm open for feedback, experience from other people and ideas.
