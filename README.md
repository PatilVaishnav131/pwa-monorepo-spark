# Sahara β Ultra-MVP Mental Health PWA

Sahara is a **web-first Progressive Web App (PWA)** delivering AI first-aid mental health support, standardized screenings, peer interaction, counselor booking, and anonymized institutional insights.

## 🚀 Quick Start

```bash
# Clone and setup
git clone <your-repo>
cd sahara
docker-compose up -d

# Frontend will be available at: http://localhost:3000
# Backend API at: http://localhost:8000
# API Docs at: http://localhost:8000/docs
```

## 📁 Project Structure

```
SAHARA/                    # Root monorepo
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── api/         # REST endpoints
│   │   ├── core/        # Config & security
│   │   ├── db/          # Database models
│   │   ├── services/    # Business logic
│   │   └── tests/       # Unit tests
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/             # React TypeScript PWA
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Route pages
│   │   ├── services/    # API calls
│   │   └── stores/      # State management
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml    # Development environment
└── docs/                # Architecture & references
```

## ✨ Features

### Core Features (MVP)
- 🔐 Anonymous JWT authentication
- 📋 Mental health screenings (PHQ-9, GAD-7, GHQ)
- 🤖 AI-powered mental health chatbot
- 💬 Moderated peer support channels
- 📅 Counselor booking system
- 📊 Anonymized institutional insights

### Technical Features
- 📱 Progressive Web App (PWA)
- 🌐 Offline-first with IndexedDB
- 🌍 Internationalization (i18n) support
- 🔒 Secure WebSocket connections
- 📡 RESTful API with OpenAPI docs
- 🧪 Comprehensive test coverage

## 🛠 Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, PWA
- **Backend**: FastAPI, SQLAlchemy, WebSockets
- **Database**: SQLite (development), PostgreSQL (production)
- **Auth**: JWT with anonymous sessions
- **Real-time**: WebSocket connections
- **Deployment**: Docker & Docker Compose

## 📖 API Documentation

Once running, visit:
- Interactive API docs: http://localhost:8000/docs
- ReDoc format: http://localhost:8000/redoc

## 🌍 Internationalization

Currently supports:
- English (en)
- Spanish (es)

## 🧪 Testing

```bash
# Backend tests
cd backend && python -m pytest

# Frontend tests
cd frontend && npm test
```

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

Please read CONTRIBUTING.md for contribution guidelines.