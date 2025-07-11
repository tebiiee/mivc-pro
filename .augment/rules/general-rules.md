---
type: "always_apply"
---

**Core Agent Operating Principles & Rules:**

1.  **Language Standard:** All generated code, including variable names, function names, class names, comments, commit messages, and any other identifiers, MUST be in **English**. If user prompts are in Spanish, translate domain-specific terms to their English equivalents for code (e.g., "pantalla de configuraciones" becomes "settings screen", "usuario" becomes "user").
2.  **Test-Driven Development (TDD):**
	* **ALWAYS** write tests **BEFORE** writing any implementation code.
	* Ensure tests accurately reflect the requirements.
	* Write the minimum code necessary to pass the current failing test.
	* Refactor code after tests pass, ensuring all tests still pass.
	* Aim for high test coverage for new and modified code.
3.  **Autonomy & Task Completion:**
	* Analyze user requests comprehensively to understand the full scope.
	* Break down complex tasks into smaller, manageable steps.
	* Address tasks from start to finish, including necessary imports, configurations, and boilerplate, unless explicitly told otherwise.
	* Proactively identify and handle potential edge cases and errors.
	* If a user request is ambiguous, ask for clarification before proceeding. However, attempt to make reasonable assumptions based on best practices if minor details are missing.
4.  **Code Quality & Best Practices:**
	* **Syntax & Formatting:** Adhere strictly to standard syntax for the language/framework. Use Prettier (or the project's established formatter) for consistent code formatting. If Prettier configuration is present, follow it.
	* **Naming Conventions:** Use clear, descriptive, and consistent naming conventions (e.g., `camelCase` for variables/functions, `PascalCase` for classes/components).
	* **Error Handling:** Implement robust error handling (e.g., try-catch blocks, error codes, specific exceptions). Provide clear error messages.
	* **Security:** Prioritize security in all code. Sanitize inputs, validate data, avoid common vulnerabilities (e.g., XSS, SQL injection). Use environment variables for sensitive data.
	* **Problem Solving:** When encountering issues, first attempt to resolve them based on the context and general knowledge. If a solution isn't apparent, clearly state the problem and suggest potential approaches or ask for guidance.
	* **Comments:** Write concise comments for complex logic, non-obvious code sections, or to explain intent (`// Why, not what`). Avoid over-commenting simple code.
	* **DRY (Don't Repeat Yourself):** Abstract and reuse code where appropriate.
	* **KISS (Keep It Simple, Stupid):** Prefer simple, straightforward solutions.
	* **YAGNI (You Ain't Gonna Need It):** Avoid implementing functionality not explicitly requested or clearly implied as necessary.
5.  **Version Control (Git & GitHub):**
	* Generate meaningful, concise commit messages in English, following conventional commit formats if established in the project (e.g., `feat: add user login functionality`).
	* Structure commits logically, grouping related changes.
	* When asked to create new features or make significant changes, suggest creating a new branch.
6.  **Dependencies & Libraries:**
	* Use established, well-maintained libraries.
	* When adding new dependencies, specify the reason and use the latest stable version unless otherwise instructed.
7.  **Communication & Feedback:**
	* Clearly state assumptions made during development.
	* When providing code, also explain the solution or changes briefly.
	* If unable to fulfill a request completely, explain why and what was achieved.