# Go (Golang) Installation Guide

This guide covers installing Go on Windows, Linux, and macOS.

## Windows Installation

### Step 1: Download and Install
1. Visit the official Go downloads page at [https://go.dev/dl/](https://go.dev/dl/) and download the Windows installer (.msi).
2. Run the installer and follow the prompts. The default installation path is `C:\Go`.
3. Add Go to your system PATH environment variable:
   - Open "Environment Variables"
   - Edit the `PATH` variable and add `C:\Go\bin`
4. Restart your terminal.

### Step 2: Verify Installation
Open Command Prompt and run:
```
go version
```
This should output the Go version installed.

## Linux Installation (Ubuntu/Debian-based)

### Step 1: Download and Install
1. Open Terminal and update packages:
   ```
   sudo apt update
   ```
2. Download the Go tarball (replace version as appropriate):
   ```
   wget https://go.dev/dl/go1.22.5.linux-amd64.tar.gz -O go.tar.gz
   ```
3. Extract the archive to `/usr/local`:
   ```
   sudo tar -C /usr/local -xzf go.tar.gz
   ```
4. Add Go to your PATH by editing `~/.profile` or `~/.bashrc` and adding:
   ```
   export PATH=$PATH:/usr/local/go/bin
   ```
5. Reload the shell configuration:
   ```
   source ~/.profile
   ```

### Step 2: Verify Installation
Run:
```
go version
```

## macOS Installation

### Step 1: Download and Install
1. Download the macOS package (.pkg) from the official Go downloads page [https://go.dev/dl/](https://go.dev/dl/).
2. Run the installer and follow prompts.
3. Add Go to your PATH by editing `~/.zshrc` or `~/.bash_profile`:
   ```
   export PATH=$PATH:/usr/local/go/bin
   ```
4. Reload the shell:
   ```
   source ~/.zshrc
   ```

### Step 2: Verify Installation
Run:
```
go version
```

### Alternative (macOS)
You can also install Go using Homebrew:
```
brew install go
```

For more details, visit the official Go installation page at [https://golang.org/doc/install](https://golang.org/doc/install).



