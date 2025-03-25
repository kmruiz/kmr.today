---
layout: default.liquid
title: Software delivery is about forecasting, not foreseeing 
tags: [ delivery ]
is_draft: true
---

As any developer with a minimum amount of experience delivering software, I had to manage
software projects. From having a long and boring Functional Architecture Document to not
having a ticket in JIRA _at all_. Either way, it was my responsibility to deliver it
on time.

When I started managing projects, I started as everyone else: micromanaging. If I have
control of everything that happens I will be able to estimate the work to be done,
I will be able to split it, and I will be able to finish by the deadline. **Spoiler**: no.

However, I never managed to do it correctly. I'm not a micromanager, I don't know how
to do that. So I had to find other ways to do my job. 

Investigating, as many others, I found about _Agile Software Development_, about Scrum,
Kanban, Scrumban, ~SAFe~ and tons of blog posts. However, I've found several issues
with the content I've found:

1. They focus on the practicality of the day to day: ceremonies, how to layout cards...
2. Their focus on the tradeoffs is shallow.
3. They completely ignore about how to measure either failure or success.

Also, due to how our industry works, it's really template oriented. People prefer to work
with a template, something already designed, and don't think about it. Scrum requires 2-week
sprints? Then, we do 2-week sprints.

However, software delivery is complicated due to _two_ main reasons:

* Software is complicated.
* People is complicated.

Take into consideration the example of estimating a chunk of work. Let's say that you are
building a new web page, and you want to add a new button. This button is nothing fancy,
so you estimate it as 2 days of work. Or maybe is it 3 story points? Do we estimate using
fibonacci or T-Shirt sizes? Whatever, your team mate will estimate something different.

Usually, after you realise that half of the team estimates in 2 days of work, and the other
half of the team in 5 days of work, you let the team discuss. In these conversations, the
team mostly talk about vibes, there is not much to back any of the estimations. Usually
these discussions end with any of the two estimations, depending on the team they will go to
the _safest_ bet, being the pessimistic estimation, or the most optimistic estimation, or halfway.

And how many of your estimations have been accurate? My estimations are not really accurate, to be fair.

And after some thinking, and tinkering with my ideas, I decided to change how I do my software delivery
management. _Because at some point you realise that consistency is more important than speed_. It doesn't
matter if you deliver the button in 1 day, if you are going to deliver the next button in 2 weeks. You can't
plan your products with that amount of uncertainty.

### So I stopped foreseeing, and started forecasting

