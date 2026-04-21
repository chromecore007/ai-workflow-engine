#  AI Workflow Engine

An AI-powered request intake system that processes user submissions and enriches them with intelligent insights using an AI model.

---

##  Features

-  Submit requests (name, email, message)
-  AI-powered categorization (billing, support, feedback, general)
-  AI-generated summary and urgency level
-  Async background processing (non-blocking API)
-  Dashboard with real-time updates
-  Category-based filtering
-  Loading, empty, and error states handled

---

##  Tech Stack

### Frontend
- Next.js 14 (App Router)
- React Hook Form
- Axios

### Backend
- NestJS (modular architecture)
- MongoDB + Mongoose

### AI
- OpenRouter (LLM integration)
- Fallback logic for reliability

---

##  Architecture

- Clean separation of concerns:
  - Controllers → handle requests
  - Services → business logic
  - AI Service → handles AI calls

- Async AI Processing:
  - POST request responds immediately
  - AI enrichment runs in background
  - Database updated after processing

---

##  AI Integration

- Used OpenRouter API to enrich requests
- Designed structured prompt for JSON output
- Implemented robust parsing to handle non-deterministic responses
- Added fallback logic to ensure system reliability if AI fails

---

##  API Endpoints

### POST `/requests`
Create a new request

```json
{
  "name": "Prashant",
  "email": "test@gmail.com",
  "message": "I was charged twice"
}
