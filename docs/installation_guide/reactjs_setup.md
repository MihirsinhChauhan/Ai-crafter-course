# React.js Installation Guide

This guide covers installing React.js on Windows, Linux, and macOS. React requires Node.js and npm (Node Package Manager) as prerequisites. We'll use Vite for creating React projects, as it's modern and efficient.

## Prerequisites
- A stable internet connection.
- Administrative privileges for installation.

## Windows Installation

### Step 1: Install Node.js and npm
1. Visit the official [Node.js website](https://nodejs.org/) and download the LTS version for Windows.
2. Run the installer (.msi) and follow the prompts, accepting the license and using default settings.
3. Verify installation by opening Command Prompt or PowerShell and running:
   ```
   node -v
   npm -v
   ```
   This should display the installed version numbers.

### Step 2: Create a React Project
1. Open Command Prompt and navigate to your project folder, for example:
   ```
   cd Documents\Projects
   ```
2. Run the following commands:
   ```
   npm create vite@latest my-react-app -- --template react
   cd my-react-app
   npm install
   npm run dev
   ```
3. This will scaffold and start a new React app.

### Troubleshooting
- If `npm` is not recognized, try restarting your terminal or ensure Node.js is added to your system PATH.

## Linux Installation (Ubuntu/Debian-based)

### Step 1: Install Node.js and npm
1. Open Terminal and update package lists:
   ```
   sudo apt update
   ```
2. Install Node.js and npm:
   ```
   sudo apt install nodejs npm
   ```
3. Verify the installation:
   ```
   node -v
   npm -v
   ```

### Step 2: Create a React Project
1. Navigate to your project directory.
2. Run:
   ```
   npm create vite@latest my-react-app -- --template react
   cd my-react-app
   npm install
   npm run dev
   ```

### Troubleshooting
- For other distros like Fedora, use:
  ```
  sudo dnf install nodejs npm
  ```

## macOS Installation

### Step 1: Install Node.js and npm
1. Visit [Node.js official site](https://nodejs.org/) and download the macOS installer (.pkg).
2. Run the installer and follow prompts.
3. Verify installation in Terminal:
   ```
   node -v
   npm -v
   ```

### Step 2: Create a React Project
1. Open Terminal, navigate to your folder.
2. Run:
   ```
   npm create vite@latest my-react-app -- --template react
   cd my-react-app
   npm install
   npm run dev
   ```

### Troubleshooting
- Ensure `/usr/local/bin` is in your PATH, if needed:
  ```
  export PATH=/usr/local/bin:$PATH
  ```

For official documentation, visit the [React.js website](https://reactjs.org/) and [Vite.js documentation](https://vitejs.dev/).

