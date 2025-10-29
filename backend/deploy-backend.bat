@echo off
echo ========================================
echo Function Call - Backend API Deployment
echo ========================================
echo.

echo Installing Vercel CLI...
call npm install -g vercel

echo.
echo Logging into Vercel...
call vercel login

echo.
echo Deploying Backend to Vercel...
call vercel --prod

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo Your backend API is now live!
echo Check the URL provided above.
echo.
echo IMPORTANT: Update your frontend VITE_API_URL
echo environment variable with this backend URL.
echo.
pause
