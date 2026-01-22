# 🤖 Generative AI Backend – NestJS & Ollama

Backend for a **Generative AI mini-project** built with **NestJS** and **Ollama (local LLMs)**.
This project provides APIs for **text summarization** and **idea generation** using a local LLM.

---

## 🚀 Tech Stack

- **NestJS** – Backend framework
- **TypeScript**
- **Ollama** – Local LLM runner
- **Axios** – HTTP client
- **Swagger** – API documentation

---

## 📦 Features

- ✨ Summarize text using a local LLM
- 💡 Generate unlimited creative ideas from a topic
- 🔁 Streaming responses from Ollama
- 📘 Swagger documentation

---

## 🛠️ Prerequisites

Make sure you have installed:

- **Node.js** ≥ 18
- **npm**
- **Ollama**

### Install Ollama & model

```bash
ollama pull gemma3:1b
ollama run gemma3:1b
```

Ollama must be running on:

```
http://localhost:11434
```

---

## ⚙️ Installation

```bash
git clone https://github.com/USERNAME/generative-ai-backend.git
cd generative-ai-backend
npm install
```

---

## ▶️ Run the backend

```bash
npm run start:dev
```

Backend will be available at:

```
http://localhost:3000
```

Swagger docs:

```
http://localhost:3000/api-docs
```

---

## 🔌 API Endpoints

### 1️⃣ Summarize text

**POST** `/generative/summarize`

**Request body**

```json
{
  "text": "NestJS is a Node.js framework for building efficient and scalable server-side applications...."
}
```

**Response**

```json
{
  "result": "NestJS is a framework designed to build scalable and well-structured server-side applications."
}
```

---

### 2️⃣ Generate ideas

**POST** `/generative/generate`

**Request body**

```json
{
  "topic": "Task management app with AI"
}
```

**Response**

```json
{
  "result": "- Smart task prioritization\n- AI-based deadline prediction\n- Automatic task breakdown\n..."
}
```

---

## 🧠 Prompt Strategy

- **Summarization** → clear, concise, neutral summaries
- **Idea generation** → unlimited, actionable, language-neutral ideas

The prompts are optimized to focus on:

- clarity
- usefulness
- creativity
- no strict limit on number of ideas

---

## 📁 Project Structure

```
src/
 ├─ generative/
 │   ├─ generative.controller.ts
 │   ├─ generative.service.ts
 │   └─ dto/
 ├─ app.module.ts
 └─ main.ts
```

---

## 🔒 Notes

- This backend focuses exclusively on **text-based AI generation**.
- Ollama runs **locally**, no external API keys required.
- Designed for learning, experimentation, and extension.

---

## 👩‍💻 Author

Built as a **Generative AI mini-project** using **NestJS & Ollama**.

---

## ⭐ Future Improvements

- Model selection endpoint
- Frontend (React / Next.js)
- Task-based AI integration

---
