---
title: "Talks"
layout: gridlay
permalink: /talks/
description: "Invited and conference talks by Wenhao Yang on extended reality, robotics, and human-robot interaction."
---

# Talks

<div class="section-card" id="pubList">
<h3>Invited Talks</h3>

{% bibliography --query @incollection[keywords ^= invited] %}

<h3>Regular Talks</h3>

{% bibliography --query @incollection[keywords != invited] %}
</div>
