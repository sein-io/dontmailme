```markdown
# dontmailme Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches you the core development patterns, coding conventions, and workflows used in the `dontmailme` TypeScript codebase. You'll learn how to structure files, write and organize code, follow commit message conventions, and understand the project's approach to testing. This guide is ideal for contributors aiming for consistency and maintainability in their work.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - Example: `emailSender.ts`, `userProfileManager.ts`

### Import Style
- Both default and named imports are used, sometimes mixed within the same file.
  - Example:
    ```typescript
    import fs from 'fs';
    import { sendEmail, validateAddress } from './emailUtils';
    ```

### Export Style
- Both default and named exports are present.
  - Example:
    ```typescript
    // Named export
    export function sendEmail(to: string, subject: string) { ... }

    // Default export
    export default class UserManager { ... }
    ```

### Commit Messages
- Follows the **conventional commits** standard.
- Prefixes: `feat` (feature)
- Example:
  ```
  feat: add email validation to signup process
  ```

## Workflows

### Feature Development
**Trigger:** When adding a new feature or module  
**Command:** `/feature-development`

1. Create a new file using camelCase naming (e.g., `newFeature.ts`).
2. Write your TypeScript code, using mixed import/export styles as needed.
3. Add or update tests in files matching `*.test.*`.
4. Commit your changes using a conventional commit message with the `feat` prefix.
   - Example: `feat: implement password reset functionality`
5. Open a pull request for review.

### Testing
**Trigger:** When verifying code correctness  
**Command:** `/run-tests`

1. Identify or create test files using the `*.test.*` pattern (e.g., `emailSender.test.ts`).
2. Write tests for new or updated code.
3. Run the test suite with the project's preferred test runner (framework unknown; check project scripts).
4. Ensure all tests pass before committing changes.

## Testing Patterns

- Test files use the `*.test.*` naming pattern (e.g., `userManager.test.ts`).
- The specific testing framework is not detected; check the project for further details.
- Place tests alongside the code or in a dedicated test directory, following the existing structure.

## Commands
| Command              | Purpose                                           |
|----------------------|---------------------------------------------------|
| /feature-development | Start a new feature/module with proper conventions|
| /run-tests           | Run the test suite on your changes                |
```
