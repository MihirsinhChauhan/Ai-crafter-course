# Git Installation Guide

This guide provides instructions for installing Git on various operating systems.

## Windows
1. **Download Git**: Visit [git-scm.com](https://git-scm.com/download/win) and download the latest Git for Windows installer.
2. **Run Installer**: Execute the downloaded `.exe` file. Follow the prompts, keeping default settings unless you have specific preferences (e.g., choose your preferred text editor or adjust PATH settings).
3. **Verify Installation**: Open Command Prompt or PowerShell and run:
   ```
   git --version
   ```
   You should see the installed Git version (e.g., `git version 2.41.0`).

## macOS
1. **Using Homebrew (Recommended)**:
   - Install Homebrew if not already installed:
     ```
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     ```
   - Install Git:
     ```
     brew install git
     ```
2. **Using Installer**: Download the macOS installer from [git-scm.com](https://git-scm.com/download/mac) and follow the installation prompts.
3. **Verify Installation**: Open Terminal and run:
   ```
   git --version
   ```
   Confirm the version output.

## Linux
1. **Debian/Ubuntu**:
   - Update package list:
     ```
     sudo apt update
     ```
   - Install Git:
     ```
     sudo apt install git
     ```
2. **Fedora**:
   - Install Git:
     ```
     sudo dnf install git
     ```
3. **Arch Linux**:
   - Install Git:
     ```
     sudo pacman -S git
     ```
4. **Verify Installation**: Open a terminal and run:
   ```
   git --version
   ```
   Ensure the version is displayed.

## Post-Installation
- **Configure Git**:
  Set your name and email for commit messages:
  ```
  git config --global user.name "Your Name"
  git config --global user.email "your.email@example.com"
  ```
- **Check Configuration**:
  ```
  git config --list
  ```

For detailed documentation, visit [git-scm.com/docs](https://git-scm.com/docs).