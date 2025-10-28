# 🚀 Dev Agency Website

A modern, full-stack web development agency website with a powerful Node.js backend and beautiful React frontend.

![Dev Agency](https://img.shields.io/badge/Status-Production%20Ready-success)
![Node.js](https://img.shields.io/badge/Node.js-v16+-green)
![React](https://img.shields.io/badge/React-18.3-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-blue)

## ✨ Features

### Frontend
- 🎨 Modern, responsive design with Tailwind CSS
- 🌓 Dark/Light mode support
- 📱 Mobile-first approach
- ⚡ Fast performance with Vite
- 🎭 Beautiful UI components with shadcn/ui
- 🎬 Smooth animations and transitions
- 📧 Functional contact form with backend integration

### Backend
- 🔒 Secure REST API with Express.js
- 🗄️ PostgreSQL database with Sequelize ORM
- 📧 Email notifications with Nodemailer
- 🛡️ Security features (Helmet, CORS, Rate Limiting)
- ✅ Input validation with express-validator
- 📊 Health check endpoints
- 🔍 Comprehensive error handling
- 📝 Detailed logging

## 🚀 Quick Start

**Get started in 5 minutes!** See [QUICK_START.md](./QUICK_START.md)

```bash
# 1. Install backend dependencies
cd backend && npm install

# 2. Configure your database
cp .env.example .env
# Edit .env and add your DATABASE_URL

# 3. Setup database
npm run setup-db

# 4. Start backend
npm run dev

# 5. In a new terminal, start frontend
cd .. && npm install && npm run dev
```

Visit `http://localhost:8080` 🎉

## 📚 Documentation

- **[Quick Start Guide](./QUICK_START.md)** - Get running in 5 minutes
- **[Setup Guide](./SETUP_GUIDE.md)** - Detailed setup instructions
- **[Backend README](./backend/README.md)** - API documentation
- **[Database Schema](./backend/database/schema.sql)** - Database structure

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **3D Graphics**: Three.js with React Three Fiber
- **State Management**: React Hooks
- **Form Handling**: React Hook Form with Zod validation

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Email**: Nodemailer
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Express Validator
- **Authentication**: JWT (ready for implementation)

## 📁 Project Structure

```
Dev-Agency-Website/
├── backend/                    # Backend API
│   ├── config/
│   │   └── database.js        # Database configuration
│   ├── models/
│   │   ├── Contact.js         # Contact model
│   │   └── Project.js         # Project model
│   ├── routes/
│   │   ├── health.js          # Health check
│   │   ├── contact.js         # Contact routes
│   │   └── projects.js        # Project routes
│   ├── services/
│   │   └── emailService.js    # Email service
│   ├── database/
│   │   └── schema.sql         # Database schema
│   ├── scripts/
│   │   └── setup-database.js  # Database setup script
│   ├── .env.example           # Environment template
│   ├── package.json           # Backend dependencies
│   └── server.js              # Main server file
├── src/                       # Frontend source
│   ├── components/
│   │   ├── ContactForm.tsx    # Contact form
│   │   ├── Hero.tsx           # Hero section
│   │   ├── Projects.tsx       # Projects showcase
│   │   ├── Navbar.tsx         # Navigation
│   │   └── ...                # Other components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities
│   └── App.tsx                # Main app component
├── public/                    # Static assets
├── .env.example               # Frontend env template
├── QUICK_START.md             # Quick start guide
├── SETUP_GUIDE.md             # Detailed setup guide
└── README.md                  # This file
```

## 🔌 API Endpoints

### Health Check
- `GET /api/health` - Check API and database status

### Contact Form
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `GET /api/contact/:id` - Get single contact
- `PATCH /api/contact/:id/status` - Update status
- `DELETE /api/contact/:id` - Delete contact

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)

## 🔐 Environment Variables

### Backend (`backend/.env`)
```env
PORT=3001
NODE_ENV=development
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
FRONTEND_URL=http://localhost:8080
```

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:3001
```

## 🧪 Testing

```bash
# Test backend health
curl http://localhost:3001/api/health

# Test contact form submission
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello!"}'
```

## 🚀 Deployment

### Backend
- **Railway** (Recommended) - Automatic PostgreSQL
- **Heroku** - With Postgres add-on
- **DigitalOcean** - App Platform
- **Render** - Free PostgreSQL included

### Frontend
- **Vercel** (Recommended for Vite/React)
- **Netlify**
- **Cloudflare Pages**
- **Lovable** - [Deploy here](https://lovable.dev/projects/45cd03b8-2c7d-4a8e-bea5-dd805a71e5ec)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC

## 🆘 Support

- Check [QUICK_START.md](./QUICK_START.md) for common issues
- See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions
- Review [backend/README.md](./backend/README.md) for API docs

## 🎨 Original Project

This project was initially created with [Lovable](https://lovable.dev/projects/45cd03b8-2c7d-4a8e-bea5-dd805a71e5ec) and enhanced with a full-featured Node.js backend.

---

**Built with ❤️ by Dev Agency**
