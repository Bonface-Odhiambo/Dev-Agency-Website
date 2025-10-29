@echo off
echo ========================================
echo Clean Frontend Deployment
echo ========================================
echo.

echo Step 1: Remove any existing Vercel project link...
if exist .vercel rmdir /s /q .vercel

echo Step 2: Deploy as NEW frontend project...
vercel --prod --name dev-agency-frontend

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo Your clean frontend should now be deployed!
echo.
pause
