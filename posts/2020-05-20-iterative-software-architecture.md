---
layout: default.liquid
title: Iterative Software Architecture
tags: [ architecture, agile, devops ] 
---

## The reason behind iterating your software architecture

Software is a mess. We can make efforts to delay the inevitable, but software is full of technical debt, even on it's sources, and team need to keep an eye on it so it can be improved and fixed. Eventually, software will become a problem to the company if it's technical debt is not managed as a first-class citizen on the design, delivery and business process.

This happens because requirements are always changing, so no design is perfect. Hardly we are going to find a design that works like a charm for more than one type of requirement as the combinations are mostly infinite. If you design a software that needs to be really fast, hardly you are going to take into consideration scalability, consistency of data, or even security.

The most prominent requirements when talking about software architecture are *cross functional requirements* and *budget*. Or defining it in another way: how is the architecture going to work and how much money I'm going to spend on running it.

Usually, what happens in most companies during their transformation to a more modern architectures and processes, is that they build, or hire, a group of experts that will lead initiatives to build the new architecture or design new processes.

It's important to note that architectures **are not important**. Having an architecture that you can showoff on twitter or your teammates is not a competitive advantage. Architectures degrade a lot, and even more on big organisations, so just buying the architecture is a patch (and technical debt).

This is most of the times short sighted and troublesome in the medium term, for four main reasons:

1. If you define an architecture alone, or in a group, you become a silo of knowledge, with huge and dangerous consequences.
2. If you let just an elite to define the architecture, you are just building not motivated teams with lack of autonomy.
3. Your elite team is not going to follow up on all the requirements, as they depend on feedback from delivery teams, and on any communication, part of the information is lost.
4. On distributed organisations, a single point of decision is a single point of failure, and throttles the whole organisation.

What is a competitive advantage, and we will see why, is optimising the process of understanding, defining, building and improving your architecture.

## What requirements are?

**But first we need to talk about requirements.**

As stated before, usually when we design architectures we just consider CFRs (performance, scalability, budget, security...), which are really important, but not everything.

There are three main areas to consider when you decide to design an architecture:

### Business Area (_the what_)

Your organisation fits a purpose, this area states that your architecture needs to be useful to whoever delivers value

#### Does my architecture resolves the business functionality?

If your architecture does not actually fulfill any business case, it's just a fancy image.

#### Does my architecture resembles my current business?

It has been proven that the divergence between the language we use for business and the language we use to solve the business problem affects negatively the development process. That's why practices like Domain Driven Design focus on mimicking the business boundaries and language for writing software. For the sake of simplicity, I'll keep the details out of this post.

### Technical Area (_the how_)

Your architecture is a technical outcome. It's a set of systems, and defining how these systems behave is important for the delivery of new functionality.

#### Does my system behave as expected?

Usually you will answer *yes* if your business doesn't need to understand how the system is behaving to fulfill business requirements.

#### Is my system observable?

Observability is a CFR that is important enough to consider it as a different question. Observable systems are crucial for a healthy business and platform so they need to be considered from the beginning and, as much as possible, treat observability as non negotiable.

#### Is my system iterable?

Is it easy to build, test and deploy?

### Organisational Area (_the whom_)

Architectures hardly appear spontaneously. Someone needs to build them, improve them, live with them. How these teams are going to work with the architecture is also a requirement, and an important one to consider.

#### Does my architecture represent how teams should work together?

This is a question that definitely links software architecture to the inverse Conway maneuver. Your architecture should be as frictionless as possible and enabler of a better organisation. This is, how teams should interact.

#### Does the architecture empower trust on teams?

Boundaries are important because reduce technical debt, improve trust and allows teams to be autonomous. Having a system that makes teams trustful allows them to experiment without the fear of a cascade failure in the architecture. This is organisational resiliency.

## Iterating over an architecture

I usually take three steps of iteration when building architectures in an agile way. I've found out that they are enough, and reduce the waste of my designs in a reasonable way. Those steps are:

* Delivery Iteration
* Blueprint Review
* Requirement Review

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/ptl1a9z2cl8fj77xpy5f.png)

### Delivery Iteration

We should deliver value, usually by writing software. In this step, the team will build the simplest option to fulfill the business requirements (_the what_) and expose your system and make it visible in the architecture to other teams (_the whom_). 

It's important to handle technical debt as this point, and to isolate business units. A good approach is using feature toggles for the new functionality, as they force teams to find out where the code is coupled.

### Blueprint Review

So we have a blueprint of the architecture we might want. An ideal architecture, so we need to check the churn between our current architecture and the blueprint (_the how_). 

This is also useful to make sure that the blueprint is feasible and fulfills business requirements. This could be considered as a refactor step for your architecture (_the what_).

If you are used to the [C4 model](https://c4model.com/#CoreDiagrams), it's advisable to consider defining components already on your boundaries, and containers outside your boundaries.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/dhvab2tyt2up7wez9c5x.png)

### Requirement Review

Gathering requirements is hard, and if your are just a team of many, you might need to align with your dependants and dependencies. Requirements need to be analysed in a high-level basis: trade-off sliders, RAIDs, low fidelity schemas ...

If you are used to the [C4 model](https://c4model.com/#CoreDiagrams), it's safe to stay at the container level on your boundaries, and at the system level outside them. During the requirement reviews you are just defining boundaries (_the whom_) and the expectations of other systems with yours (_the how_).

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/35lfkfsnfvcyrl7lcs3i.png)

## Summary

This process needs to be a cycle, so you can start whenever you want and adapt the steps to your needs. What is important of an iterative software architecture is that:

* Architecture is not driven by an elite, but by team requirements.
* Architects have the role of alignment and supporting, decision-making is a tool in the toolbox that should be used only when strictly necessary.
* Architecture is meant to be revisited and redesigned, like code.
* Architecture are constraint by all business, technical and organisational requirements.

Thanks a lot for reading! Looking for feedback and experiences!
