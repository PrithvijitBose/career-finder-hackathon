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

```
career-finder-hackathon/
├── src/                    # React + TypeScript frontend
├── server/                 # Express.js backend
├── api/                    # FastAPI Python backend
├── models/                 # ML models and related files
├── public/                 # Static assets
├── package.json           # Node.js dependencies
├── requirements.txt       # Python dependencies
└── README.md             # You are here!
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