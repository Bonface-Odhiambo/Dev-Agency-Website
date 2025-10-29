@echo off
echo ========================================
echo Function Call - Frontend Deployment
echo ========================================
echo.

echo Installing Vercel CLI...
call npm install -g vercel

echo.
echo Logging into Vercel...
call vercel login

echo.
echo Deploying to Vercel...
call vercel --prod

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo Your frontend is now live!
echo Check the URL provided above.
echo.
pause
