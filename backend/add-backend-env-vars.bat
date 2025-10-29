@echo off
echo ========================================
echo Adding Environment Variables to Backend Project
echo ========================================
echo.
echo IMPORTANT: Make sure you're in the backend directory
echo and linked to the BACKEND project (not frontend)!
echo.
pause

echo.
echo Adding DATABASE_URL...
vercel env add DATABASE_URL production
echo postgresql://neondb_owner:npg_nRQxk9c2FlTX@ep-bitter-dawn-a4vhwtfa-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require

echo.
echo Adding NODE_ENV...
vercel env add NODE_ENV production
echo production

echo.
echo Adding JWT_SECRET...
vercel env add JWT_SECRET production
echo 9GrxS+9Cq29wAeybAKSqqnn7LATO2umiMtzJFgf4hNL/WHcYMlLrD+WwGquqBf+4plHg9vjaKlGNxx0GAJ/LHQ==

echo.
echo Adding EMAIL_HOST...
vercel env add EMAIL_HOST production
echo smtp.gmail.com

echo.
echo Adding EMAIL_PORT...
vercel env add EMAIL_PORT production
echo 587

echo.
echo Adding EMAIL_USER...
vercel env add EMAIL_USER production
echo principalresearcher138@gmail.com

echo.
echo Adding EMAIL_PASSWORD...
vercel env add EMAIL_PASSWORD production
echo xdwjppsffhscsblw

echo.
echo Adding EMAIL_FROM...
vercel env add EMAIL_FROM production
echo principalresearcher138@gmail.com

echo.
echo Adding FRONTEND_URL...
vercel env add FRONTEND_URL production
echo https://dev-agency-frontend-huyiw93h3-bonfaces-projects.vercel.app

echo.
echo ========================================
echo Redeploying backend with new variables...
echo ========================================
vercel --prod

echo.
echo ========================================
echo Done! Backend should now work!
echo ========================================
pause
