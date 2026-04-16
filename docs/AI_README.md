# Universal AI Context Pack

This folder contains universal project-context files for AI assistants.

It is intentionally tool-agnostic. You can use these files with Codex, Claude, Cursor, Cline, Continue, Roo, Gemini, or any other coding agent.

## Recommended usage

Load these files in this order:

1. `AI_PROJECT_CONTEXT.md`
2. `AI_WORKFLOW.md`
3. `AI_RULES.md`
4. `AI_TASK_TEMPLATE.md`
5. `AI_HANDOFF_TEMPLATE.md`

## Purpose of each file

- `AI_PROJECT_CONTEXT.md`: stable project facts and architecture
- `AI_WORKFLOW.md`: how the team wants work to be done
- `AI_RULES.md`: guardrails, coding rules, and decision boundaries
- `AI_TASK_TEMPLATE.md`: reusable prompt/task template for giving work to an AI
- `AI_HANDOFF_TEMPLATE.md`: reusable status/handoff format between sessions or agents

## How to adapt

- Keep `AI_PROJECT_CONTEXT.md` factual and slow-changing.
- Keep `AI_RULES.md` strict and short.
- Keep `AI_WORKFLOW.md` practical and action-oriented.
- Use the templates for individual tasks instead of rewriting the same instructions every time.

## Suggested agent prompt

Use the following as a short bootstrap prompt for any AI:

```text
Read and follow:
- docs/AI_PROJECT_CONTEXT.md
- docs/AI_WORKFLOW.md
- docs/AI_RULES.md

Then complete the task using docs/AI_TASK_TEMPLATE.md as the execution format.
If work is interrupted, leave a handoff using docs/AI_HANDOFF_TEMPLATE.md.
```
