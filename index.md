---
layout: default.liquid
title: Latest Posts
pagination:
  include: All
  per_page: 10
  permalink_suffix: "./{{ num }}/"
  order: Desc
  sort_by: ["published_date"]
  date_index: ["Year", "Month"]
---

<ul id="index">
  {% for post in paginator.pages %}
  <li>
    <a data-ctrl="{{forloop.index0}}" href="{{ post.permalink }}"><span>^{{forloop.index0}}</span> {{post.published_date | date: "%Y-%m-%d" }} {{post.title}}</a>
  </li>
  {% endfor %}
</ul>

<div id="pagination">
<ol>
{% if paginator.previous_index %}
<li><a data-ctrl="O" href="/{{ paginator.previous_index_permalink }}"><span>^O</span> Previous Page</a></li>
{% endif %}
{% if paginator.next_index %}
<li><a data-ctrl="P" href="/{{ paginator.next_index_permalink }}"><span>^P</span> Next Page</a></li>
{% endif %}
</ol>
<div>

