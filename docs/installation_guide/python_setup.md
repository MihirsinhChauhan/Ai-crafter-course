# Python Installation Guide (for AI Agents)

This guide covers installing Python on Windows, Linux, and macOS, focusing on AI development needs.

## Windows Installation

### Step 1: Download and Install
1. Go to the official Python downloads page: [https://www.python.org/downloads/](https://www.python.org/downloads/)
2. Download the latest Python 3 installer for Windows.
3. Run the installer.
4. **Important:** Check "Add Python to PATH" before clicking Install.
5. Complete the installation.

### Step 2: Verify Installation
Open Command Prompt and run:
```
python --version
pip --version
```

## Linux Installation (Ubuntu/Debian-based)

### Step 1: Install Python
Option 1 (Latest Python from source):

1. Update packages:
   ```
   sudo apt update
   sudo apt install build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev wget
   ```
2. Download Python source:
   ```
   wget https://www.python.org/ftp/python/3.13.5/Python-3.13.5.tgz
   tar -xf Python-3.13.5.tgz
   cd Python-3.13.5
   ```
3. Build and install:
   ```
   ./configure --enable-optimizations
   make -j $(nproc)
   sudo make altinstall
   ```
4. Verify:
   ```
   python3.13 --version
   ```

Option 2 (Simplified install, might not be latest):
```
sudo apt install python3 python3-pip
```

### Step 2: Verify pip installation:
```
pip3 --version
```

## macOS Installation

### Step 1: Download and Install
1. Download the latest Python installer (.pkg) from [https://www.python.org/downloads/](https://www.python.org/downloads/).
2. Run the installer and follow the prompts.

### Step 2: Verify Installation
Open Terminal and run:
```
python3 --version
pip3 --version
```

## Post-installation: Install AI Libraries

Use pip to install the required libraries:
```
pip install langchain crewai langgraph pydantic
```

For more references, check the official Python documentation at [https://docs.python.org/3/using/index.html](https://docs.python.org/3/using/index.html).

