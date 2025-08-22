# SuperClaude Website
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This repository contains the source code for the SuperClaude Framework website. SuperClaude enhances Claude Code through behavioral instruction injection, intelligent agent coordination, and MCP server integration.

## Installation

To get a local copy up and running, please follow these simple steps.

### Prerequisites

You need to have Node.js and npm installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).

### Setup

1.  **Clone the repo**
    ```sh
    git clone https://github.com/SuperClaude-Org/SuperClaude_Website.git
    ```
2.  **Navigate to the project directory**
    ```sh
    cd SuperClaude_Website
    ```
3.  **Install NPM packages**
    ```sh
    npm install
    ```

## Usage

To run the app in development mode, use the following command:

```sh
npm start
```

This will open the app at [http://localhost:3000](http://localhost:3000) in your browser. The page will reload when you make changes.

## Project Structure

The project is a standard Create React App with a few additions. Here is an overview of the key directories:

-   `.github/workflows/`: Contains the GitHub Actions workflow for deploying the website to GitHub Pages.
-   `public/`: Contains the static files, `index.html`, and the extensive documentation for the SuperClaude Framework under `public/docs/`.
-   `scripts/`: Contains utility scripts, such as `generate-docs-map.js`.
-   `src/`: Contains the React application source code, including components, pages, and context.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.


The general workflow is:
1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## Code of Conduct

To ensure a welcoming and inclusive community, we expect all contributors to adhere to our [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). Please read it to understand what is expected of you.

## License

Distributed under the MIT License. See the `LICENSE` section.
