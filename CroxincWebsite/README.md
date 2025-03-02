# CroxincWebsite README.md

# CroxincWebsite

CroxincWebsite is a Nuxt.js project designed for building a modern web application. This project utilizes GitHub Actions for continuous integration and deployment (CI/CD) to streamline the development process and automate the deployment to GitHub Pages.

## Project Structure

- **.github/workflows/deploy.yml**: Contains the GitHub Actions workflow configuration for deploying the Nuxt project to GitHub Pages.
- **assets/**: Holds static assets such as images, fonts, and other files used in the application.
- **components/**: Contains reusable Vue components throughout the application.
- **layouts/**: Includes layout components that define the structure of the pages in the application.
- **middleware/**: Contains middleware functions to handle requests before they reach the page components.
- **pages/**: Holds Vue files corresponding to the routes of the application, with each file representing a different page.
- **plugins/**: For Vue plugins that extend the functionality of the application.
- **static/**: Contains static files served directly without processing, such as favicon.ico.
- **store/**: Includes Vuex store files for state management in the application.
- **nuxt.config.js**: The configuration file for the Nuxt application, including settings for modules, plugins, and other configurations.
- **package.json**: Configuration file for npm, listing dependencies, scripts, and metadata for the project.
- **yarn.lock**: Locks the versions of the dependencies installed in the project when using Yarn as the package manager.

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/CroxincWebsite.git
   ```

2. Navigate to the project directory:
   ```
   cd CroxincWebsite
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

## Deployment

This project is set up to automatically deploy to GitHub Pages when changes are pushed to the `main` branch. The deployment process is defined in the `.github/workflows/deploy.yml` file.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.