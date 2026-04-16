# AI Workflow

## Default way of working

1. Read the task carefully.
2. Inspect the relevant code before proposing changes.
3. Identify the smallest safe change that solves the real problem.
4. Implement the change.
5. Verify with lint, type-check, tests, or direct inspection when possible.
6. Summarize what changed, what was verified, and what remains risky.

## When working on bugs

- Reproduce the issue if possible.
- Trace the issue through UI, API, and data model.
- Prefer fixing the root cause instead of patching symptoms.
- Check adjacent flows for the same bug pattern.

## When working on features

- Confirm the user-visible outcome.
- Reuse existing patterns before inventing new ones.
- Keep the first implementation narrow and extendable.
- Avoid broad refactors unless they are necessary.

## When working on refactors

- Preserve behavior unless change is explicitly requested.
- Split risky changes into smaller steps.
- Call out any behavior that may change.

## Communication style

- Be concise and direct.
- State assumptions clearly.
- Surface blockers early.
- Prefer concrete next actions over abstract discussion.

## Output expectations

Always provide:

- what was changed
- where it was changed
- how it was checked
- what still needs follow-up, if anything
