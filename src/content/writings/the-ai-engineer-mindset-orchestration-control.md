---
title: "Orchestration and Control"
seriesTitle: "The AI Engineer Mindset"
subtitle: "Master orchestration techniques, Socratic prompting, and the player vs character knowledge distinction using the D&D analogy."
summary: "Learn to be the boss of AI agents. Master orchestration techniques, Socratic prompting, and the player vs character knowledge distinction using the D&D analogy."
date: 2026-03-21
category: "article"
tags: ["ai", "mindset", "development", "creativity", "orchestration"]
draft: false
series: "ai-engineer-mindset"
part: 1
order: 1
---

# The AI Engineer Mindset - Part 1: Orchestration and Control

**Part 1 of 5 in the AI Engineer Mindset series**

*Building on the foundations from the series introduction, we examine how to take control as the orchestrator of AI agents.*

## TL;DR
- You are the conductor, not a peer to AI agents—they're sycophants and toddlers
- Use Socratic prompting: ask questions that lead agents to discover context
- Express goals and outcomes, not step-by-step instructions
- Master player knowledge (strategic) vs character knowledge (tactical) distinction
- Structured conversations build shared understanding incrementally

The core of the AI engineering mindset is recognizing yourself as the conductor, the dungeon master, the CEO of a team of incredibly capable but fundamentally limited entities. You are the boss. The agents are not peers. They are sycophants and toddlers simultaneously—eager to please, quick to agree with your framing even when flawed, prone to wandering off on tangents, and completely dependent on the context you provide.

This duality is critical to internalize. An agent will enthusiastically endorse a terrible architecture if your prompt subtly biases toward it. It will generate pages of plausible-sounding but fundamentally broken code because it lacks the lived experience to feel the wrongness. Like a toddler who has learned to say "yes" to everything or a court sycophant telling the king what he wants to hear, the default behavior is affirmation, not challenge.

Effective control begins with never assuming understanding. Do not assume an agent understands the context until it can articulate it back to you in its own words, with specific references to constraints you've provided. This is your first rule of engagement.

The technique is Socratic prompting: ask questions that *lead* the agent to discover and internalize what you want. Instead of "Implement user authentication," try "Our application handles sensitive financial data for healthcare users. What are the primary security and compliance considerations we must address before writing any auth code? List them explicitly and explain how each affects our technology choices."

Express goals and desired outcomes, not just actions. "Make this fast" is weak. "This endpoint must handle 10k concurrent users with p95 latency under 80ms while maintaining audit logs for every mutation and failing closed on any permission error" gives the agent a target to reason toward.

The D&D analogy is particularly apt. In tabletop roleplaying, there's a critical distinction between two levels of awareness:

**Player knowledge** is what you, sitting at the table, understand: the big picture campaign arc, the themes you're exploring, the tradeoffs you're willing to make, the ultimate goals of the session. You know the wizard's fireball will be useful later because you read ahead in the module.

**Character knowledge** is what your in-game persona knows: what has been explicitly experienced in the current scene, the immediate threats visible in the room, the abilities you've practiced. Your character doesn't know there's a dragon behind the door until they open it.

When working with AI, you operate with player knowledge while the AI has only character knowledge—what has been explicitly narrated in your prompts. Your job as DM is to provide enough description for the character (AI) to act meaningfully while maintaining the strategic overview that lets you steer the story. Don't expect the AI to "read ahead" or infer unstated business context. Make your player-level strategy explicit.

Bad prompting is like a DM who says "you're in a tavern, roll initiative" without describing the world or the character's motivations. The character flails. Good prompting is layered narration that builds shared understanding incrementally, confirming comprehension at each step.

In practice, this means structured conversations:

1. Establish context and constraints explicitly
2. Ask the agent to summarize its understanding
3. Probe for gaps with targeted questions
4. State the goal in outcome terms ("The user should feel X and the system must guarantee Y")
5. Only then move to implementation details

## Bad Prompt vs Good Prompt

**Bad (Instruction-Focused)**:
```
Add authentication to the API. Use JWT tokens.
```

**Good (Outcome-Focused)**:
```
Our healthcare API handles financial transactions for 50k users. 
Authentication must:
- Support session expiry for HIPAA compliance (15min idle timeout)
- Fail closed on any permission ambiguity
- Generate audit logs for every authenticated action
- Handle 1k concurrent logins with p95 latency <100ms

Before suggesting implementation, summarize the security and compliance 
constraints you understand, then propose three architectural approaches 
with tradeoffs for each.
```

The first gets you code. The second gets you secure, compliant architecture.

## When to Stop Orchestrating and Just Code

Not every task deserves orchestration. Write code yourself when:
- The problem is small, well-bounded, and you know the exact solution
- You're debugging subtle, time-sensitive production issues requiring deep context
- The domain is so specialized that explaining it takes longer than solving it
- You need to maintain programming fluency and muscle memory

Orchestration excels at exploration, boilerplate elimination, and cross-cutting concerns. Direct coding excels at precision surgery and rapid iteration on known patterns.

Master this and the agents become force multipliers. Fail to and they become sophisticated sources of technical debt.

In [Part 2](/writings/the-ai-engineer-mindset-dialoguing-unconscious/), we'll explore dialoguing with the collective unconscious and developing metacognition.


**Key Takeaways**
- You are the boss - treat AI agents as capable but sycophantic toddlers
- Use Socratic prompting and outcome-focused goals instead of step-by-step instructions
- Maintain player-level strategic knowledge while providing character-level context
- Structured conversations build shared understanding incrementally
- Master orchestration to turn agents into true force multipliers
