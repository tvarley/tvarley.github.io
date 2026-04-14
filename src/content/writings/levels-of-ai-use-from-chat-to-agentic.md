---
title: "Levels of AI Use: From Chat to Agentic"
status: "draft"
subtitle: "A practical framework for understanding where you really are with AI — and what it takes to reach the next level"
summary: "Most engineers think they're power users. A real-world observation of two engineers on the same task reveals they're often playing completely different games. This piece maps the five levels of AI use, the hidden costs of each, and how to progress."
date: 2026-04-13
category: "article"
tags: ["ai", "mindset", "levels", "agentic", "orchestration", "productivity"]
draft: false
heroImage: '/images/AI_chat_to_agentic.png'
---

# Levels of AI Use: From Chat to Agentic

During a recent client engagement I watched two engineers tackle the same feature request. One took 3 days. The other shipped a superior version in 14 hours — complete with tests, documentation, and monitoring.

Same tools. Same access. Radically different outcomes.

The difference wasn't talent or experience. It was the *level* at which each was actually using AI. One was operating at what I now call Level 2. The other was working at Level 4. No one on the team, including their manager, could see the gap.

I was the one who took 3 days.

That observation crystallized something I'd learned through my own progression from casual user to fully agentic: we talk about AI adoption as if it's binary. You either use it or you don't. The reality is far more nuanced. There are discrete levels of relationship with these tools, each with its own capabilities, blind spots, and requirements.

Research supports this. While adoption rates have reached 90%+[^1], actual productivity gains at the organizational level remain around 5-10% in most studies[^2]. Yet some developers report gains of 27-39%, while others plateau at 8-13%[^3]. The gap isn't in access to the tools. It's in *how* they're being used.

This piece maps the five levels I've identified through my own journey and working with dozens of engineers. Most people are operating 1-2 levels below where they think they are.

## The Five Levels

I’ve lived through every one of these stages. Looking back from Level 5, I can see how each one felt like the summit at the time — only to realize later that I was still standing at base camp. The view from the top is worth the climb, but the path is harder than most people admit.

### Level 1: The Prompt Tourist

This is where everyone starts. You type something vague into ChatGPT or Claude and hope for the best. “Make me a React component for user authentication.” Copy. Paste. Maybe tweak the variable names. Ship it.

> “AI slop is the new spam.” — Ethan Mollick *(author of Co-Intelligence and professor at Wharton)*

I spent my first month here. It felt revolutionary — like I had a superpower. Code appeared instantly. Bugs vanished with a few sentences. I was “augmented.” I told everyone how transformative it was.

What I didn’t realize was that I had no idea why the AI produced what it did. When something broke in production or needed a meaningful modification, I was back to square one, staring at code I didn’t fully understand. I was a tourist taking photos of impressive landmarks without learning the language or culture of the place.

Research shows this is where most initial experimentation happens — quick wins that feel productive but rarely compound into lasting capability. You’re not building skills. You’re renting them by the prompt. The danger? This level feels so good you stop progressing. You tell yourself you’re “using AI” when you’re really just consuming outputs you don’t fully understand.

### Level 2: The Curious Collaborator

If you consider yourself an AI “power user,” this is the plateau most experienced engineers never leave.

> “The hottest new programming language is English.” — Andrej Karpathy *(former Director of AI at Tesla and OpenAI)*

The relationship becomes conversational. You iterate. You refine prompts. You explain context. “Actually, that won’t work because our auth system uses OAuth2, not JWT.” The AI adjusts. You counter-prompt. You treat it like a thoughtful colleague rather than a vending machine.

For a long time, this was my home. I was productive. I was getting good results. I spent hours crafting perfect prompts and felt proud of the clean code I “built.” I thought I had mastered AI-assisted development.

You’re still the sole architect, though. The AI executes *your* vision. When it suggests something outside your mental model, you often redirect it back — not because the AI is wrong, but because you’re not yet comfortable with genuine collaboration. I watched an engineer operating at Level 4 and realized I’d been playing a completely different game. Their pull request didn’t just work — it *felt* different. Cleaner. Almost alive.

### Level 3: The Creative Partner

At this stage, the dynamic becomes genuinely unpredictable.

> “The AI doesn’t give you answers. It gives you new ways to see the problem.” — François Chollet *(creator of the ARC benchmark and deep learning researcher)*

The AI stops being a tool and becomes something stranger — a collaborator that genuinely surprises you. It suggests architectural approaches you wouldn’t have considered. It challenges your assumptions in ways that feel both exciting and slightly threatening. The line between “my ideas” and “our ideas” starts to blur in ways that are hard to describe until you experience it.

You find yourself in flow states where you genuinely can’t remember who proposed what. The output doesn’t feel AI-generated anymore. It feels co-created. This level required something I didn’t expect: vulnerability. Being willing to have my ideas dismantled in real time. Being open to the possibility that the AI’s suggestion might actually be *better* than my carefully considered approach. Being okay with not being the smartest entity in the conversation.

The engineer who shipped in 14 hours was operating at least here, possibly higher. When I asked about their process, they said: “I don’t tell the AI what to build. I describe the problem we’re solving and we argue about approaches until we find something better than either of us would have alone.”

They were having creative disagreements with an AI. Most people are still issuing refined instructions and calling it collaboration.

### Level 4: The Master Orchestrator

Here lies the massive leverage — and the territory where I spent six months struggling to learn the ropes.

> “Programming is becoming unrecognizable. The era of typing code into editors is waning; instead, developers describe goals in natural language and oversee AI agents that handle the execution.” — Andrej Karpathy *(former Director of AI at Tesla and OpenAI)*

You no longer work with one AI instance. You direct multiple specialized agents. You build memory systems that maintain context across sessions, review loops that verify edge cases, autonomous workflows that operate in parallel. You design the *system that produces the work* rather than producing the work yourself.

Let me show you what the 14-hour solution actually looked like:

The engineer started by spending 30 minutes building scaffolding, not code. They created a persistent context system that held the entire technical specification, API contracts, error handling patterns, and business requirements in a structured format that persisted across agent sessions. Then they deployed specialized agents: one for implementation, one for test generation, one for documentation, one for edge case analysis. Each had a specific role and shared access to the living context.

They built a review loop so that as implementation progressed, the test agent would flag untested paths, the edge case agent would surface scenarios the implementation missed, and the documentation agent would note decisions worth explaining. A validation agent continuously cross-checked everything against the original requirements and flagged any drift.

The engineer didn’t write most of the code. They designed the system that wrote the code, monitored it for four hours as agents iterated through edge cases, then spent two hours reviewing and refining the results. The remaining eight hours? Sleep. The agents kept working.

The three-day approach the engineer took? One engineer, one AI, sequential conversations, manual verification, human-bottlenecked at every step. Good code. Slow process.

This is the difference between “using AI faster” and “using AI differently.” Studies on high-performing AI teams show orchestration capability is the strongest predictor of productivity gains — not raw prompting skill, not years of experience.[^5] The ability to design systems that amplify both human and artificial intelligence.

### Level 5: The Agentic Native

I currently operate at this final tier, which is both incredibly powerful and philosophically strange.

> “The shift from coding to orchestration is the biggest change in software engineering in decades.” — Andrej Karpathy *(former Director of AI at Tesla and OpenAI)*

At this level, you live in symbiosis with AI systems that have genuine agency within your digital environment. Your “team” includes both humans and persistent AI agents that maintain context across weeks, proactively surface opportunities, and execute complex multi-step initiatives autonomously.

Here’s what a typical morning actually looks like:

**6:47 AM**: I open my workstation. My overnight agent has flagged three items:
- Shipped a performance optimization to the caching layer (12% latency reduction, all tests green, deployed to staging)
- Identified a potential race condition in the new notification system (opened a draft PR with fix + tests, waiting for my review)
- Suggested refactoring the auth middleware based on usage patterns it observed (analysis doc attached, implementation estimated at 3 hours)

**7:15 AM**: I review the race condition fix. The agent caught something I’d missed — subtle, would’ve been a production bug in three months. I approve with one modification to the error message. Agent updates and merges.

**7:45 AM**: I review the performance optimization. The agent made a smart call, but I notice it missed a cache invalidation edge case. I don’t fix it myself — I prompt the agent with the scenario and let it generate the fix. Better than my first attempt. Approve and merge.

**8:30 AM**: I read the refactoring proposal. The agent’s right — usage patterns have shifted since we built this. But I disagree with its proposed approach. I counter with a different architectural direction. The agent generates three options exploring that direction. We converge on the best one. I approve the implementation plan, agent starts work.

By 9 AM I’ve shipped two features I didn’t write, caught a bug I didn’t find, and chartered a refactoring I’ll review tomorrow. Total coding time: 20 minutes. Total strategic judgment time: 90 minutes.

The philosophical question is real: what exactly is my contribution when agents execute 70% of implementation work?

Here’s what I’ve learned: My value is judgment, taste, strategic direction, and the uniquely human ability to ask “should we?” rather than just “can we?” The agents optimize for technical correctness. I optimize for the things that can’t be measured — maintainability, team understanding, future flexibility, business alignment.

I’m not coding less. I’m coding at a different level of abstraction — where every technical decision I make has 5-10x leverage because agents amplify each choice across the entire system.

Very few people are operating here yet. But those who are report productivity gains of 3-5x, not through working harder but through working at a fundamentally different level of abstraction.

## Reading Your Own Level

People systematically overestimate their level by 1-2 steps. I did this repeatedly on my way up.

Quick diagnostic:
- **Do you primarily work with one AI instance at a time?** You're Level 3 or below.
- **Have you built systems that persist context across sessions?** That's the Level 3 to Level 4 transition.
- **Do you have agents that work while you sleep?** Level 4+.
- **Do your agents proactively suggest improvements rather than waiting for prompts?** Level 5.

Be honest. The gap between where you think you are and where you actually are determines whether you'll make the next jump.

## The Progression Path

Moving between levels isn't about learning better prompts or upgrading models. Each transition requires letting go of a previous identity.

**Level 2 to 3** requires humility. Accepting that an AI can *genuinely* have better ideas—not just execute your ideas faster. That collaboration means being changed by your collaborator.

**Level 3 to 4** requires systems thinking. You stop writing code and start designing systems that write code. The shift from maker to architect. From hands-on to meta.

**Level 4 to 5** requires trust. Handing real agency—not just automation, but actual decision-making authority—to non-human teammates. Accepting that your contribution might be more curation than creation.

Each transition felt disorienting. Like learning to code all over again. The muscle memory that made me effective at one level actively hindered me at the next.

The engineer who shipped in 14 hours didn't have better tools. They'd made jumps others were still resisting.

## The Hidden Costs

Each level has its own failure modes:

**Level 1**: You ship hallucinations and accumulate technical debt at scale. Fast doesn't mean good.

**Level 2**: Subtle quality issues that compound. Code that works but doesn't sing. Good enough to ship, not good enough to maintain.

**Level 3**: Over-reliance on AI creativity without sufficient reality testing. You can co-create elegant garbage.

**Level 4**: Complexity debt. Your orchestration systems can become as brittle as the code they produce. I've watched intricate agent systems fail in cascading ways that took days to debug. Sometimes the simple solution is better.

**Level 5**: The identity question isn't academic. When agents ship features while you sleep, how do you explain your value in performance reviews? How do you negotiate compensation? How do you mentor when your workflow is "I reviewed what my agents built overnight"? These are real problems I navigate weekly.

The most effective approach: move fluidly between levels depending on the task. Not everything deserves orchestrated systems. Sometimes you just need to write the function yourself.

## Where This Goes

The gap between Level 2 and Level 4 is widening into a chasm. Most teams are optimizing for Level 2 proficiency when competitive advantage now lives at Level 4 and beyond. Most hiring loops test for Level 1 capability — can you use ChatGPT? — when they should be assessing for Level 3-4 potential.

Here's the insight I didn't expect: **The levels aren't about AI capability. They're about human identity evolution.**

Moving from Level 2 to Level 5 meant letting go of "I am a person who writes code" and becoming "I am a person who designs systems that write code." That identity shift is harder than any technical skill. It triggers a deep, often subconscious fear: *If I’m no longer the one writing the code, what exactly am I?* It’s why many experienced engineers subconsciously sabotage their own progression and plateau at Level 2 — not because they can’t learn orchestration, but because their sense of self is still wrapped up in being "the person who writes the best code."

The question isn't whether you use AI. Everyone uses AI now. The question is which identity you're willing to evolve into—and which you're willing to leave behind.

The progression from Level 1 to Level 5 took me months of deliberate practice — many long hours, frustration, anger, anxiety but perseverance. The transitions weren't smooth. Each felt like learning a new discipline. But the compounding returns are real—I build things now that would have been impossible for me two years ago, not because the tools got better but because I learned to use them at a fundamentally different level.

Those who understand this will build things others can't yet imagine. Those who don't will keep wondering why their productivity gains plateau at 10% while others appear to be playing an entirely different game.

Because they are.

### Your Next Step: From Level 2 to 3

If you want to start making the jump tomorrow morning, try this:
- **Start with the problem, not the plan**: Instead of outlining the architecture you want the AI to implement, describe the business problem and ask it to propose three technical approaches with tradeoffs.
- **Argue with the output**: When it gives you a suggestion, don't just accept it. Push back. Say, "That ignores X constraint, what else do you have?"
- **Let it win**: Once a week, implement the AI's suggested approach instead of yours, even if your ego hates it. Notice if the outcome is actually better.

*(In an upcoming article, I'll walk through exactly how to transition to Levels 4 and 5—by building, configuring, and uniquely naming your own persistent AI agent.)*

## References

[^1]: "93% of Developers Use AI. Why Is Productivity Only 10%?" Shift Magazine, 2025. https://shiftmag.dev/this-cto-says-93-of-developers-use-ai-but-productivity-is-still-10-8013/

[^2]: Philipp Dubach, "AI Coding Productivity Paradox: 93% Adoption, 10% Gains", 2025. https://philippdubach.com/posts/93-of-developers-use-ai-coding-tools.-productivity-hasnt-moved./ and Faros AI Productivity Report.

[^3]: Dylan Walsh, "How generative AI affects highly skilled workers", MIT Sloan Management Review, November 2024. https://mitsloan.mit.edu/ideas-made-to-matter/how-generative-ai-affects-highly-skilled-workers (junior developers: 27–39% gains; senior developers: 8–13%).

[^4]: Joel Becker et al., "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity", arXiv:2507.09089, July 2025. https://arxiv.org/abs/2507.09089 and Faros.ai "The AI Productivity Paradox" report, 2025.

[^5]: Inference drawn from productivity studies in [^2] and [^4], indicating orchestration patterns as a key differentiator in AI productivity gains.

*All citations are based on publicly available 2024–2025 research.*