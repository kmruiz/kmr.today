---
layout: default.liquid
title: Do not write cheap code, make code cheap
tags: [ ddd, architecture, testing, codequality ]
---

_Examples in this post are in Java, but patterns shown are quite basic and can be used across most languages that have basic object oriented and functional support._

Writing good code from scratch is a difficult task even for most experienced developers. Evolving an existing code base in a way that it's still easy to understand, easy to change, easy to test, observable, and doesn't have excessive code duplication across the project lifespan is a task that multiple developers and teams need to handle and a few do it successfully.

Monoliths are not born being a `Big Ball of Mud`. They are usually testable, with a decent layered architecture that is quite easy to evolve to the few developers that are working on them, and are **effective** to solve the business needs.

I've been asked a few times already about the sentence that titles this post. How do you make code that is cheap across the time? There is no handbook on how to write good code that is easy to change, but I've found some characteristics of cheap code that I want to share.

First let's analyze what makes code hard to change, with examples and reasons.

## Shared infrastructure code is hard to change

Shared code is a commitment. You funnel different features and needs to a single hotspot that will do the actual logic. A good example of those patterns are base classes and utility functions:

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/i4u7k3no6mrile3mbw7i.png)

This makes AbstractDAO hard to change because it's affecting to three possibly unrelated domains, which can affect multiple features. 

To avoid this issue, there are three options:

* You delegate shared code to the framework you use.
* You decouple the infrastructure code from your codebase, building a custom framework in top.
* You duplicate code.

The cheapest option is the first one, delegating to the framework. Frameworks already provide solutions for the most common problems: the chances that you are facing a unique problem are really low. Delegate infrastructure to your framework if possible.

The next cheapest option is code duplication. Even if duplicated code is relatively noisy, low are the chances that you have exactly the same code in multiple places. Premature code reuse increases the probabiliy of premature generalization of a solution, leading to code that does not focus in the business. Code that doesn't speak the business language later is hard to use for learning about the business, and it's hard to change.

Also code duplication helps on the availability of the service. Avoiding hotspots decreases the chances of a chain of failures affecting all your classes that depend on the hotspot (memory leaks, connection pool leaks and related).

## Shared domain code is hard to change

Related to the first point, domain code is also hard to change. 

At the beginning of your project, everything looks like a CRUD. You only need a few text boxes, a dropdown, and a submit button and you have an insert operation. Later, you will want to see the list of submitted items, and even the detail of them.

Beware. Business rules become complex with time, what today looks like a CRUD maybe in a few months it's something completely different. Maybe it's just a button and it autocompletes everything, o becomes a complex user journey filling different information from different third party services.

Avoid sharing domain code, avoid abstract entities and favor composition of value objects. For example, let's take a look at those Java classes:

```java
public abstract class BaseBook {
    private long bookId;
    private String bookTitle;
    private String authorName;
    private BigDecimal price;
    private BigDecimal salesPrice;

    ...constructor
}

public class Book extends BaseBook {
    private long stock;
    private long warehouse;
}
```

Even if it looks safe to extend BaseBook to share logic and properties, when the base class grows, makes Book harder to extend and BaseBook harder to change. Also, blurs the boundaries of the properties and the relationship between them. Favor value objects instead, as they make boundaries explicit:

```java
public final class Cover { 
    private final String bookTitle;
    private final String bookName;

    ...constructor
}

public final class Author {
    private final String authorName;

    ...constructor
}

public final class Price {
    private final BigDecimal original;
    private final BigDecimal sales;

    ...constructor
}

public final class Stock {
    private final long quantity;
    private final long warehouse;

    ...constructor
}

public class Book {
    private final long bookId;
    private Cover cover;
    private Author author;
    private Price price;
    private Stock stock;

    ...constructor
}
```

Splitting knowledge around Value Objects makes code easy to understand on the long term and changing value objects is easier than a base class, as they are self contained.

## Avoid fan-in relationships

A fan-in relationship between classes is the situation when a class is a direct or indirect dependency from another greater number of classes. For example, having several features that use the same domain object. An example diagram is as follows:

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/dccc7m0mvpe76zgd7go8.png)

When this happens, you should ask yourself the following warm up questions:

### Do I need data from `Book` or their behavior?

If the answer to this is **just data**, consider using only the value objects (instead of the whole entity) or define a new **Read Model**. If you have a SQL database, you can just share the result of a *view*. Migrating a single view is far easier than changing a class that is used in more than ten points in the code.
 
### Do I need the same data or behavior from `Book` on all places?
If the answer is no, you should define a new **Read Model**. If both data and behavior are different, probably we are talking about a different bounded context/product.

### Am I only reading? Or also writing?
If you are writing, and the behavior is different, probably you are in a different bounded context/product. Keep code separate. If you are only reading, a **read model** should suffice.

-----------------

However there are some tools that we can use to actually make sure that our code boundaries are clear and will be easy to extract and replace in a different way.

## Favor linear hierarchies based on products

Changing a parallel hierarchy (`XController, XService, X, XRepository`) is hard, because they are usually defined base on data (UserController, UserService, User, UserRepository) so they tend to be shared across other services. Avoid defining those relationships, favor defining product-based hierarchies:

`OneClickPurchase`, `StandardPurchase`, `SearchPage`, `Newsletter` are more expressive on business level and define boundaries better.

## Favor flat hierarchies, based on Value Object composition

Inheritance is not wrong, but if we use it without the correct reasoning behind can be a hotspot of coupling, Favoring composition of value objects makes the code easy to refactor and extract, and testing value objects is relatively easy compared to abstract classes.

## Use feature toggles to define boundaries

If you can disable your code, you can extract it. Define boundaries using feature toggles that can be disabled at any time. This will also make your code more reliable so a product or a feature can be disabled at any time if there is an incident. An example usage of feature toggles would be:

```java
public final class StandardPurchase {
    private final StandardPurchaseContext context;
    private final DeliveryInformation delivery;
    private final FeatureToggle toggle;

    ...constructor

    public PurchaseSummary summary(User forUser) {
        PurchaseSummary summary = context.summary(forUser);

        if (toggle.enabled(ONE_DAY_DELIVERY)) {
            OneDayDeliveryForecast forecast = delivery.oneDayDelivery(forUser);
            return summary.oneDayDelivery(forecast);
        }

        return summary;
    }
}
```

## Reconsider mocking if possible during tests

If you mock dependencies by default, you speed up test time. However, this can also lead to blurry boundaries in your code because mocking external dependencies is relatively cheap.

If your integration test is expensive, you might be depending on a big chunk of classes, disallowing you to extract or change the code you are testing easily in the future.
