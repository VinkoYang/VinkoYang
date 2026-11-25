---
layout: research_post
title: "Kyozo Link: Local Language Model Robot Control Improved by a Coding Agent"
date: 2026-11-24
categories: ["Research Projects"]
tags: ["large-language-models", "coding-agents", "robot-control", "tool-use", "local-deployment"]
project_id: kyozo-link-local-language-model-robot-control-improved-by-a-coding-agent
---

<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7526859710323552256?compact=1" width="504" height="399" style="max-width: 100%; border: 0;" loading="lazy" allowfullscreen title="Kyozo Link demo video on LinkedIn"></iframe>

## What problem this addresses

Many plants still run older equipment with little vendor support, and custom control software for that equipment has usually cost more to write than it was worth. AI coding tools now write, test, and rewrite applications of tens of thousands of lines. Therefore, a small team could get control software for an old machine within a few weeks. There is a catch, which is that nobody on the team may have written the code, chosen its algorithms, or read it before it runs. The paper calls this **functionally anonymous code**. The term does not mean that the author is unknown, since every change is logged and attributed to the AI. It means that the team learns the design only from summaries the AI writes.

This project asks whether AI can write and then improve the software for a real robot cell, and what the team has to do to trust that software when no one reviews it line by line. The work started in a graduate course on AI software development, which taught context engineering, that is, treating everything a model sees as information to be designed. Rafiul Azim Jowarder, a graduate student in our department, directed the AI development, and Dr. James Curry designed the study. Both of them came from software development with limited robotics experience. I worked with them on the robotics side from the start, and many of the bugs that came up during development were solved with my input.

## Approach

The cell was chosen to make success hard (see [Figure 1](#fig-1)). The arm is an older Dobot Magician (DT-MG-4R005-02E) that has been through several undergraduate courses. It bounces at the end of moves and often sets off controller alarms. The two-finger gripper opens 27.5 mm, and the red, green, and blue cubes are 25 mm wide, which leaves 1.25 mm of clearance per side. An Orbbec Gemini 335 depth camera sits beside the arm on a mount that is not very stable. The planner is Qwen3-4B-Instruct (4-bit), served by Ollama on an ASUS Zenbook 14 laptop with no discrete GPU, and it runs on the CPU at about 16 tokens per second. No cloud service is used at run time.

<figure id="fig-1" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/kyozo-link/kyozo-cell.jpg' | relative_url }}" alt="Dobot Magician arm with a two-finger gripper, three colored cubes on a white table, and a depth camera stand in the foreground" loading="lazy">
<figcaption>Figure 1. The robot cell. The Dobot Magician and its two-finger gripper, three 25 mm cubes on the work surface, and the Orbbec Gemini 335 depth camera on its stand in the foreground.</figcaption>
</figure>

Claude Opus 5.5, working through Claude Code, wrote every line of the software: the application, its tests, a watcher that scores each run, and a digital twin. The starting context was a photo of the arm's nameplate (see [Figure 2](#fig-2)), the project goals, and a few simple commands. From there, the engineer's sessions, lab observations, and run records steered each update. The application follows the Code as Policies approach. For each typed request, the local Qwen model writes a short program over 25 tested function tools, and it never moves the arm directly. The application checks each step before it runs, refuses moves outside a safety box, and accepts `done()` only when nothing is held and its own goal check passes. A fixed prompt prefix of about 5,600 tokens holds the rules and tool schemas, and since Ollama reuses its work on that prefix, an answer takes about 4 s on the laptop instead of about 2 min.

<figure id="fig-2" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/kyozo-link/kyozo-nameplate.jpg' | relative_url }}" alt="Nameplate on the back of the Dobot Magician showing the model number DT-MG-4R005-02E and the power rating" loading="lazy">
<figcaption>Figure 2. The starting context. Claude was given this photo of the arm's nameplate together with the project goals and a few simple commands. The nameplate gives the model number but says nothing about the wear on the arm, the gripper, or the cubes.</figcaption>
</figure>

The system keeps three kinds of agent apart (see [Figure 3](#fig-3)). The planning agent is Qwen3-4B inside the app. The watcher contains no language model and shares no code with the app. It uses its own cube detector and matches cubes before and after each run with the Hungarian method, so a fault in the app's detector cannot also hide in the score. The development agents are Claude Code and separate review agents that start with a fresh context. They change the code only between rounds, and the engineer approves or defers each change. Each new version first runs the full task chain in the PyBullet twin, with the real Qwen model, before it reaches the arm.

<figure id="fig-3" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/kyozo-link/kyozo-architecture.png' | relative_url }}" alt="Diagram of development time and run time: Claude Code and review agents produce a new version that is checked in a digital twin, then deployed to the Kyozo Link app, whose runs are scored by a separately coded watcher" loading="lazy">
<figcaption>Figure 3. Development time and run time. Run records drive each update, the engineer approves every change, and each new version runs in the digital twin before it reaches the arm. The parts marked FIXED did not change across the four rounds: the Qwen model and its settings, the watcher's pass rule (10 mm, 8°), and the safety box, reach limits, speed limits, and software emergency stop.</figcaption>
</figure>

The test is a chain of 20 tasks in four groups of five: moving cubes 40 or 50 mm, swapping and turning cubes by 30° or 45°, building and taking down towers of two, and building and taking down a tower of three. Each task starts from whatever table the previous task left. The watcher passes a cube within 10 mm and 8° of its target, and these limits are about a quarter of the smallest change a task asks for, so a cube left in place or a missed turn cannot pass. After a baseline round, Claude read the run records, proposed changes, and the engineer chose which ones to make. Claude was told to improve the app in general and not to tune it to the 20 tasks. Over three updates, Claude raised 44 ideas and 25 were tried.

## Results

The first version ran on the robot 12 days after kickoff, with 11,803 lines and 127 tests. By the fourth round, the code had grown to 65,898 lines and 880 tests. Every step ended in a working state, meaning that the version passed all of its automated tests and ran its typed requests on the real arm without a software crash or an unhandled controller alarm. Along the way, Claude traced unanswered moves to a checksum bug in the open-source pydobot driver (modulo 255 instead of 256), and the fix was sent to the pydobot maintainers.

On the real arm, the four rounds passed 50%, 20%, 60%, and 65% of the 20 tasks. Each round was a single chained run, so these numbers are descriptive. The 95% Wilson intervals for Rounds 1, 3, and 4 overlap (30–70%, 39–78%, and 43–82%), and the differences among those rounds are not established. On the 15 tasks that could be scored in every round, the arm passed 10 in Round 1 and 11 in Round 4. Round 2 is the instructive one. Update 1 removed the step that reset the cubes to a known layout before each task, so tasks on the arm began from positions near the reach limit or with cubes close enough to confuse the detector. The twin passed 19 of 20 tasks with the same version because its cubes always started in good positions.

The twin, built from the arm's published specification, passed 90% to 100% of the chain for the last three versions, while the arm failed tasks that the twin passed. The gap between the twin and the arm fell from 75 points in Round 2 to 40 in Round 3 and 25 in Round 4. The watcher's records traced many of the arm's failures to the equipment. One example is a gripper mounted about 20° off on the wrist. A 15° plausibility limit in the code made the app discard its own angle check, and this hid the offset for three rounds. After the correction in Update 3, the median angle error of the turned cubes fell from 25.6° to 11.9°, but most of them still missed the 8° limit. Many of the remaining failures came from the worn gripper, which sometimes held a cube that had slipped to an angle even though it looked aligned to both the camera and the person watching. The context held the nameplate, but not the condition of the arm, gripper, and cubes, and that is what the twin could not model.

The baseline and the three updates took 125 h of wall time and 18.8 million tokens. People spent 22.9 h on the baseline and three updates (17.3 h of the engineer in the chat and 5.6 h in the lab), while Claude worked 32.4 h on its own. At the commonly recommended code review rate of 200 lines per hour, one careful reading of the full code base would take at least 330 h, about eight person-weeks that the project did not budget. The code therefore went into use with no human code review. Instead, the team checked how the software behaved: the separately coded watcher scored every run, the twin ran the full chain before each release, review agents found about 40 issues in Updates 1 and 2 before they reached the arm, and the engineer approved each change from its evidence. These checks still missed the 15° limit for three rounds.

From this case, the paper suggests three controls for industry. First, safety functions belong in a layer the development loop cannot change, such as the controller's own limits, hardware interlocks, and a hardware emergency stop. In this project, the safety box and limits were part of the AI-written application, and no update loosened them, but the loop could have. Second, change review needs agents and tests that keep pace with AI-written changes. Last, the instrument that scores the system should be independent of the code it scores and out of reach of the agent that changes that code.

The paper, "Building Robot Arm Control Software from Nameplate Context via Working Code Iterations" by Rafiul Azim Jowarder, James Curry, and Wenhao Yang, was submitted to IEEE GECA 2027 on October 30, 2026.

## What's next

The case has clear limits. Each round was a single chained run, the same 20 tasks were used to improve the app and to measure it, it covers one worn arm, one gripper, one cube size, and one camera mount, and there is no comparison with software built without AI. The twin is kinematic only. Repeated runs with a fixed reset protocol, and tasks held out from the improvement loop, would be needed before any claim about how much each update helped.

The team next plans to measure how the time to build automation software with AI changes from one project to the next, and how much faster porting a working controller to new equipment is than starting from a nameplate. The other direction is system-level control, where all of the hardware in a cell runs similar AI-generated controllers. The [code and the full development record](https://github.com/jowarder/kyozo-link-dobot-magician) are public, including the application, the watcher, the digital twin, the tests, Claude's change log, the change ledger for each update, and the report for each round.
