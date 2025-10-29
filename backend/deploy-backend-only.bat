@echo off
echo ========================================
echo Deploy Backend as Separate Project
echo ========================================
echo.

echo Step 1: Remove any existing link...
if exist .vercel rmdir /s /q .vercel

echo Step 2: Deploy as NEW backend project...
vercel --prod --name dev-agency-backend

echo.
echo ========================================
echo Backend Deployment Complete!
echo ========================================
echo.
echo Your backend should now be separate!
echo.
pause
