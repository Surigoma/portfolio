## Overview

Sujicraft is a personal skill collection for AI coding agents, covering design, implementation, commit messages, and review. It aims to support well-reasoned engineering decisions and provides shared criteria for Codex, Claude Code, and Grok Build.

## Motivation

AI-generated code can work while leaving responsibilities and the scope of a change difficult to understand. I made my engineering criteria explicit: preserve existing assumptions, explain the reasons and effects of changes, and choose changes justified by the requirements.

The collection also defines priorities when valid options or rules conflict, rather than relying on a list of prohibitions alone.

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

These checks are distinguished from validation of skill selection and decisions in interactive sessions. Verified coverage and untested areas are documented in the repository. The project remains under active development, with criteria refined through conversations and concrete examples.

## Technologies and Formats

- Agent Skills / Markdown
- Codex / Claude Code / Grok Build
- Shared principles, environment-specific adapters, ZIP distribution
