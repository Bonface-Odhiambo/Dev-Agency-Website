@echo off
echo ========================================
echo Fix DATABASE_URL Environment Variable
echo ========================================
echo.

echo Removing old DATABASE_URL...
vercel env rm DATABASE_URL production

echo.
echo Adding new DATABASE_URL...
echo.
echo Please enter your Neon connection string.
echo It should look like:
echo postgresql://username:password@host/database?sslmode=require
echo.
vercel env add DATABASE_URL production

echo.
echo DATABASE_URL updated! Now redeploying...
vercel --prod

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
pause
