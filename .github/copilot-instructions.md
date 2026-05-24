# Workspace instructions

This is a minimal static website project. There are no build tools, package managers, or server configurations in this workspace. The site is intended to be edited and previewed directly in the browser.

## Project structure

- `js/index.html` - main HTML page for the site
- `CSS/` - stylesheet directory
- `img/` - image assets directory

> Note: The main HTML file is currently located inside `js/`.

## How to work in this workspace

- Edit `js/index.html` to update page content and structure.
- Add or update styles in `CSS/` and link them from the HTML file.
- Use `img/` for image assets and reference them with relative paths from `js/index.html`.
- Keep the solution lightweight and static: avoid introducing build tooling, package managers, or complex frameworks unless explicitly requested.
- If JavaScript is needed, create a separate script file in `js/` and include it from `js/index.html`.

## Conventions

- Prefer semantic HTML elements (`header`, `main`, `footer`, `nav`, etc.).
- Keep markup and styling simple and easy to preview locally.
- Avoid inline styles when CSS files can be used instead.

## Example prompts

- "Add a navigation menu with three links to `js/index.html`."
- "Create a hero section in the main page with a heading, paragraph, and button."
- "Add responsive layout styles in `CSS/` for mobile and desktop views."
- "Place a footer message and make it visually distinct from the page content."

