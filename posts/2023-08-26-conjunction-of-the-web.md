---
layout: default.liquid
title: The conjunction of the web
tags: [ webdev, architecture ]
---

A few days ago, I was watching a video from Theo where he was discussing about the architecture of web applications, and how frameworks and libraries shape the connection between the frontend and the backend. If you haven't seen the video, it has some brilliant insights on how web applications are shaped nowadays.

<a href="https://nitter.net/theo/status/1694585702762328079#m">
	<img src="/static/posts/2023-08-26-conjunction-of-the-web/theo-post.png" />
</a>

However, there were a few specific quotes from the video that made me realise how different is the perspective of the current frontend community from what we had more than a decade ago.

And thanks to that video, I wrote a tweet about the future of HTML and how we are missing a beautiful opportunity. 
This post is not "an old man yelling at the cloud" post. The essential complexity of software architecture is that there are no good or bad decisions, just trade offs. However, I want to share my perspective after a decade working on the industry and how we got here.

Let's start from what we had during the early days of the internet: HTML. Yes, I will talk about HTMX later, but we need to understand from where we come, to understand why HTMX started a revolution in software design nowadays.

In the early beginnings of the web, 1993, HTML born. You know what? CSS wasn't even a thing at that point! CSS started a few years later, at the end of 1996. Did you know that JavaScript is older than CSS? 1 year to be exactly. 

But let's stop for a moment with the numbers: we had *HyperText* (yeah, HT come from here). And while nowadays HTML lost it's meaning, it's important to convey what the HT come from, so we can understand HTMX.

*HyperText* meant that we weren't transfering only text, but something more powerful. What if the text could hold references to other texts? For example, what if I could have a paragraph that explained how the color blue smells like a dawn on the beach, and a way to navigate to what synesthesia means.

We had text and links (and other things really, but let's keep it like that for simplicity). Then, these links referenced to other documents, that also had more links! It's like an endless Twitter/X timeline, but natively included in your browser! 

HyperMedia, is the generalisation of this concept: any element included in the document may reference to other documents in the web and they are handled automatically by the platform. There is an excellent book from Carson Gross, Adam Stepinski and Deni̇z Akşi̇mşek named Hypermedia Systems that [can even read it for free](https://hypermedia.systems).

So the web platform started to grow in this aspect: we had more elements (like iframes, in 1997, 4 years later) that allowed us to embed hypermedia applications inside our own application and with JavaScript, interact with both of them.

At that moment, HTML was the backbone of the web, and all tools implemented were to *increase* the power of hypermedia. You had your HTML application, with your CSS, and some sprinkles of JavaScript to add additional interactivity within the document: animations, hiding parts of the document or validations.

![The beginning](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/229ulha2a9o8je2a7rwr.png)

Eventually, the web usage started to grow, exponentially. Web users also needed more interactive web applications. And evolving JavaScript was way easier than evolving HTML. We started implementing more, and more, and more functionality in the browser in JavaScript so it looked more like a native environment. 

To give you some context, the concept of AJAX was introduced by Internet Explorer 5 in 2001, 22 years ago, and the API was called XMLHttpRequest. WebGL was released on 2011, and only 2 years later, during 2013, React was released!

And with the "modern" era of frameworks, like AngularJS, React and others, the balance of the web changed. HTML left it's space, as the backbone of the web, to JavaScript and the SPA applications (and variants). At that moment, everything started to evolve to a JavaScript first platform. I mean, look at you now, if you are a frontend developer, most likely you have a Node.js environment that bundles a JavaScript application that generates HTML, and probably also CSS with CSS-in-JS.

Nowadays, the status quo are JavaScript-first applications that are pretty heavyweight, with high complexity and they only use HTML as the mean to render the result of what the application is doing.

But the web is a marvelous platform, and was brilliantly designed. That is why the industry decided to bring web technologies to our desktops, to our phones and to our TVs. That is the main reason we had Cordova, and now have Electron, Ionic, React Native, etc. because writing code for the web was cheaper than writing native applications.

![The now](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j3u42i73xfycnesrpmqy.png)

And this is when, essentially, and hidden in the day to day, a new platform was born. The new platform is a children of the web, but it is not the web. And it's important to understand that using web technologies does not make something part of the web platform. Is an Electron application part of the web? Clearly not, but it uses web technologies. This is when the conjunction of two platforms happened and we were not even aware of it as an industry.

Before, a frontend developer was focused on HTML, CSS and JavaScript, and nowadays, it's mainly JavaScript. Is not uncommon to find lots of tooling so JavaScript developers do not need to write CSS or proper HTML. *And here is where the discrepancy between the two platforms lays*.

The web platform is hypermedia based, while the new platform, is JavaScript based. And if you think about it, essentially, we just reimplemented good'ol frameworks like Swing in JavaScript, because the web platform is just easier and more accessible.

But how do we explain the complexity of the current toolset? This is where the Law of the instrument kicks in: _"If the only tool you have is a hammer, it is tempting to treat everything as if it were a nail."._ Even if JavaScript was born in the web, JavaScript centered frameworks do not fit properly in the web. That is why we have huge bundles of JavaScript, that is why RSC are necessary (things like RSC were already a thing in [Vaadin](https://vaadin.com)) and that is how JavaScript became the Birmingham screwdriver.

And that is why HTMX is a radical concept nowadays. It is not because it's novel. Let's be clear: HTMX radicality does not surfaces from novelness. *HTMX is not better than React, Vue, Svelte or any other JavaScript centered framework*. *HTMX is a library for the web, not a framework for JavaScript.* 

That is why HTMX is not for everything: are you building a web? Most likely you can use HTMX and it will be simpler, because it's built on top of the web platform. It just benefits from 30 years of maturity and evolution.

But as I said on Twitter, *HTMX should not exist*. But why does it exist and why people is enjoying it? Because HTML is stagnating. Most new browser APIs depend on JavaScript, and because the JavaScript ecosystem just grows faster, we are using JavaScript to fill the gap of what HTML can't do. **HTMX is filling the gap the web platform is not being able to fill.**

<div class="fun-fact">I deleted my Twitter account due to Elon Musk's policies, so the tweet is not available anymore.</div>

That is why we need to push forward with tools like HTMX and ask for evolution at the web platform level. *We need HTML 6*. We need to evolve *the web platform* alongside *the JavaScript platform*. They are essentially different platforms using the same technologies, and that is the main reason is hard to differentiate them.

How, in my honest opinion, we need to grow the platform now?

* Generalisation of the HTTP Methods used within HTML documents. We need *urgently* support for `DELETE`, `PUT` and other methods.
* Partial rendering and swapping of HTML content within HTML. There are different alternatives (targeted outputs for example), but they require analysis.
* Event based trigger of hypermedia mechanisms. HTML already works like this, now it needs to evolve.
* Declarative web components, with integrated Shadow DOM and parameterisation. 

Most likely we will need to first implement some of these mechanisms in JavaScript (like HTMX) so we can push the platform forward and understand what are the requirements and improvements we need to do along the way.

And, finally, what is the role of JavaScript in all this situation? JavaScript is essential to the web platform, and having other forces helping grow the toolkits and the JavaScript platform are stupendous news. 

JavaScript won't disappear with HTML 6, like it didn't with HTML 5. However, it will have a more important role: it won't be polyfilling and fixing the gaps of HTML, it will be able focus on widening the horizon of what we can do in the web.

JavaScript will also be essential for native applications based on web technologies: React, and JavaScript-first frameworks are here to stay, and honestly, whatever variant wins on the future is not relevant as all of them are wonderful technologies. 

We have a beautiful future ahead, and we will have two extremely strong platforms (web and JavaScript) that will coexist and grow from each other.
