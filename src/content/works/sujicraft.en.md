## Overview

Sujicraft is a personal skill collection for AI coding agents, covering design, implementation, commit messages, and review. It aims to support well-reasoned engineering decisions and provides shared criteria for Codex, Claude Code, and Grok Build.

## Motivation

While using Ponytail with AI coding agents, I struggled with a tendency to place files at the same directory level and produce code that was difficult for a person to read. Control flow was hard to follow, responsibility boundaries were unclear, and the effects of a change were difficult to assess. This made the generated code burdensome to maintain.

I asked the AI to correct these issues each time, but the instructions often did not carry over to a new session. I kept repeating the same explanations. Sujicraft grew from the need to preserve and share my criteria for file organization, readability, responsibility boundaries, and change scope across sessions.

I adopted ideas such as decision priorities from Ponytail because I valued its approach. I then developed Sujicraft as a personal collection that I could refine to fit my own development work. The effort of proposing my changes to Ponytail through pull requests and explaining their intent was also a reason to maintain a separate collection.

## Intended Division of Work

I want to think about what comes next and have AI carry out the implementation. People ultimately use the results, so I want to retain the work of understanding users, considering usage scenarios, and deciding what to build. Sharing my recurring implementation criteria with AI is intended to reduce repeated explanations and the maintenance burden of generated code, leaving more room for that work.

I chose Codex, Claude Code, and Grok Build both to carry the same criteria across environments and to make the collection usable with widely used tools.

## Design Decisions

- **Separate shared principles from procedures:** `shared/` defines decision priorities, while `skills/` contains task-specific instructions.
- **Evaluate the scope of a change:** The “smallest justified change” considers existing behavior, dependencies, verification, rollback, and maintenance effort, rather than only line or file counts.
- **Distinguish facts, assumptions, and judgments:** Verified evidence and untested premises are kept separate so that guesses are not presented as established facts.
- **Limit environment-specific differences:** The skill sources and shared principles are reused, with installation and distribution settings separated into adapters.

## Included Skills

The collection contains seven skills: design and change planning, implementation, commit messages, code and design review, UI design review, document review, and maintenance of the skills and distribution settings.

UI and document tasks have their own review criteria. Code-specific principles for responsibility boundaries and testing are not applied mechanically to every type of work.

## Distribution and Validation

The project implements Codex distribution settings and ZIP generation, with installation instructions for Claude Code and Grok Build. Validation checks references and bundled files, and records successful CLI plugin validation for Claude Code and Grok Build.

These checks are distinguished from validation of skill selection and decisions in interactive sessions. Verified coverage and untested areas are documented in the repository. I am still trying the collection in practice. Early impressions are positive, but its effectiveness remains to be evaluated. The criteria continue to evolve through conversations and concrete examples.

## Technologies and Formats

- Agent Skills / Markdown
- Codex / Claude Code / Grok Build
- Shared principles, environment-specific adapters, ZIP distribution
