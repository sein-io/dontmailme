```markdown
# dontmailme Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill documents the development patterns and conventions found in the `dontmailme` JavaScript repository. It covers file naming, import/export styles, commit message conventions, and testing patterns. Use this as a guide for contributing code that matches the project's established practices.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - Example: `emailSender.js`, `userAuth.js`

### Import Style
- Use **relative imports** for modules within the project.
  - Example:
    ```javascript
    import { sendEmail } from './emailSender';
    ```

### Export Style
- Use **named exports** for functions, constants, or objects.
  - Example:
    ```javascript
    // In emailSender.js
    export function sendEmail(to, subject, body) {
      // ...
    }
    ```

### Commit Messages
- Follow the **Conventional Commits** format.
- Use the `chore` prefix for maintenance or non-feature changes.
  - Example:
    ```
    chore: update dependencies to latest versions
    ```

## Workflows

### Making a Code Change
**Trigger:** When you need to add, update, or fix code.
**Command:** `/make-change`

1. Create or update files using camelCase naming.
2. Use relative imports and named exports.
3. Write or update tests in files matching `*.test.*`.
4. Commit changes using the conventional commit format (e.g., `chore: ...`).
5. Push your branch and open a pull request.

### Writing Tests
**Trigger:** When adding new features or fixing bugs.
**Command:** `/write-test`

1. Create a test file named following the pattern `*.test.*` (e.g., `emailSender.test.js`).
2. Write tests for your functions or modules.
3. Run your test suite (framework is unknown; check project documentation or scripts).

## Testing Patterns

- Test files are named with the pattern `*.test.*` (e.g., `userAuth.test.js`).
- The specific testing framework is not detected; check for scripts or documentation to determine how to run tests.
- Place tests alongside the modules they test or in a dedicated test directory, following the naming pattern.

## Commands

| Command        | Purpose                                      |
|----------------|----------------------------------------------|
| /make-change   | Guide for making a code change               |
| /write-test    | Steps for writing and running tests          |
```
