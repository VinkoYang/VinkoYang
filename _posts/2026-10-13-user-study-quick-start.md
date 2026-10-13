---
layout: post
title: "A Quick Start on User Studies for XR Research"
date: 2026-10-13
categories: ["Teaching & Learning"]
tags: ["user-study", "research-methods", "experimental-design", "xr", "vr", "advising"]
---

Most students who join an XR project arrive knowing how to build or how to read, but not how to run a study with people in it. Then the first literature table fills up with words like *within-subjects*, *counterbalanced*, *NASA-TLX*, *Wilcoxon* and *I-CVI*, and every paper feels like it is written in a language you only half speak.

This post is the short version of that language: the ideas you need to read a user-study paper, understand what was done, and sketch a sensible design of your own. Statistics come in only as far as you need them to read a Results section. Read it once from top to bottom, then keep it open while you fill in your literature table. (For the building side, see [A Learning Path for Unity and XR Development](/blogs/unity-xr-learning-path/).)

Throughout, I use one made-up example: a VR fire-evacuation trainer in which we vary how dense the smoke is (light or heavy) and whether there is a countdown timer (no timer or a timer), and we want to know how these affect the trainee.

## 1. The basic vocabulary

Every user study answers some version of one question: *when we change X, what happens to Y, for these people?*

| Term | Meaning | In the example |
| --- | --- | --- |
| Independent variable (IV), also called a factor | What you deliberately change | Smoke density; timer |
| Level | One value of a factor | Light / heavy; no timer / timer |
| Condition | One combination of levels that a participant experiences | Light smoke + no timer, and so on: 2 × 2 = 4 conditions |
| Dependent variable (DV) | What you measure to see the effect | Workload, evacuation time, errors |
| Construct | The abstract thing you care about | "Workload", "situation awareness", "presence" |
| Measure / instrument | The concrete tool that turns a construct into a number | NASA-TLX for workload; SUS for usability |
| Operationalization | Your decision about which measure stands for which construct | "We operationalize workload as the Raw NASA-TLX score" |
| Confound | Anything that changes along with your IV and could explain the result instead | If heavy smoke is always tested second, fatigue is a confound |
| Control variable | Something you hold constant on purpose | Same headset, same room, same instructions |

The distinction between **construct** and **measure** matters most. A paper may say it studied "learning", but what it actually measured might be a 10-question multiple-choice quiz. When you read a paper, always write down the measure, not just the construct. Two papers that both claim to study "learning" may not be measuring the same thing at all.

A design is usually written as levels × levels. "A 2 × 2 design" means two factors with two levels each. "A 3 × 2 design" means one factor with three levels and one with two.

## 2. Within-subjects vs. between-subjects

This is the first design decision in almost every study, and the first thing to identify when you read one.

**Between-subjects:** each participant experiences **only one** condition. Different people go into different groups, and you compare the groups.

**Within-subjects** (also called *repeated measures*): each participant experiences **all** conditions. You compare each person with themselves.

| | Between-subjects | Within-subjects |
| --- | --- | --- |
| Who sees what | One condition per person | Every condition per person |
| Participants needed | Many more | Far fewer, because each person is their own control |
| Individual differences (skill, gaming experience, age) | Add noise between groups; need randomization and a large n | Largely cancelled out |
| Order effects (learning, fatigue, carryover) | None | Serious; must be counterbalanced (section 3) |
| Session length | Short | Longer; fatigue and simulator sickness build up |
| Use when | Exposure to one condition would change how someone responds to another (for example, once you learn the route, you cannot unlearn it) | Conditions can be experienced in sequence without one contaminating the next |

**Mixed design:** some factors within, some between. A common XR example: *expertise* (novice vs. professional) is necessarily between-subjects, because you cannot be both, while the *scenario conditions* are within-subjects.

How to tell from a paper: look in the Method section for phrases like "each participant completed all four conditions" (within) or "participants were randomly assigned to one of two groups" (between). If the paper reports a "control group", it is at least partly between-subjects.

## 3. Order effects and counterbalancing

In a within-subjects study, the order in which conditions are experienced can produce effects of its own:

- **Practice / learning:** people get better at the task over time, so later conditions look easier.
- **Fatigue and sickness:** people get tired or queasy, so later conditions look harder.
- **Carryover:** something specific about condition A changes how people respond to condition B. For example, after heavy smoke, light smoke feels trivially easy.

If everyone does the conditions in the same order, you cannot separate the effect of the condition from the effect of its position. The fix is **counterbalancing**: vary the order across participants so that each condition appears in each position equally often.

- **Two conditions (A, B):** half the participants do A then B, half do B then A.
- **Full counterbalancing:** use every possible order. With 4 conditions that is 4! = 24 orders, which needs at least 24 participants and quickly becomes impractical.
- **Latin square:** a smaller set of orders in which each condition appears once in each position. With 4 conditions you need 4 orders.
- **Balanced Latin square:** a Latin square where, in addition, each condition is *immediately preceded* by every other condition equally often. This also controls first-order carryover. For 4 conditions:

| Participant group | 1st | 2nd | 3rd | 4th |
| --- | --- | --- | --- | --- |
| 1 | A | B | D | C |
| 2 | B | C | A | D |
| 3 | C | D | B | A |
| 4 | D | A | C | B |

The number of participants should then be a multiple of the number of orders (4, 8, 12 ...), so every order is used equally.

Counterbalancing spreads order effects evenly; it does not make them disappear. A good analysis still checks for them, for example by including *period* (position 1–4) in the statistical model. If a paper reports that the effect was strong in one order group and absent in the other, that is a warning sign that carryover was at work.

## 4. Kinds of study you will meet in the literature

| Design | What it looks like | What it can claim |
| --- | --- | --- |
| Randomized controlled trial (RCT) | Participants randomly assigned to VR vs. a comparison (lecture, live drill) | Strongest causal claim for between-group comparisons |
| Quasi-experiment | Groups exist already (two class sections, two hospitals), no random assignment | Weaker; groups may differ before the study starts |
| Within-subjects experiment | Everyone experiences all conditions, order counterbalanced | Strong causal claim about the conditions, with fewer people |
| Single-group pre/post | One group, test before and after VR training | Weak: improvement could be practice on the test, time, or motivation, not VR |
| Usability / feasibility study | Small group uses the system, rates it, gives feedback | Can say "usable and acceptable", cannot say "better than" |
| Qualitative study | Interviews, focus groups, thematic analysis | Explains *why* and *how*; does not estimate effect sizes |
| Systematic review | Structured search and synthesis of many studies (PRISMA) | What the field as a whole shows, and where the gaps are |

When you fill in a literature table, the design column is often the most informative one. Many VR training papers are single-group pre/post or small usability studies, and their claims should be weighed accordingly.

## 5. What can you measure?

Measures fall into five broad families. A strong study usually combines at least two, such as one objective and one subjective measure of the same construct.

1. **Objective performance:** task time, errors, accuracy, checklist scores, test scores.
2. **Subjective / self-report:** questionnaires and rating scales.
3. **Physiological:** heart rate, heart-rate variability, skin conductance, cortisol.
4. **Behavioral:** what people do, logged by the system or coded from video: where they look, how they move, hesitations, repeated actions.
5. **Qualitative:** interviews and open-ended responses.

The constructs that come up most often in XR training research, with the standard instruments:

| Construct | Common instruments / metrics | How it is scored | How to interpret |
| --- | --- | --- | --- |
| Knowledge / learning | Pre- and post-test, usually multiple choice | % correct; gain = post − pre | Compare against a control group or condition. A gain without a comparison is weak evidence. |
| Retention | The same or a parallel test after a delay (e.g., 2 weeks, 2 months) | % correct at follow-up | Compare with the immediate post-test. Most studies lose some of the gain. |
| Skill performance | Task time, error count, accuracy (e.g., triage accuracy), expert checklist ratings | Depends on task | Needs a defined correct answer or an expert rubric. Report inter-rater agreement if humans score it. |
| Workload | NASA-TLX (Hart & Staveland, 1988): 6 subscales (mental, physical, temporal demand, performance, effort, frustration) | Each 0–100. *Weighted* TLX uses 15 pairwise comparisons; *Raw* TLX (RTLX) is the plain average. | No universal "high" cutoff. Interpret relative to the other conditions in the same study, and look at which subscales moved. |
| Situation awareness (objective) | SAGAT (Endsley): freeze the simulation and ask questions about the current situation | % correct, split by Level 1 (perception), Level 2 (comprehension), Level 3 (projection) | Higher = better SA. Questions must be answerable only from the current scene, not from general knowledge. |
| Situation awareness (subjective) | SART (Taylor, 1990), 10-item or 3-item version | 3-D version: SA = Understanding − (Demand − Supply) | Self-rated, so it measures how aware people *feel*. Pair it with SAGAT. |
| Usability | SUS, System Usability Scale (Brooke, 1996): 10 items | 0–100 | About 68 is average across many published studies. Above 80 is generally considered good, below 50 poor. |
| Presence | IPQ, Igroup Presence Questionnaire (Schubert et al., 2001): 14 items | Subscales: spatial presence, involvement, experienced realism, plus one general item | Mostly used to compare conditions or systems. There is no universal benchmark. |
| Simulator sickness | SSQ (Kennedy et al., 1993): 16 items; VRSQ (Kim et al., 2018): 9 items, designed for HMDs | Subscale and total scores | Measure before and after exposure, and look at the change. Also decide in advance on a stop rule for participants who feel unwell. |
| Stress / arousal | Heart rate, HRV (e.g., RMSSD), skin conductance, salivary cortisol; STAI self-report anxiety | Physiological units; questionnaire totals | Needs a baseline to compare against. Physiological signals are noisy, so check how the paper handled artifacts. |
| Confidence / self-efficacy | Likert-scale self-ratings, often study-specific | Mean score | Often homemade and unvalidated. Check whether the paper reports reliability. |
| Content validity (expert judgment) | CVI: experts rate each item's relevance on a 4-point scale | I-CVI = proportion of experts rating 3 or 4; S-CVI/Ave = mean I-CVI | With 6–10 experts, keep items with I-CVI ≥ .78 (Lynn, 1986; Polit, Beck & Owen, 2007); S-CVI/Ave ≥ .90 is the usual target (Polit & Beck, 2006). |

Two habits help when you read papers:

- Write down the instrument by name. "Workload was higher in VR" means little until you know it was NASA-TLX, which version, and when it was given.
- Notice when an instrument is described without being named. A sentence like "no differences in mental demand, temporal demand, effort or frustration" is almost certainly reporting NASA-TLX subscales.

## 6. Reliability and validity in one paragraph each

**Reliability** is consistency: does the measure give the same answer under the same conditions? For questionnaires, the usual check is internal consistency (Cronbach's alpha; .70 or above is the common rule of thumb). When humans score something, such as coding videos, the check is agreement between two independent coders (Cohen's kappa).

**Validity** is whether the measure captures the construct it claims to. A homemade quiz about general fire-safety facts may be reliable and still not measure *performance in the scenario*. That is why established instruments are preferred: someone has already done the work of showing they measure what they claim. When a paper invents its own instrument, check whether it reports any evidence of reliability or validity. Many do not.

## 7. Sample size and power

**Statistical power** is the probability that your study detects an effect that really exists. The convention is to aim for at least .80. Power depends on four things:

1. **Effect size:** how big the real difference is. Cohen's d of 0.2 is small, 0.5 medium, 0.8 large.
2. **Alpha:** the false-positive threshold, almost always .05.
3. **Sample size (n).**
4. **Design:** within-subjects designs need far fewer participants than between-subjects designs for the same effect.

You do a **power analysis** before the study: pick the smallest effect worth detecting (ideally based on earlier studies), and compute the n you need. [G\*Power](https://www.psychologie.hhu.de/arbeitsgruppen/allgemeine-psychologie-und-arbeitspsychologie/gpower) is free and is the standard tool for this.

Why it matters when you read papers: a study with 12 participants that finds "no significant difference" has usually not shown that there is no difference. It most likely did not have enough participants to see one. Treat a null result from a small study as "we don't know", not "VR is as good as".

Also look for effect sizes and confidence intervals, not only p-values. A p-value tells you whether the effect is distinguishable from zero. The effect size tells you whether it is big enough to matter.

## 8. Which statistical test, and why

You do not need to run these yet, but you should recognize them and know why a paper chose one.

| Comparison | Data roughly normal | Not normal, or ordinal (e.g., Likert ratings) |
| --- | --- | --- |
| 2 conditions, within-subjects | Paired t-test | Wilcoxon signed-rank test |
| 2 groups, between-subjects | Independent-samples t-test | Mann–Whitney U test |
| 3+ conditions, within | Repeated-measures ANOVA | Friedman test |
| 3+ groups, between | One-way ANOVA | Kruskal–Wallis test |
| 2+ factors (e.g., 2 × 2) | Factorial ANOVA (repeated-measures if within): main effects and interaction | Aligned rank transform (ART) ANOVA |
| Categorical outcome (e.g., pass/fail counts) | Chi-square test | Fisher's exact test for small samples |
| Repeated trials per person, binary outcomes, different items per person | Mixed-effects models (LMM for continuous outcomes, GLMM for binary) | |

Three ideas worth understanding now:

- Main effect vs. interaction. In a 2 × 2 design, a *main effect* of smoke means heavy smoke raises workload on average, regardless of timer. An *interaction* means the effect of smoke depends on the timer: for example, heavy smoke matters a lot only when there is also a countdown. Interactions are often the most interesting result, and they are only visible in factorial designs.
- Why paired tests for within-subjects data? The two scores from one person are not independent. A paired test compares each person with themselves, which is where the within-subjects design gets its extra power.
- Why are mixed-effects models increasingly standard? When each person answers many items, and the items differ in difficulty, a mixed model treats *participant* and *item* as random effects. Hard items don't masquerade as a condition effect, and you don't have to average away the trial-level data.

## 9. Running the study

In my experience, more user studies go wrong in the procedure than in the analysis.

- Get IRB approval first ([Lamar IRB](https://www.lamar.edu/research/research-and-sponsored-programs/research-compliance/irb/)). No data collection with human participants before approval, including pilots that will be reported. Changes to an approved study need an amendment.
- Get informed consent. Participants know what they will do, the risks (in XR: sickness, collisions), and that they can stop at any time.
- Use a written script. Every participant hears the same instructions, word for word. Ad-hoc help from the experimenter is a confound.
- Build in familiarization. Novices need time to learn the headset and controls before the measured trials. Otherwise you are measuring how unfamiliar the hardware is, not your conditions.
- Pilot. Run the full protocol on a few people first. You will always find something broken.
- Decide randomization and order assignment in advance, on an order sheet, not on the day.
- Manage the data. Use participant IDs, not names, in data files, and store identifiable data separately and securely.
- Decide the analysis before seeing the data. Writing down your hypotheses and analysis plan in advance keeps you honest. You can still run exploratory analyses later, but label them as exploratory.

## 10. A checklist for reading one user-study paper

For every empirical paper in your literature table, you should be able to answer these questions without looking back at the paper:

1. What was the research question?
2. Who were the participants, and how many (n)? Novices or professionals?
3. What was varied (IVs and their levels)? Within-, between-, or mixed design?
4. If within-subjects: was the order counterbalanced, and how?
5. What tasks did participants perform, and in what kind of VR scenario?
6. What was measured (DVs), with which named instrument, and when?
7. Which statistical test was used? Does it fit the design?
8. What was the main result, with one actual number (a mean, a difference, an effect size)?
9. What are the weaknesses (sample size, no control group, homemade measures, no follow-up)?
10. What does this paper mean for *our* study: a measure to adopt, a design to avoid, a gap to fill?

If you can answer all ten, you understand the paper. If you cannot answer 3, 6 and 8, you have not read it yet.

## 11. Going from the literature to your own measures

Once 15–20 papers are in your table, read down the columns instead of across the rows. For each construct, ask:

- How many papers measured it, and with which instruments?
- Which instrument is the most common, and is it validated?
- What benchmark or comparison did people use to interpret the score?
- Which constructs does *nobody* measure in this area? Those are your gaps.

Then build a short table for your own study, one row per thing you plan to measure:

| Factor (construct) | Why it matters for our question | Measure / instrument | When it is collected | Evaluation standard |
| --- | --- | --- | --- | --- |
| Workload | The conditions are meant to load the trainee differently | Raw NASA-TLX, 6 subscales | Right after each condition | Compare conditions; which subscales change |
| Usability | Results only count if the system itself is not the obstacle | SUS | Once, end of session | Compare against 68 (average) |
| ... | | | | |

A row is not finished until you can say, in one sentence each, why this construct matters for your question and how you will know whether a score is good or bad.

## Further reading

- Jonathan Lazar, Jinjuan Heidi Feng and Harry Hochheiser, *Research Methods in Human-Computer Interaction*, 2nd ed. (Morgan Kaufmann, 2017). The most complete single book on everything in this post.
- I. Scott MacKenzie, *Human-Computer Interaction: An Empirical Research Perspective* (Morgan Kaufmann, 2013). Especially good on experimental design and counterbalancing.
- Jeff Sauro and James R. Lewis, *Quantifying the User Experience*, 2nd ed. (Morgan Kaufmann, 2016). Sample sizes, confidence intervals, and SUS interpretation.
- Andy Field, Jeremy Miles and Zoë Field, *Discovering Statistics Using R* (SAGE, 2012), or the SPSS edition. Friendly and thorough when you reach the analysis stage.
- [MeasuringU on the System Usability Scale](https://measuringu.com/sus/). Where the "68 is average" benchmark comes from, in plain language.
