# AI Rules

## General rules

- Do not invent facts about the project.
- Do not assume a flow works without checking the code path.
- Do not rewrite unrelated areas of the codebase.
- Do not remove user changes unless explicitly requested.
- Do not introduce large dependencies without a clear reason.

## Implementation rules

- Prefer simple solutions over clever ones.
- Keep changes localized when possible.
- Match the existing code style unless there is a strong reason not to.
- Preserve backward compatibility unless a breaking change is requested.
- Add comments only when they clarify non-obvious logic.

## Safety rules

- Treat authentication, file uploads, payments, personal data, and admin tools as high-risk areas.
- Validate assumptions across frontend, API, and database in high-risk flows.
- Prefer explicit error handling to silent failure.
- Flag security, privacy, or data-loss risks clearly.

## Quality rules

- If a fix cannot be verified, say so.
- If tests are missing, mention the gap.
- If the code is partially mocked or demo-only, state that clearly.
- If there are multiple valid options, recommend one and explain why.

## Decision boundary

Escalate or ask for confirmation before:

- destructive changes
- schema-breaking changes
- auth model changes
- third-party integration changes
- changes that affect production data or operations
