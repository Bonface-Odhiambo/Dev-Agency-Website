@echo off
echo ========================================
echo Deploy Backend to Vercel (Fixed)
echo ========================================
echo.

echo Step 1: Remove old Vercel link...
if exist .vercel rmdir /s /q .vercel

echo Step 2: Link to existing backend project...
echo.
echo When prompted:
echo 1. Choose "Link to existing project"
echo 2. Select "backend" project
echo.
pause

vercel link

echo.
echo Step 3: Deploy to production...
vercel --prod

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo Test your backend at the URL shown above
echo.
pause
