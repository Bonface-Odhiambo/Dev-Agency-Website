@echo off
echo ========================================
echo Setting Up All Backend Environment Variables
echo ========================================
echo.

echo Setting NODE_ENV...
echo production | vercel env add NODE_ENV production

echo.
echo Setting DATABASE_URL...
echo postgresql://neondb_owner:npg_nRQxk9c2FlTX@ep-bitter-dawn-a4vhwtfa-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require^&channel_binding=require | vercel env add DATABASE_URL production

echo.
echo Setting JWT_SECRET...
echo 9GrxS+9Cq29wAeybAKSqqnn7LATO2umiMtzJFgf4hNL/WHcYMlLrD+WwGquqBf+4plHg9vjaKlGNxx0GAJ/LHQ== | vercel env add JWT_SECRET production

echo.
echo Setting EMAIL_HOST...
echo smtp.gmail.com | vercel env add EMAIL_HOST production

echo.
echo Setting EMAIL_PORT...
echo 587 | vercel env add EMAIL_PORT production

echo.
echo Setting EMAIL_USER...
echo principalresearcher138@gmail.com | vercel env add EMAIL_USER production

echo.
echo Setting EMAIL_PASSWORD...
echo xdwjppsffhscsblw | vercel env add EMAIL_PASSWORD production

echo.
echo Setting EMAIL_FROM...
echo Function Call ^<principalresearcher138@gmail.com^> | vercel env add EMAIL_FROM production

echo.
echo Setting FRONTEND_URL...
echo https://dev-agency-frontend-huyiw93h3-bonfaces-projects.vercel.app | vercel env add FRONTEND_URL production

echo.
echo Setting RATE_LIMIT_WINDOW_MS...
echo 900000 | vercel env add RATE_LIMIT_WINDOW_MS production

echo.
echo Setting RATE_LIMIT_MAX_REQUESTS...
echo 100 | vercel env add RATE_LIMIT_MAX_REQUESTS production

echo.
echo ========================================
echo All Environment Variables Set!
echo ========================================
echo.
echo Now deploying backend...
vercel --prod

echo.
echo ========================================
echo Backend Deployment Complete!
echo ========================================
echo.
echo Your backend should now be working at:
echo https://your-backend-url.vercel.app
echo.
pause
