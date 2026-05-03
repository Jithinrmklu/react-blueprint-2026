---
name: git-push
description: Push the current branch to the remote, committing any pending changes first if needed.
---

# git-push skill

Push the current branch to the remote, committing any pending changes first if needed.

## Steps

1. Run `git status` to check for uncommitted changes.
2. If there are staged or unstaged changes:
   - Use `$ARGUMENTS` as the commit message if provided; otherwise ask the user for one.
   - Stage all changes with `git add -A`.
   - Commit using the message, co-authored by Claude:

     ```
     git commit -m "<message>

     Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
     ```

3. Run `git push`. If the branch has no upstream yet, run `git push -u origin HEAD`.
4. Report the pushed commit hash and remote URL.

## Notes

- Never skip pre-commit hooks (`--no-verify`).
- Never force-push (`--force`) unless the user explicitly asks.
- If the push is rejected due to a non-fast-forward, tell the user and stop — do not rebase or reset automatically.
