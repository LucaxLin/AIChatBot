

# AI Chat Bot

English | [中文](./README.md)

A modern AI chat application built with Vue 3, TypeScript, and Vite.

## Features

- 🤖 **Multiple AI Chatbots** - Support for selecting different chatbot models
- 💬 **Real-time Streaming** - Stream responses from AI in real-time
- 🌙 **Dark/Light Mode** - Toggle between dark and light themes
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🔒 **Token Management** - Secure API token configuration via dialog

## Tech Stack

- **Frontend Framework**: Vue 3 (Composition API)
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Pinia
- **Router**: Vue Router
- **Styling**: CSS with custom properties

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── mdMessage.vue    # Markdown message display
│   ├── selectChatBot.vue # Chatbot selection
│   ├── setTokenDialog.vue # API token configuration
│   └── toggleDark.vue   # Dark mode toggle
├── composables/         # Vue composables
│   └── useStream.ts     # Stream handling utilities
├── router/              # Route configuration
├── store/               # Pinia stores
│   └── chatBotStore.ts # Chatbot state management
├── types/               # TypeScript type definitions
├── views/               # Page components
│   ├── chat.vue         # Chat interface
│   └── NotFound.vue     # 404 page
├── App.vue              # Root component
└── main.ts              # Application entry
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. **Configure API Token**: Click the token settings to enter your AI API key
2. **Select Chatbot**: Choose the desired AI model from the chatbot selector
3. **Start Chatting**: Send messages and receive AI responses in real-time

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

---

Based on Vue 3 + TypeScript + Vite template. Learn more about [script setup](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup).