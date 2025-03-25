---
layout: default.liquid
pagination:
  include: All
  per_page: 9
  permalink_suffix: "./{{ num }}/"
  order: Desc
  sort_by: ["published_date"]
  date_index: ["Year", "Month"]
---

<ul id="index">
{% for post in paginator.pages %}
 <li>
	<a data-ctrl="{{forloop.index}}" href="{{ post.permalink }}"><span>^{{forloop.index}}</span> {{post.title}} - {{post.published_date | date: "%Y-%m-%d" }}</a>
</li>
{% endfor %}
</ul>

<div>
  {% if paginator.previous_index %}
  <span>
    <a
    href="/{{ paginator.previous_index_permalink }}">Previous</a>
  </span>
  {% endif %}
  {% if paginator.next_index %}
  <span>
    <a
    href="/{{ paginator.next_index_permalink }}">Next</a>
  </span>
  {% endif %}

  <div>
    {{ paginator.index }} / {{ paginator.total_indexes }}
  </div>
  <div>
    {% if paginator.previous_index %}
    <span>
      <a href="/{{ paginator.first_index_permalink }}">First</a>
    </span>
    {% endif %}
    {% if paginator.next_index %}
    <span>
      <a href="/{{ paginator.last_index_permalink }}">Last</a>
    </span>
    {% endif %}
  </div>
</div>
