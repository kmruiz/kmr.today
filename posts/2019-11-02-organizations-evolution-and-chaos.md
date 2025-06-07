---
layout: default.liquid
title: Organizations, evolution and chaos
tags: [ organic, architecture, accelerate, culture ]
---

Organizations age over time. Even it might sound obvious, it's a very important statement on system behavior. Older organizations tend to move slower and eventually die of starvation.

Big organizations tend to be slower because they need hierarchy to guarantee that the business organization influences how teams work. Usually this is done with middle-management layers that will get feedback (in the best cases) and report to upper-management layers. Those layers will also schedule the work for teams in a backlog based on business plans defined by their managers.

Those hierarchies, even if might seem necessary to business managers, they are hurtful for organizations that need to iterate fast and increase their influence in the market so they can grow more.

Probably before talking on how to make organizations faster, maybe we can go deeper on why hierarchy is slowing down systems. I will try to provide my point of view on the topic. If you want to understand better some of the concepts I recommend you listening to James Lewis on his literally enlightening talk named [Flow, DevOps and Scale](https://www.youtube.com/watch?v=6eTlFbswgM0).

There is a lean management method named [Value-stream mapping](https://en.wikipedia.org/wiki/Value-stream_mapping) which analyses what are the necessary procedures to deliver value to the customer, in the whole journey. For example, in software, we can do different value-stream mappings that are useful to understand organization dynamics:

* From a task that is ready to develop until it's in production. This is the lead time of the four key metrics from [Accelerate](https://www.amazon.com/Accelerate-Software-Performing-Technology-Organizations/dp/1942788339).
* From an idea that comes from the business vision until it's ready to develop. This is what I call the hierarchy tax.

Hierarchies act as queues, we depend on a centralized point of communication that will, in the ideal world, deliver the information to the interested team as is. However, that's impossible, because on every communication there is a loss of information: the person that needs to deliver the information, needs to understand the content and map it according to their mental model. Simplifying: this is like coding, we can map a HTTP request to a DTO that will be used on our domain, but content specific to the channel (like the client IP, headers, user agent) might be lost during the mapping because it doesn't fit our model.

So there is a substantial loss of information on hierarchies and improving the communication model is usually hard: requires collaborative documents, meetings, emails... and this is also overhead for teams. This overhead doesn't hurt only the knowledge and vision sharing of business initiatives, but also the time and energy team members need to spend to take benefit of the communication.

That's why most performing companies have a more shallow hierarchy where teams are account and responsible of business outcomes. Structuring fully functional teams allow organizations to be more elastic because they are built from autonomous people that have a mission in common. This is something that we can see on any society or ecosystem, where all individuals have a goal in common (for example, survival) and collaborate to fulfill it.

The most interesting part, probably, is how to change a hierarchical organization so we can engage teams to be more mission driven. Those kind of changes are hard for everyone and depend entirely on each organization to find their own path to success (there is sadly no formulae or magic spell to fix organizations). However, there are some ideas that can be considered:

**Aim for long-term goals, not long-term plans**. With well defined goals, teams are more efficient and engaged with business results. If possible, share goals and let them build plans. If a plan is needed, make it as short as possible.

**Aim for short-term plans**. Plans are usually work that teams needs to do to fulfill a business goal. Align with the teams owning the business domains and build the plan with them. The shorter the plan, the easier is to deliver the business value.

**Focus on transparency** of the organization. Teams will make decisions, but they can not make the right decisions if they don't have the information they need. Transparency on goals, status and plans is a must have to any team-driven organization. This will also help teams to trust organizational changes, as they have better context.

**Focus on goals, not on issues**. Probably your teams have technical problems with the current platform, and they are already facing them. Focus on business goals that reflect what you need from teams, and let them build the environment they need. At the beginning it will take more time because there is technical and business debt to pay back.

**Align the technical strategy with business goals**. A good way would be to have a council of technical representatives that are invited to join business meetings. Another way (less transparent and useful) would be to have a catch up between business decision makers and technical representatives, so they can agree on technical requirements.

**Do not homogenize teams**. Like in a human body, each part has a specific goal and specific properties that, in composition, allows us to live. Assign a group of people to help teams to understand their mission based on organizational-wide goals and in case of need, restructure teams based on those goals.

**Always consider the [Conway's Law](https://en.wikipedia.org/wiki/Conway%27s_law)** and take advantage on the [Inverse Conway Maneuver](https://www.thoughtworks.com/radar/techniques/inverse-conway-maneuver) to define how your teams should work based on your technical and business needs.

**Embrace change and failures** as they are unavoidable. [Chaos engineering](https://principlesofchaos.org/?lang=ENcontent) states that systems inevitably fail. Because teams also fail, optimize for recovery and learning, not only performance. Rotate people between teams periodically, define onboarding rules, and aim to have a moving organization, where team changes are cheap.

**As always, keep it as simple as possible**. Not all organizations grow the same way and have the same needs. Try to modularize your business, avoid centralization (the bigger the system, bigger the complexity that you will need to handle) and focus on business value.

Thanks to @Ferran Gomis for the insightful conversation that helped me write this post!

References:

* [Conway's Law](https://en.wikipedia.org/wiki/Conway%27s_law)
* [Inverse Conway Maneuver](https://www.thoughtworks.com/radar/techniques/inverse-conway-maneuver)
* [Flow, DevOps and Scale by James Lewis](https://www.youtube.com/watch?v=6eTlFbswgM0)
* [Accelerate: The Science of Lean Software and DevOps: Building and Scaling High Performing Technology Organization](https://www.amazon.com/Accelerate-Software-Performing-Technology-Organizations/dp/1942788339)
* [Principles of Chaos Engineering](https://principlesofchaos.org/?lang=ENcontent)
* [Team Topologies](https://teamtopologies.com/)
