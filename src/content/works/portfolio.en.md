## Overview

This portfolio site presents my profile, technical skills, and projects. I rebuilt it because my previous portfolio had become outdated, using the opportunity to revise both its content and technical foundation.

In addition to presenting my experience, the site serves as a practical sample of frontend development with React and TypeScript, multilingual content, and automated build and deployment workflows.

## Main Features

- Profile and social links
- Skill filtering by experience level and usage tags
- Skill details with experience length, descriptions, and related projects
- Project cards with dedicated Markdown detail pages
- A data model that derives skill-to-project relationships from project data
- Japanese and English language switching
- Light, dark, and system-linked color themes
- Responsive layouts for different screen sizes
- Display of the latest update time and source commit

## Technology

- React / TypeScript
- Vite
- Material UI / SCSS
- React Router
- i18next
- React Markdown
- GitHub Actions
- VPS / Cloudflare

## Technical Challenges

### Making Information Easy to Find

A portfolio contains different kinds of information, including a profile, skills, and projects. The main UI challenge was increasing the amount of useful information without making it difficult for visitors to find what they need quickly.

### Low-Cost Automated Deployment

To keep the site maintainable, deployment needed to run automatically from a code update without manually copying files. At the same time, I wanted to use an existing VPS and avoid depending on an additional paid hosting service.

## Solutions and Design Decisions

Skills can be filtered by experience level and usage tags. Each skill opens a detail view containing its description and related projects. Projects use a separate list and detail layout, supporting both quick comparison and deeper technical reading.

Project titles, summaries, URLs, and skill relationships are managed in one TypeScript data structure. Related examples shown for each skill are derived from this project data, avoiding duplicate relationship definitions. Longer content is stored in language-specific Markdown files so the application code remains manageable as the content grows.

Deployment starts when a Git tag matching `v*` is pushed. GitHub Actions installs locked dependencies, generates build metadata and the sitemap, creates the production build with TypeScript and Vite, archives the output, and publishes it as a GitHub Release.

GitHub updates are sent to the VPS through a webhook-based deployment flow and applied to the published site automatically. Cloudflare provides certificates and CDN delivery. Combining GitHub, an existing VPS, and Cloudflare keeps the additional operating cost low.

## Design Principles

- Remain readable in both light and dark themes
- Provide the same information in Japanese and English
- Let visitors browse the profile, skills, and projects by purpose
- Remain comfortable to use on both desktop and mobile

The design prioritizes information structure and navigation over decoration. Material UI provides consistent components so interactions remain familiar across themes and screen sizes.

## Publishing and Operation

Source code and release artifacts are managed on GitHub, while the production site is served from a VPS through Cloudflare for certificates and CDN delivery.

During each build, the latest commit timestamp and hash are generated as JSON. The deployed site displays this information so its published version can be identified.

## Future Improvements

Project metadata is currently managed in TypeScript and detailed content in Markdown. A future improvement is to reduce the amount of direct code editing required and make profile and project updates easier.
