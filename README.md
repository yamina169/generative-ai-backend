# Generative AI Backend – NestJS & Ollama

Backend for a **Generative AI mini-project** built with **NestJS** and **Ollama (local LLMs)**.
This project provides API for **text summarization** and **idea generation** using a local LLM.

---

## 🚀 Tech Stack

- **NestJS** – Backend framework
- **Ollama** – Local LLM runner
- **Swagger** – API documentation

---

## 📦 Features

- ✨ Summarize text using a local LLM
- 💡 Generate creative ideas from a topic

---

## 🧠 Model Used

This project uses the **`gemma3:1b`** model via **Ollama**.

### Why `gemma3:1b`?

- 🪶 **Lightweight & fast** → ideal for local development
- 🧠 **Good reasoning** for summarization and idea generation
- 💻 **Runs on CPU** (no GPU required)
- 🔐 **Fully local** → no external API calls or keys needed

---

## 🛠️ Prerequisites

Install the following:

- **Node.js** ≥ 18
- **npm**
- **Ollama**

### Install Ollama & Model

```bash
ollama pull gemma3:1b
ollama run gemma3:1b
```

Ensure Ollama runs at:

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

## ▶️ Run the Backend

```bash
npm run start:dev
```

Access:

```
http://localhost:3000
```

Swagger docs:

```
http://localhost:3000/api-docs
```

---

## API Endpoints

### 1️⃣ Summarize Text

**POST** `/generative/summarize`

**Request**

```json
{
  "text": "NestJS is a Node.js framework for building efficient and scalable server-side applications..."
}
```

**Response**

```json
{
  "result": "NestJS is a framework designed to build scalable and well-structured server-side applications."
}
```

---

### 2️⃣ Generate Ideas

**POST** `/generative/generate`

**Request**

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

- Focused on **text-based AI generation**
- Ollama runs **locally**, no external keys needed
- Built for learning, experimentation, and extension

---

## ⭐ Future Improvements

- Add more features
- Improve and optimize APIs
- Frontend (React / Next.js)
- Dockerisation & deployment tests

---

## 📚 References / Learning Sources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Run OpenAI Models Locally with Ollama & Node.js](http://sebastiangreen.co.uk/how-to-run-openai-models-locally-with-ollama-and-node-js/)
- [Integrate Ollama with Node.js & React](https://medium.com/@asim.dev.jaipuri/how-to-integrate-ollama-with-node-js-react-local-llm-chatbot-28561436bb03)
- [Running Local LLM Ollama from API](https://dev.to/hisukurifu/running-local-llm-ollama-from-api-in-node-2kk3)
- [Ollama Docs](https://docs.ollama.com/)
- [Udemy – NestJS Complete Guide](https://www.udemy.com/course/nestjs-the-complete-developers-guide/?start=75)
