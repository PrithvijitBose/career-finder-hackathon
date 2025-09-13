# Career Finder 🚀

A comprehensive career guidance platform built for hackathon, combining modern web technologies with AI-powered recommendations.

## 🛠️ Tech Stack

- **Frontend**: Vite + React + TypeScript
- **Backend**: Express.js + FastAPI
- **AI/ML**: Python with ML libraries + Ollama (Llama 3.2:1b)
- **Package Manager**: npm

## 🚀 Quick Start for Contributors

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **npm** (comes with Node.js)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/PrithvijitBose/career-finder-hackathon
cd career-finder-hackathon
```

### 2. Install Dependencies

Install all project dependencies (this should handle both frontend and backend dependencies):

```bash
npm install
```

> **Note**: This command installs dependencies for the Vite+React frontend, Express backend, and Python requirements for FastAPI and ML libraries.

### 3. Install Ollama and AI Model

#### Install Ollama

**On macOS:**
```bash
brew install ollama
```

**On Linux:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

**On Windows:**
Download and install from [ollama.ai](https://ollama.ai/download)

#### Pull the Required Model

After installing Ollama, pull the Llama 3.2:1b model:

```bash
ollama pull llama3.2:1b
```

#### Start Ollama Service

Make sure Ollama is running:
```bash
ollama serve
```

### 4. Environment Setup

Create a `.env` file in the root directory and add necessary environment variables:

```bash
# Add your environment variables here
# Example:
# API_KEY=your_api_key
# DATABASE_URL=your_database_url
```

### 5. Start Development Server

Run the development server:

```bash
npm run dev
```

This should start:
- Frontend development server (typically on `http://localhost:5173`)
- Express backend server
- FastAPI server for ML services

## 📁 Project Structure

```text
├── .builder/
│   └── rules/
│       ├── deploy-app.mdc
│       └── organize-ui.mdc
├── .dockerignore
├── .env
├── .gitignore
├── .npmrc
├── .prettierrc
├── AGENTS.md
├── Readme.md
├── client/
│   ├── AI/
│   │   ├── .railwayignore
│   │   ├── Dockerfile
│   │   ├── Generation.py
│   │   ├── Procfile
│   │   ├── Retrival.py
│   │   ├── VectorDB.py
│   │   ├── __pycache__/
│   │   │   ├── backend.cpython-310.pyc
│   │   │   └── backend.cpython-313.pyc
│   │   ├── backend.py
│   │   ├── college.ts
│   │   ├── collegeapi.ts
│   │   ├── collegequery.tsx
│   │   ├── govt_colleges_index.faiss
│   │   ├── govt_engineering_colleges.json
│   │   ├── original_college_data.json
│   │   ├── processed_college_docs.json
│   │   ├── railway.toml
│   │   └── requirements.txt
│   ├── App.tsx
│   ├── Courses/
│   │   ├── ComputerScience.tsx
│   │   └── MechanicalEngineer.tsx
│   ├── components/
│   │   ├── effects/
│   │   │   ├── Magnetic.tsx
│   │   │   ├── MouseGradient.tsx
│   │   │   ├── Parallax.tsx
│   │   │   ├── ScrollReveal.tsx
│   │   │   └── TiltCard.tsx
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx
│   │   └── ui/
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── aspect-ratio.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── command.tsx
│   │       ├── context-menu.tsx
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── hover-card.tsx
│   │       ├── input-otp.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── resizable.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── sonner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       ├── toaster.tsx
│   │       ├── toggle-group.tsx
│   │       ├── toggle.tsx
│   │       ├── tooltip.tsx
│   │       └── use-toast.ts
│   ├── context/
│   │   ├── recommendation.tsx
│   │   └── user.tsx
│   ├── global.css
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   ├── use-theme.ts
│   │   └── use-toast.ts
│   ├── lib/
│   │   ├── utils.spec.ts
│   │   └── utils.ts
│   ├── pages/
│   │   ├── AI.tsx
│   │   ├── AptitudeTest.tsx
│   │   ├── CareerMapping.tsx
│   │   ├── CollegeDirectory.tsx
│   │   ├── CourseExplorer.tsx
│   │   ├── Index.tsx
│   │   ├── Login.tsx
│   │   ├── Logout.tsx
│   │   ├── NotFound.tsx
│   │   ├── Placeholder.tsx
│   │   ├── Profile.tsx
│   │   └── about.tsx
│   ├── types/
│   │   └── streams.ts
│   └── vite-env.d.ts
├── components.json
├── index.html
├── netlify.toml
├── netlify/
│   └── functions/
│       └── api.ts
├── package-lock.json
├── package.json
├── pip.conf
├── pnpm-lock.yaml
├── postcss.config.js
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── railway.toml
├── server/
│   ├── index.ts
│   ├── node-build.ts
│   └── routes/
│       └── demo.ts
├── shared/
│   └── api.ts
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
├── vite.config.server.ts
└── vite.config.ts
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Setting Up for Development

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Create a feature branch**: `git checkout -b feature/your-feature-name`
4. **Follow the setup steps** above
5. **Make your changes**
6. **Test thoroughly**
7. **Commit with descriptive messages**: `git commit -m "Add: new career recommendation algorithm"`
8. **Push to your fork**: `git push origin feature/your-feature-name`
9. **Create a Pull Request**

### Development Guidelines

- Follow existing code style and formatting
- Write clear, descriptive commit messages
- Add comments for complex logic
- Test your changes before submitting
- Update documentation if needed

### Running Tests

```bash
# Run frontend tests
npm test

# Run backend tests
npm run test:backend

# Run Python/ML tests
npm run test:python
```

## 🐛 Troubleshooting

### Common Issues

**1. Ollama model not found**
```bash
# Make sure Ollama is running and model is pulled
ollama list
ollama pull llama3.2:1b
```

**2. Python dependencies not installing**
```bash
# Try installing Python dependencies separately
pip install -r requirements.txt
```

**3. Port conflicts**
- Frontend usually runs on port 5173
- Backend ports are configurable in environment variables
- Check if ports are already in use

**4. Node modules issues**
```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

- **Issues**: Report bugs or request features via [GitHub Issues](https://github.com/PrithvijitBose/career-finder-hackathon/issues)
- **Discussions**: Join conversations in [GitHub Discussions](https://github.com/PrithvijitBose/career-finder-hackathon/discussions)
- **Email**: [Contact the maintainer](mailto:your-email@example.com)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Built during a hackathon with ❤️
- Powered by Ollama and Llama 3.2
- Thanks to all contributors!

---

**Happy Contributing! 🎉**

*If you find this project helpful, please give it a ⭐ on GitHub!*