---
layout: post
title: "A Beginner's Guide to LLM Skills: How Language Models Learn to Act"
date: 2026-07-17
categories: "LLM"
---
# A Beginner's Guide to LLM Skills: How Language Models Learn to Act

Large language models (LLMs) started out as text predictors . You gave them a prompt, they gave you words back. But the most interesting systems being built today don't just *talk*, they *do*: they search the web, call APIs, write code, and even move through virtual environments. The bridge between "a model that talks" and "a model that acts" is what the community has started calling **LLM skills** — structured, invokable, composable units of capability that an agent can call on to get something done.

This post is a beginner-friendly map of that space. We'll cover three things:

1. The core concepts behind LLM skills — prompt design, tool use, and the reasoning loops that make agents work.
2. The frameworks people actually use to build modular, skill-based assistants.
3. A more specialized (and fun) application area: LLM-driven skills inside VR educational systems, plus a brainstorm of skill ideas for anyone designing a VR tutor.

---

## 1. Core Concepts: LLM Skills, Prompt Design & Tool Use

Before touching any framework, it's worth understanding the handful of ideas that almost every agent system is built on top of.

### The Prompt Engineering Guide

The [Prompt Engineering Guide](https://www.promptingguide.ai/) (also on [GitHub](https://github.com/dair-ai/Prompt-Engineering-Guide)) by dair-ai is probably the single most comprehensive free resource on this topic, and it's a good place to start regardless of which model or framework you end up using. It documents techniques from the basics — zero-shot and few-shot prompting — up through more advanced patterns like Chain-of-Thought (CoT), Tree of Thoughts, and Self-Consistency.

For anyone specifically interested in *agents* and *skills*, go straight to its [Agents section](https://www.promptingguide.ai/agents), which covers agent components, context engineering, function calling, and — notably — [Deep Agents](https://www.promptingguide.ai/agents), a pattern for agents that plan, use sub-agents, and manage files across long, complex tasks. This is where "skills" as a design pattern really starts to take shape: instead of one giant prompt trying to do everything, you decompose behavior into smaller, well-scoped pieces that get invoked as needed.

The guide's dedicated page on **[ReAct prompting](https://www.promptingguide.ai/techniques/react)** is essential reading. ReAct (Reason + Act) is the loop underneath almost every tool-using agent you'll encounter: the model produces a *Thought* (reasoning about what to do), takes an *Action* (calls a tool), reads an *Observation* (the tool's result), and repeats until it's done. Once this loop clicks for you, most agent architectures — no matter how they're branded — start to look like variations on the same idea.

### OpenAI's Practical Guide to Building Agents

OpenAI's [**A Practical Guide to Building Agents**](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) ([direct PDF](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf)) is written for product and engineering teams evaluating whether and how to build their first agent. It's less academic than the Prompt Engineering Guide and more of an internal playbook, which makes it a great second read.

Two things make it especially useful for understanding "skills" as a concept:

- It works through concrete, modular examples — a refund agent, a research agent — showing how narrow, well-defined responsibilities compose into a working system.
- It gives practical guidance on *when to split one agent into several*, including signals like "too many overlapping tools" or "prompts full of nested if-then-else branches." That's effectively a guide to skill decomposition, even though the guide doesn't use that exact word.

If you're building with OpenAI's tooling specifically, the [Agents SDK documentation](https://developers.openai.com/api/docs/guides/tools) and the [function calling guide](https://developers.openai.com/api/docs/guides/function-calling) show how tool definitions, orchestration, and multi-agent composition actually get implemented in code.

### ReAct and tool calling, hands-on

Reading about ReAct is one thing; watching it run is another. A few resources are worth working through line by line:

- Anthropic's [Tool use overview](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) and [How tool use works](https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works) pages walk through the full request/response cycle: the model emits a `tool_use` block, your application executes it, and a `tool_result` goes back in. This is the actual mechanical implementation of the "Act" step in ReAct.
- OpenAI's [function calling guide](https://developers.openai.com/api/docs/guides/function-calling) shows the equivalent flow on their platform, including a full worked example (`get_horoscope`) you can copy and run.
- For a from-scratch understanding with no framework in the way, look for a plain-Python ReAct implementation (commonly under ~150–200 lines) — building the loop by hand once is worth more than reading about it five times.

### Modular prompts and skill files

As soon as you have more than a couple of behaviors, cramming everything into one "mega-prompt" stops scaling — it gets brittle, hard to test, and hard to reason about. The fix that most production systems converge on is **templating**: using something like [Jinja2](https://blog.promptlayer.com/prompt-templates-with-jinja2-2/) to build prompts with conditionals, loops, and reusable fragments, so that "skills" become swappable blocks rather than hardcoded text. This is conceptually the same idea as Anthropic's [Skills](https://docs.claude.com) feature and OpenAI's [Skills tooling](https://developers.openai.com/api/docs/guides/tools) — both let you package instructions, examples, and constraints into a discrete unit the model loads only when it's relevant, instead of paying the context cost for everything all the time.

---

## 2. LLM-Based Assistants with Modular Skills — Frameworks and Examples

Once you understand the underlying loop, the next question is: what do people actually build with? Here's the landscape as it stands.

### LangChain and LangGraph

[LangChain](https://github.com/langchain-ai/langchain) is the most widely adopted toolkit for composing LLM applications — models, tools, retrievers, and integrations all snap together through a common interface. [LangGraph](https://github.com/langchain-ai/langgraph), built by the same team, sits a level lower: it's a graph-based orchestration framework for agents that need cycles, branching, persistent state, and human-in-the-loop checkpoints — the kind of control flow a single linear chain can't express cleanly. LangGraph also documents [Deep Agents](https://github.com/langchain-ai/langgraph), which — much like the Prompt Engineering Guide's version — describes agents that plan, spin up sub-agents, and work across a virtual filesystem for complex, long-horizon tasks.

LangChain also maintains an [AutoGPT integration](https://python.langchain.com/api_reference/experimental/autonomous_agents/langchain_experimental.autonomous_agents.autogpt.agent.AutoGPT.html), which is a good case study in what "maximum autonomy, minimal human control" looks like when implemented on top of a more structured framework.

### CrewAI and AutoGPT

[CrewAI](https://github.com/crewAIInc/crewai) takes a different angle: instead of a graph of arbitrary nodes, it models **role-based multi-agent teams** — a "Researcher" agent, a "Writer" agent, an "Editor" agent — each with its own goal, backstory, and toolset, coordinating either sequentially or hierarchically through a manager agent. It's a natural fit whenever the task you're automating already looks like something a human team would divide up (financial analysis, content pipelines, customer support triage).

[AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) was one of the earliest widely-used examples of a fully autonomous agent: give it a goal in natural language, and it breaks that goal into sub-tasks and works through them with tools like web browsing and file management, largely without a human in the loop at each step. It's less commonly used as production infrastructure today, but it's still worth studying as the project that popularized the "give it a goal, let it figure out the steps" pattern that later frameworks refined.

A rough way to think about the trade-offs: LangChain is the best default if you need broad, pre-built integrations and a mature ecosystem; LangGraph is the right choice once your agent's control flow genuinely needs cycles, memory, and state; CrewAI shines when your problem is naturally team-shaped; and AutoGPT is worth reading as a design reference for maximal autonomy, even if you don't deploy it directly.

### Skill libraries and taxonomies

Beyond the big frameworks, there's a growing ecosystem of **skill libraries** — curated collections of pre-built, reusable skill definitions that plug into agent tools. One good example in the education space is [education-agent-skills](https://github.com/GarethManning/education-agent-skills), an open-source collection of over a hundred evidence-based pedagogical skills (lesson planning, rubric generation, scaffolding, assessment design) built to work with Claude, Codex, and other Agent-Skills-compatible tools. It's a useful reference for how a real, non-toy skill library is structured: YAML schema headers, typed inputs/outputs, and chaining metadata so skills can be composed programmatically rather than copy-pasted.

For the academic side of this, the survey [*LLM Agents for Education: Advances and Applications*](https://arxiv.org/html/2503.11733v2) is a solid, well-organized overview of how researchers currently categorize educational LLM agents — split broadly into pedagogical agents (supporting teachers and students directly) and domain-specific educational agents (tailored to a subject like language learning or science).

### Anthropic and OpenAI tool use, side by side

Finally, it's worth reading both platforms' official tool-use documentation back to back, since the underlying loop is the same but the implementation details differ:

- Anthropic: [Tool use with Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview), [Tool reference](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-reference)
- OpenAI: [Using tools](https://developers.openai.com/api/docs/guides/tools), [Function calling](https://developers.openai.com/api/docs/guides/function-calling)

Comparing them is a fast way to internalize what's a genuine design decision (how skills get scoped, when tools execute server-side vs. client-side) versus what's just API surface-level naming.

---

## 3. A Specialized Application: LLM Skills in VR Educational Systems

Once you've got the fundamentals, one of the more exciting places to see LLM skills in action is **virtual reality education** — systems where an LLM doesn't just answer questions, it drives an embodied agent that a learner can walk up to, talk with, and practice with inside a 3D space.

### PerVRML: personalized VR for machine learning education

[**PerVRML**](https://www.tandfonline.com/doi/full/10.1080/10447318.2025.2504188) (Gao, Xie & Kasneci, published in the *International Journal of Human–Computer Interaction*) is a ChatGPT-driven VR environment built to teach machine learning concepts — a notoriously abstract, math-heavy subject that benefits from being made concrete and spatial. The system pairs a ChatGPT-powered avatar that gives real-time assistance with a personalization layer that adapts the learning path using sensor data collected inside VR. In a between-subjects study, the personalized condition produced measurably better learning outcomes than the non-personalized one, and shifted how users experienced the assistance — evidence that "LLM skill selection based on real-time context" isn't just a nice idea, it changes results.

### ELLMA-T: an embodied agent for English learning in social VR

[**ELLMA-T**](https://arxiv.org/abs/2410.02406) (Pan, Kitson, Wan & Prpa) takes a similar idea into language learning. It's an embodied conversational agent built on GPT-4 and deployed inside VRChat, a social VR platform, grounded in a *situated learning* framework — the idea that language is best practiced in a believable, contextual setting rather than through isolated drills. ELLMA-T assesses a learner's level, generates a conversation scenario tailored to it (haggling at a virtual market stall, chatting with a museum curator, ordering at a café), and role-plays through it in real time. A qualitative study with 12 participants found the system capable of producing realistic, believable role-play and useful ongoing feedback — while also surfacing open design questions about pacing, trust, and how much correction is helpful versus distracting.

Between these two systems you can already see a pattern in what "skills" look like once an LLM is embodied in VR: it's not just "answer this question," it's a combination of *scene/role-play generation*, *learner-level assessment*, *real-time feedback*, and *adaptive path planning*, all coordinated together rather than invoked in isolation.

### Brainstorm: candidate skills for a VR educator agent

If you're a student or builder sketching out your own VR tutor, it helps to break "the agent" down into a skill inventory rather than one big prompt. Here's a starting taxonomy, loosely inspired by libraries like [education-agent-skills](https://github.com/GarethManning/education-agent-skills):

**Core interaction skills**

- Voice/speech recognition and natural-sounding response generation
- Real-time dialogue generation that stays in character/scenario
- Pronunciation and grammar feedback
- Role-play scenario creation (the core of what ELLMA-T does)

**Personalization and adaptation**

- Student progress tracking, potentially informed by VR sensor/gaze/interaction data (as in PerVRML)
- Adaptive learning-path generation
- Real-time difficulty adjustment based on performance signals

**Educational content**

- Lesson summarization
- Quiz and exercise generation
- Concept explanation paired with visuals or animation
- Scaffolding — a "hint ladder" that reveals help gradually rather than all at once

**VR-specific skills**

- Scene and object understanding (e.g., recognizing which virtual lab item the learner picked up)
- Spatial navigation guidance
- Haptic or embodied feedback integration
- Multi-user collaboration moderation, for group VR sessions

**Support tools**

- Retrieval-augmented (RAG) access to a curated knowledge base, so the agent isn't answering purely from parametric memory
- Assessment scoring
- Progress report generation for teachers or parents
- Safety and ethical guardrails — especially important given the age range VR education often targets

**Advanced patterns**

- Sub-agent orchestration: a tutor agent that delegates to a content-generator agent and a separate verifier agent, echoing the "Deep Agents" pattern from Section 1
- Long-session memory, so the agent remembers a learner across multiple visits
- True multimodal integration — text, voice, and gesture read and responded to together

None of these skills is exotic in isolation — they're each a fairly ordinary prompt-plus-tool combination. What makes systems like PerVRML and ELLMA-T interesting is the *orchestration*: deciding which skill to invoke, when, based on what the learner just did in a 3D space.

---

## Where to Go From Here

If you're new to this space, a reasonable learning path looks like:

1. Read the [Prompt Engineering Guide&#39;s Agents section](https://www.promptingguide.ai/agents) and the [ReAct page](https://www.promptingguide.ai/techniques/react) to understand the core reasoning loop.
2. Skim [OpenAI&#39;s Practical Guide to Building Agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) for the product/engineering perspective on when and how to split an agent into skills.
3. Pick one framework — [LangGraph](https://github.com/langchain-ai/langgraph) if you want low-level control, [CrewAI](https://github.com/crewAIInc/crewai) if your problem is team-shaped — and build a two-skill toy agent to feel the mechanics firsthand.
4. If education or embodiment interests you, read [PerVRML](https://www.tandfonline.com/doi/full/10.1080/10447318.2025.2504188) and [ELLMA-T](https://arxiv.org/abs/2410.02406) end to end, and try sketching your own skill inventory the way we did above.

LLM skills aren't a single technology — they're a design pattern: break a big, vague capability into small, well-scoped, invokable pieces, and let the model reason about which ones to call and when. Once that clicks, most of what looks like "agent magic" turns out to be that one idea, applied consistently.
