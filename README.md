# React TS SAAS Starter

🚀 A React Application with TypeScript, Redux, Tailwind CSS & more..

## Project Overview

This project is a modern web application built with React, TypeScript, Redux, and Tailwind CSS. It follows best practices for project organization and includes several features for efficient development.

## Table of Contents

- [Project Architecture and Folder Structure](#project-architecture-and-folder-structure)
- [Main Files](#main-files)
- [Scripts](#scripts)
- [ESLint Configuration](#eslint-configuration)
- [Styling](#styling)
- [State Management](#state-management)
- [Routing](#routing)
- [Authentication](#authentication)
- [Testing](#testing)

## Project Architecture and Folder Structure

📂 The project is organized into several directories:

- **src**: Main source code directory.
- **assets**: Static files like images and SVGs.
- **components**: Reusable UI components.
- **pages**: Components representing entire pages.
- **store**: Redux store configuration and root reducer.
- **api**: API configuration and endpoints.
- **public**: Public assets and index.html.
- **tests**: Test files.

### Main Files

- **index.html**: Main HTML file with root div for React.
- **main.tsx**: Entry point for the React application.
- **App.tsx**: Root component setting up Redux and routing.
- **Routes.tsx**: Defines application routes.
- **store.ts**: Configures the Redux store.
- **vite.config.ts**: Vite configuration with aliasing.
- **tailwind.config.js**: Tailwind CSS configuration.
- **postcss.config.js**: PostCSS configuration for Tailwind CSS.
- **tsconfig.json**: TypeScript configuration.
- **package.json**: Project dependencies and scripts.

## Scripts

📜 The package.json file includes useful scripts:

- `dev`: Starts the development server.
- `preprod`: Starts the preprod server.
- `main`: Starts the production server.
- `build-dev`: Builds Project for Development Server.
- `build-preprod`: Builds Project for Preprod Server.
- `build-main`: Builds Project for Production Server.
- `test`: Runs Jest tests.

## ESLint Configuration

🧹 The project uses ESLint for linting with TypeScript-specific rules. You can expand the configuration as described in the README.md file.

## Styling

🎨 The project uses Tailwind CSS for styling. The index.css file includes base, components, and utilities styles. The tailwind.config.js file configures Tailwind, including PurgeCSS content files.

## State Management

🚀 Redux with Redux Toolkit simplifies state management. Each feature has its own slice with reducers and actions, combined in store.ts.

## Routing

🌐 React Router handles routing. Routes.tsx defines routes, and ProtectedRoute.tsx protects authenticated routes.

## Authentication

🔐 The features/authentication directory contains authentication logic and components. authSlice.ts defines the Redux slice, while Login.tsx includes the login form. authApi.ts defines authentication-related API endpoints.

## Testing

✅ Jest and Testing Library utilities for React are used for testing. Run tests using the `test` script in package.json

---
