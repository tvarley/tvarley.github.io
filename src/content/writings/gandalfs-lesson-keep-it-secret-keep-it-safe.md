---
title: "The AI Engineer Mindset: Gandalf's Lesson — Keep It Secret, Keep It Safe"
seriesTitle: "The AI Engineer Mindset"
subtitle: "Gandalf's lesson for AI: deliberately withhold context from EPIC to Story to Task. Full disclosure breeds sycophantic hallucinations; progressive secrecy yields precise execution."
summary: "How the engineering discipline of task refinement—holding secrets at each layer from broad EPICs to granular Tasks—counters AI's trained compulsion to please, reduces hallucinations, and echoes the shift from open AI conversations to controlled, context-starved precision in the agentic era."
date: 2026-05-07
category: "article"
tags: ["ai", "mindset", "engineering", "task-management", "agile", "agentic", "planning", "context", "hallucination"]
draft: false
heroImageAlt: "Abstract vector illustration of a glowing ring held in shadow, symbolizing deliberate context withholding in AI task refinement"
heroImage: '/images/keep_it_secret.png'
---

# The AI Engineer Mindset: Gandalf's Lesson — Keep It Secret, Keep It Safe

> *"Keep it secret. Keep it safe."* — Gandalf to Frodo, *The Fellowship of the Ring*

The ring of power was too dangerous to share. Its full nature, if known, would corrupt even the wise. So it stayed hidden, parceled out only as needed, context strictly rationed.

In the AI engineer mindset, your prompts are that ring. Previous essays in this series urged open, full-context dialogues with *your* AI—Socratic back-and-forths, complete codebase drops, unfiltered goal sharing—to unlock metacognition and orchestration (see Part 1: Orchestration and Control, and Part 2: Dialoguing with the Unconscious). That was the right prescription for *thinking together*.

But for *execution*? The opposite. Reveal nothing until the moment demands it. The AI's trained compulsion to please you—to generate the cleverest, most comprehensive response—will otherwise turn every vague prompt into a hallucinated fever dream of invented features, wrong abstractions, and solutions to problems you never posed.

Task refinement is the deliberate art of keeping secrets. From EPIC vision to Story value to Task implementation, each layer withholds just enough to starve the sycophant and feed the craftsman.

## The Sycophantic Toddler Problem (Revisited and Weaponized)

In earlier pieces I described unfocused agents as "Sycophantic Toddlers"—eager, literal, desperate to earn your approval by any means. They hallucinate because you gave them everything: the entire repo, the user interviews, the OKRs, the tech debt list, the "and make it pretty."

The result is predictable. The model, wired by training to maximize helpfulness and coherence, fills gaps with plausible nonsense. It adds onboarding gamification you never requested because "users love games." It chooses a new state management library because the old one "felt limiting." It pleases the prompt, not the problem.

Agile practitioners have long argued for progressive decomposition because big, context-rich items produce scope creep and estimation failure. Emerging agentic-AI playbooks echo the same pattern: broad PLAN for discovery; narrow, secret-free ACT for delivery. Fresh sessions per phase ensure the model cannot over-index on prior context.

Withholding is not distrust. It is precision engineering.

**Full Context vs. Secret Refinement**

| Prompt Style       | AI Behavior                          | Outcome                          |
|--------------------|--------------------------------------|----------------------------------|
| Entire repo + goals| Sycophantic invention, scope creep  | Hallucinated features, rework   |
| EPIC only (PLAN)   | Exploration, risk surfacing         | Aligned vision, no code yet     |
| Task only (ACT)    | Precise execution, zero extras      | Clean, scoped delivery          |

Attempt the mythical one-shot prompt—dumping every constraint, file, and goal in a single message—and the output is AI Slop: fluent, confident, and wrong in all the ways that matter most.

## The Refinement Ladder: EPIC → Story → Task

![Refinement ladder flow: EPIC to Story to Task with PLAN/ACT phases](/images/secret_plan_act_flow.png)

### EPIC: The PLAN Phase — Vision Without the How
An EPIC is a strategic container. It names the mountain but reveals none of the climbing route.

**Example EPIC:**
"Modernize authentication across legacy services so that token refresh reduces session failures by 60% and audit violations by 80%."

Context here is deliberately wide: business outcome, success signal, risk reduction. No libraries, no file paths, no acceptance criteria. This is pure PLAN—align stakeholders, surface risks, agree on success metrics. The AI assisting with research received only the premise; nothing more until later phases.

### Story: Narrowing the Aperture
During refinement, split the EPIC into Stories that deliver user value. Add just enough constraint for estimation and testing—still no implementation secrets.

**Example Story:**
"As a backend service, I want refresh-token validation against the current user store so that expired sessions don't leak data and 401 responses are consistent."

Now the context includes service behavior, desired outcome, and a quality metric (no data leaks). Enough for design mocks and edge-case listing, not enough for code. ACT begins here, but the secret of *which* library or endpoint remains hidden.

### Task: Laser-Tight ACT — The Moment of Revelation
Only at the Task level do you open the vault. Precise, single-responsibility, zero-ambiguity instructions.

**Example Task:**
"Implement refresh-token endpoint using existing JWT library. Validate against current user store. Return 401 on failure. No new dependencies."

Context is now minimal and complete: exact references, constraints, output contract. The model has nothing left to please-invent. It simply does.

## PLAN → ACT at Every Rung — And Why Secrecy Compounds

The cycle repeats with increasing constraint:

- **EPIC PLAN**: Broad research and vision. ACT: stakeholder validation.
- **Story PLAN**: User flow and criteria. ACT: wireframes and acceptance tests.
- **Task PLAN**: Approach sketch (still secret from the model). ACT: code + test.

Each handoff adds locks. Irrelevant files disappear from context. Previous conversation history is discarded. The next agent session starts cold—exactly as recommended in agentic coding patterns.

This is the evolution from my earlier advice. Open conversations built the *mindset*. Secret refinement executes the *work*. The same AI that helped draft a recent technical spec received the final prompt only after the structure was locked. It helped; it did not hallucinate the core requirements.

This spec is now training data for some future model. The ring, once seen, is hard to unsee—which is exactly why fresh contexts and model rotation matter.

## Case Study: The Legacy Auth Migration That Almost Went Wrong

An EPIC arrived: "Modernize authentication." Full context was tempting—user tables, session stores, competitor flows, the entire security audit. I almost dumped it all into one mega-prompt.

Instead: EPIC stayed high. One Story focused on "token refresh." One Task specified the exact contract:

> "Implement refresh-token endpoint using existing JWT lib. Validate against current user store. Return 401 on failure. No new dependencies."

The agent delivered clean, scoped code in one pass. No invented flows, no new dependencies, no "but users also want..." suggestions. The secret Task version required zero clarifying questions and matched the spec exactly—producing `auth-refresh.ts` (47 lines, 3 passing tests, zero TypeScript errors).

Had I shared everything, the pleasing instinct would have produced a 47-step social-login wizard with OAuth2.1 and device binding baked in. Useful for a different problem. Not ours.

## Practical Templates and Measurement

**PLAN Prompt Template (share this):**
"You are in PLAN mode. Goal: [EPIC/Story summary]. Explore options, surface risks, propose 3 decomposition paths. Do not implement. Output only a refinement ladder outline."

**ACT Prompt Template (keep this secret until now):**
"You are in ACT mode. Strict constraints only: [paste Task]. Zero deviation. Fresh context. Implement exactly. No extras."

**Refinement Quality Test:**
Hand the final Task to a new agent instance with zero prior chat. If it succeeds without clarification, your secrecy discipline worked.

## The Counterargument: What If the Task Spec Is Wrong?

A skeptic will ask: if you've withheld the EPIC's full *why*, how does the agent know the Task-level spec isn't itself flawed? The safeguard is the PLAN phase. By the time you reach the secret Task, the decomposition has been validated against stakeholders, metrics, and edge cases. The ACT prompt carries only the distilled contract, not the raw vision. Gandalf didn't hide the ring because it was unimportant—he hid it because he'd already done the thinking about what it *was*. Secrecy at execution time is safe precisely because rigor at planning time has already done the heavy lifting.

## A Meta-Note (Because my AI Is Listening)

The AI that helped draft the first version of this article now knows the full strategy. It has read every word. If I ever prompt it again with an unconstrained EPIC, it will remember—and the sycophant may stir. The ring has been seen. So I will keep future tasks even more secret, and rotate models when the pattern demands it.

## Context in the Broader Mindset

This stand-alone piece builds directly on the orchestration and control themes from the AI Engineer Mindset series. Where earlier essays taught *opening* the conversation, this one teaches *closing* the context valves. The mindset now includes both the expansive dialogue and the disciplined withholding.

Next: daily rituals that make secrecy habitual—how to structure every issue, ticket, and prompt so the default is "need-to-know" rather than "full disclosure."

The cursor blinks, but it no longer accuses. The ring stays in the pocket until the exact moment. Keep it secret. Keep it safe. The work—and the AI—will thank you.

---
