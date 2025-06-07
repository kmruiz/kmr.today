---
layout: default.liquid
title: How high-performing teams last in time
tags: [ teams, agile, delivery ]
---

We've been talking about how teams deliver value on time, but probably the most interesting part (at least to me!) is how does a team remain productive through time, obstacles and challenges.

Personally, I've seen few people actually talking about the uncomfortable side of team dynamics: people leave. However this situation enables something amazing: people can also join. Because teams are unstable by nature, they need to be ready to change.

If we analyze teams deeply, we can actually define teams as systems. Systems that deliver value to the customer building software solutions. A team has inputs, dependencies, failures, successes and so on, like software itself.

Chaos Engineering specifies that in any system, failure is guaranteed to happen. That's why, instead of increasing the Mean Time to Failure, it's best to decrease the Mean Time To Recovery so failure effects are reduced.

What can we consider failures in a team? I personally don't like the word failure, because changes are inevitable, but to ease the relationship I will stick with the Chaos Engineering concept.

I usually consider failure as something that makes current team dynamics suffer or the expected outcome of the team can not be fulfilled. Examples of failures are:

* Someone leaving the team
* Someone new joining the team
* Change on the business priorities
* Generation of uncontrolled technical debt
* Temporary leaves of team members (sick leave, vacations)

So we are in a situation that in distributed teams that need to interact a lot, those `failures` are maximized. So, how teams can be resilient over time?

What I've seen working quite fine is simulating failures in a sandbox environment. How do we actually simulate failures on a team? There are several ways and we will get into them in a few words.

Before that, I want to share why failures are important to track. First of all, they are an objective way to measure the impact of changes. Usually, when someone leaves a team, the team performance is affected negatively. This can be even worse if that person didn't manage to share knowledge and have a proper rollout of the project.

Someone new joining also affects the performance and the mood of the team, because they need a proper onboarding in the team. Making sure that onboarding new people is common makes team rotations easy and teams more stable in time. 

Because stability is just one face of the coin, the other face is a controlled amount of chaos that make sure that the team is ready to change. And here is where I come with a few proposals:

* People gets sick. A way to simulate sickness is to leave a random free day to someone to work on something not related at all to the current project. I recommend a sensible amount of time between free days. Once every two weeks or monthly is a good pace.
* People leave and join, and usually not at the same time. Encourage team rotations periodically (around half a year is quite safe), let the people move around teams. This has a lot of benefits that affects the entire ecosystem and culture of your company.
* Apply [the lean inception technique](https://martinfowler.com/articles/lean-inception/) (or similar) to define small scopes of your work and revisit your business vision every few months.
* Technical debt is there, make sure you find it as soon as possible. Techniques like mob programming help teams catch tech debt, fix it or document it.
* When taking *important* technical decisions, write them down as a team. I've used [ADRs](https://adr.github.io/) in a few projects and they worked perfectly.

Rotating people on different teams is a challenge for everyone, and needs to be considered of the uttermost importance. Whenever a person rotates, make sure that they will find the challenges they are facing or at least the expectations are clear. People are usually fine working on different environments for a few months / year if they know that they will be fine whatever they need or want on the next rotation.

However, those are just proposals and ideas. Try to find other solutions and patterns that might apply to your team and keep the practices simple. Everything mentioned in this post also applies to yourself and your team mates, so applying complex approaches make the system more unstable and harder to track.
