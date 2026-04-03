<div align="center">
  <pre>
 █████╗ ██████╗ ██╗██████╗  ██████╗██╗  ██╗ █████╗ ████████╗
██╔══██╗██╔══██╗██║╚════██╗██╔════╝██║  ██║██╔══██╗╚══██╔══╝
███████║██████╔╝██║ █████╔╝██║     ███████║███████║   ██║   
██╔══██║██╔═══╝ ██║██╔═══╝ ██║     ██╔══██║██╔══██║   ██║   
██║  ██║██║     ██║███████╗╚██████╗██║  ██║██║  ██║   ██║   
╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   
  </pre>
  <h3>A Zero-Knowledge, Serverless GUI for Universal LLM Access</h3>
  
  [![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
  [![Zero Backend](https://img.shields.io/badge/backend-zero--knowledge-success)](https://github.com/PacifAIst/API2CHAT)
  [![HTML/JS](https://img.shields.io/badge/tech-HTML5%20%7C%20Vanilla%20JS-f06529)](https://github.com/PacifAIst/API2CHAT)
</div>

<br>

**API2CHAT** is a lightweight, purely client-side Graphical User Interface designed to interact with any OpenAI-compatible LLM endpoint. It bypasses the need for bloated backends, databases, or subscriptions, allowing you to plug in your own API keys securely. 

## 💡 [SEE LIVE DEMO](https://pacifaist.github.io/API2CHAT/)

## 🚀 Key Features

* **🛡️ 100% Zero-Knowledge Security:** No data, API keys, or chat logs are ever transmitted to or stored on a centralized server. The app runs entirely in your browser's volatile memory. Refreshing or flushing the session destroys the keys locally.
* **🔌 Maximum Compatibility:** Natively supports OpenAI, Google (Gemini via OpenAI Shim), DeepSeek, and OpenRouter. Features a "Custom" mode to connect to any local (e.g., LM Studio, Ollama) or remote provider using the OpenAI standard.
* **📎 Local File Context:**  Files are read locally by your browser and injected into the LLM prompt without requiring an upload server. Even when you can attach a file to it (e.g., a PDF) it is not stored anywhere.
* **💻 Host Anywhere:** Because there is no PHP, Python, or Node.js required, you can host API2CHAT on GitHub Pages, S3 buckets, cheap shared hosting (e.g., Namecheap), or simply double-click `index.html` on your desktop (Windows, Linux, iOS, Android, rpi-related...).
* **🎨 Hacker Aesthetic:** A sleek, minimal, dark-mode UI with full Markdown rendering and code syntax highlighting.

## 📸 Interface & Features

API2CHAT features a sleek, terminal-inspired interface designed for speed and low-friction interactions.

<div align="center">
  <img src="/images/1.png" width="50%" alt="Main Chat Interface">
</div>
<div align="center">
  <img src="/images/2.png" width="50%" alt="Settings Modal">
</div>
<div align="center">
  <img src="/images/3.png" width="50%" alt="File Reading Context">
</div>

### 📎 Local File Reading (Zero-Upload)
API2CHAT can natively read local files and inject them directly into your LLM prompt. **Files are never uploaded to a server**. Your browser reads the text locally and sends it straight to the API provider. 

## 🛠️ Quick Start (Local Use)

1. Clone or download this repository or [its release](https://github.com/PacifAIst/API2CHAT/releases/download/API2CHAT/API2CHAT_v1.0.0.zip).
2. Unzip the contents.
3. Double-click `index.html` to open it in any modern browser.
4. Select your provider, paste your API key, and start chatting.

## 🌐 Deploying to GitHub Pages

Want to host your own secure, live instance for free?
1. Fork or upload this repository to GitHub.
2. Go to your repository **Settings** > **Pages**.
3. Under **Branch**, select `main` and click **Save**.
4. Your live link will be generated in minutes.

## 🤖 Provider Examples by Default (RECOMMENDED: click 'Custom' to use yours)

| Provider | Base URL | Default Model |
| :--- | :--- | :--- |
| **OpenAI** | `https://api.openai.com/v1` | `gpt-4o-mini` |
| **DeepSeek** | `https://api.deepseek.com` | `deepseek-chat` |
| **OpenRouter** | `https://openrouter.ai/api/v1` | `qwen/qwen3.5-flash-02-23` |
| **Custom** | *User Defined* | *User Defined* |

## 👨‍💻 Author & License

Created by **Dr. Manuel Herrador** ([mherrador@ujaen.es](mailto:mherrador@ujaen.es)) - University of Jaen (Spain)

Released under the **[Apache 2.0 License](https://github.com/PacifAIst/API2CHAT/blob/main/LICENSE)**. You are free to modify, distribute, and use this software privately or commercially. The author takes no liability for any damages or data lost.
