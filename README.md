# CLI App for Code Review from any local file.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/dibyansh01/CodeFile-review-CLI-APP/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/dibyansh01/DsimplyMart-dashboard)](https://github.com/dibyansh01/CodeFile-review-CLI-APP/issues)
[![GitHub stars](https://img.shields.io/github/stars/dibyansh01/DsimplyMart-store)](https://github.com/dibyansh01/CodeFile-review-CLI-APP/stargazers)


---

### Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration-Usage](#configuration-usage)
- [Additional Features](#additional-features)
- [Demo](#demo)

---

## Introduction

Welcome to the CLI App for Code Review! This Node.js application allows developers to quickly and easily get explanations and correction for code snippets using the OpenAI API.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (Node.js package manager)
- OpenAI API Key 

## Installation

Follow these steps to install the CLI App:

1. Clone the repository:

   ```bash
   git clone https://github.com/dibyansh01/CodeFile-review-CLI-APP.git
   
2. Navigate to the project directory:
   ```bash
   cd CodeFile-review-CLI-APP

3. Install dependencies:
   ```bash
   npm install

## Configuration-Usage

1. Before running the app, ensure you set up your OpenAI API key. Create a .env file in the project root and add your key:
    ```bash
   OPENAI_API_KEY=your-api-key-goes-here
2. Build process:
     ```bash
     tsc
2. Make the Script Executable:
    ```bash
    chmod +x index.js

3. Now install the package globally using:
    ```bash
    sudo npm install -g
    
3. Usage:
   After finishing all above prerequisites, you can use the command like this:
    ```bash
    code-review-cli explain path/to/your/code/file.js
    
Replace the above <file-path> with the path to the file you want to explain. The app will read the code from specified file, send it to the OpenAI API for analysis, and provide an English explanation in the terminal

## Additional Features

Apart from code explanation, this CLI App can be extended to assist developers in various ways. For example:
1. Code Correction: Users will get corrected code if any bugs are detected in the given code.
2. Interactive Learning: Use the OpenAI API to create an interactive learning environment where developers can ask questions about specific code segments.

## Demo
[Screencast from 12-30-2023 08:00:13 PM.webm](https://github.com/dibyansh01/CodeFile-review-CLI-APP/assets/129924389/bfffad10-8209-492e-a2ba-e274410e8e7c)

