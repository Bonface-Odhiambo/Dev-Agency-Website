# Dev Agency Backend API

A robust Node.js/Express backend API for the Dev Agency website with PostgreSQL database integration.

## 🚀 Features

- **RESTful API** - Clean and organized API endpoints
- **Database Integration** - PostgreSQL with Sequelize ORM
- **Email Notifications** - Automated email system for contact forms
- **Security** - Helmet, CORS, rate limiting, input validation
- **Error Handling** - Comprehensive error handling and logging
- **Validation** - Express-validator for input validation
- **Scalable Architecture** - Modular structure for easy maintenance

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

## 🛠️ Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Add your database connection string and other credentials

   ```bash
   cp .env.example .env
   ```

4. **Configure your `.env` file:**
   ```env
   PORT=3001
   NODE_ENV=development
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_secure_random_string
   
   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   EMAIL_FROM=noreply@devagency.com
   CONTACT_EMAIL=contact@devagency.com
   
   FRONTEND_URL=http://localhost:8080
   ```

## 🗄️ Database Setup

The application will automatically create the necessary tables when you start the server for the first time. The database models include:

- **Contacts** - Store contact form submissions
- **Projects** - Manage portfolio projects

## 🚀 Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3001` (or your configured PORT).

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Check API and database status

### Contact Form
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (with pagination)
- `GET /api/contact/:id` - Get single contact
- `PATCH /api/contact/:id/status` - Update contact status
- `DELETE /api/contact/:id` - Delete contact

### Projects
- `GET /api/projects` - Get all projects (with filters)
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `PATCH /api/projects/:id/featured` - Toggle featured status

## 📧 Email Configuration

The backend uses Nodemailer for sending emails. For Gmail:

1. Enable 2-factor authentication on your Google account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the App Password in your `.env` file

## 🔒 Security Features

- **Helmet** - Sets various HTTP headers for security
- **CORS** - Configured for your frontend domain
- **Rate Limiting** - Prevents abuse (100 requests per 15 minutes)
- **Input Validation** - Express-validator for all inputs
- **SQL Injection Protection** - Sequelize ORM with parameterized queries

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # Database configuration
├── models/
│   ├── Contact.js           # Contact model
│   └── Project.js           # Project model
├── routes/
│   ├── health.js            # Health check routes
│   ├── contact.js           # Contact routes
│   └── projects.js          # Project routes
├── services/
│   └── emailService.js      # Email service
├── .env.example             # Environment variables template
├── package.json             # Dependencies
├── server.js                # Main server file
└── README.md                # This file
```

## 🧪 Testing the API

You can test the API using tools like:
- Postman
- Insomnia
- cURL
- Thunder Client (VS Code extension)

**Example: Submit contact form**
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello, I would like to discuss a project."
  }'
```

## 🔄 Database Migrations

The application uses Sequelize's `sync()` method which automatically creates/updates tables based on your models. In development, it uses `{ alter: true }` to update existing tables without losing data.

For production, consider using Sequelize migrations:
```bash
npx sequelize-cli migration:generate --name your-migration-name
```

## 🌐 Deployment

### Environment Variables for Production
Make sure to set:
- `NODE_ENV=production`
- Update `FRONTEND_URL` to your production domain
- Use secure `JWT_SECRET`
- Configure production database URL

### Recommended Platforms
- **Railway** - Easy deployment with PostgreSQL
- **Heroku** - Classic PaaS with add-ons
- **DigitalOcean App Platform** - Simple and scalable
- **AWS EC2** - Full control
- **Render** - Modern cloud platform

## 📝 Development Notes

- The server uses ES6 modules (`type: "module"` in package.json)
- All routes are prefixed with `/api`
- Timestamps (createdAt, updatedAt) are automatically managed
- UUIDs are used for primary keys instead of auto-incrementing integers

## 🐛 Troubleshooting

**Database connection issues:**
- Verify your DATABASE_URL is correct
- Check if PostgreSQL is running
- Ensure your database user has proper permissions

**Email not sending:**
- Verify email credentials in `.env`
- Check if less secure app access is enabled (for Gmail)
- Use App Passwords for Gmail with 2FA

**Port already in use:**
- Change the PORT in your `.env` file
- Kill the process using the port: `npx kill-port 3001`

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [Nodemailer Documentation](https://nodemailer.com/)

## 📄 License

ISC

---

**Need help?** Contact the development team or check the main project README.
