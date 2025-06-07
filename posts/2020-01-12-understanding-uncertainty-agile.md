---
layout: default.liquid
title: Understanding uncertainty in software development
tags: [ productivity, agile, architecture, lean ]
---

Prioritizing work is a big challenge for any team. It can be cause of not delivering on time, not fulfilling expectations, and not being able to measure the success of an initiative. Unclear prioritization of work can be the detonator of burnout of a team and might lead to the lost of confidence of your stakeholders.

Probably some of us have been unlucky enough to be part of projects where the delivery date was tight, with blurry goals and unclear acceptance criteria, if existent. However this usually is the cause of inefficient feedback and knowledge sharing across the team and stakeholders.

Uncertainty is there, and navigating it is essential for delivery teams that want to be efficient and happy. It can take several shapes, and not all of them are negative for the team. You, as a team, can take advantage of uncertainty if you play your cards well enough and you can optimize your delivery flow. 

What is uncertainty? Uncertainty is the lack of knowledge of a concept. Usually, uncertainty applies to the effects of a future event. You can be uncertain on how quantum physics work, on how your user is going to react to a new feature, or how your business is going to shift in the next 5 years.

Good thing is that when there is a shadow, it means that there is some light. And uncertainty, above all things, is clear when it exists. If you are aware of a topic, and don't know something about it that you need, you usually know that you don't know it. For example, if you know that you need to write a OAuth2 client and you've never done it before, you can be sure that you don't know how to do it. So there is uncertainty.

Uncertainty doesn't mean that is going to be difficult. It's frequent to have tasks that you know how to do but can be exhaustive: like building a new list page that uses a new query model. Also, it's quite common to clear out uncertainty and find out that a task is fairly easy: like implementing a role based system with Spring Security the first time.

The first thing that we should do to work with uncertainty is to find a way to measure it. Uncertainty is hardly measurable as a number (hard to say it's 3 uncertainties) but you can use abstract and relative measurements to understand, at least, what is more uncertain in your backlog. I personally love the `Business and Tech Review` because it's an easy framework and it's really explicit.

<img class="light-bg" alt="Business and Tech Review" src="https://thepracticaldev.s3.amazonaws.com/i/m1qhu77tcbuk93gwmgws.png" />

The framework is based on the following rules:

* You measure the business knowledge on what the task should be about or the benefits of it. Usually certain tasks have measurable outputs. Rank from 1 to 3, being 1 on the bottom, 3 on the top.

* You measure the technical knowledge to achieve the task. This is how well the team knows how to do something. Rank from 1 to 3, again being 1 on the left side and 3 on the right side.

This way you will assign a color, that matches the uncertainty.

* **Red with a cross**: The task is unsuitable to do at the moment. You might want to split it later.
* **Red**: The task has high uncertainty and needs to be clear out before tackling it.
* **Yellow**: The task is unclear but it should be fairly practical to do, despite the unknowns.
* **Green**: You know what to do and how to do it, it should be clear and predictable.

One of the benefits of the framework is the explicitness of unknowns. During the definition of the uncertainty, there will be conversations about how to do things and about the benefits of doing them, both technical and business side: **keep them high level, focus on questions and doubts and write them down**. This will be the first step for clearing the mist around your backlog.

When you have uncertainty about a task, define a plan to tackle it and favor delaying the task itself, if possible. If your team is doing Scrum, or a sprint-like delivery flow, push the task to the next sprint. Use the current sprint to answer the questions you need to tackle the task. A good approach is:

* Assign a champion for the task. The champion will be responsible of clearing out the uncertainty.
* Define, with the team, which questions need to be answered to clear the uncertainty. Have a simple checklist.
* Book some time during your daily work to answer those tasks. They are important as they will speed up your next batch of work.
* If the uncertainty is just technical, define a spike. A spike is a time-boxed experiment that is used to answer technical questions. Prefer doing mob-programming on the spike, or at least pair programming.

A recent situation in our team was to define how we were going to process events happening in an external system. We had uncertainty on both business and technical level. What we did was the following:

* Our PM focused on understanding what kind of information we were going to receive on those events and how we were going to use it to fulfill the business needs. They also defined business and cross-functional requirements so we could define a technical solution.

* Because we didn't know how to build the technical solution, there were several options (AWS SQS, AWS Kinesis or Apache Kafka as the communication pipe) we gathered together information and decided to do a spike to test AWS Kinesis to verify that our requirements could be met using it. The time choose a day to do mob-programming, we defined a spike roadmap, time-boxed it to 8h, and at the end of the day we documented our findings in a Confluence document, along with the technical solution that we decided to use as an Architectural Decision Record.

This framework (Tech & Buss Review) should be applied frequently, depending on the team speed. In my current team, we are doing it monthly, and sometimes we are doing it twice a month. We are also using this framework to prioritize: we take really uncertain tasks first so we can uncover the needs first and we guarantee a continuous, certain workflow.

Thanks to us doing Kanban, with probability-based forecasts (Monte Carlo) and a continuous flow of tasks we managed to:

* Have a clear understanding of our chances to deliver in time. This allowed us to make explicit our needs and we could prioritize and negotiate with stakeholders.
* Have a clear understanding of what we are doing on the next days.
* Have a clear understanding of what we are going to clear out for the next few weeks.

We even managed to deliver tasks faster than we were able to define them, having a backlog refinement every week! This made clear that we needed to clear out uncertainty faster, so we spent more time doing it and the team is able to balance their own time to optimize different parts of the workflow.

What do you think? How do you handle uncertainty in a backlog?

### References

* [Technical and Business Review](https://martinfowler.com/articles/lean-inception/tech-and-business-review.html) by Paulo Caroli.
* [Monte Carlo Project Tracking](https://agilemontecarlo.com/)
