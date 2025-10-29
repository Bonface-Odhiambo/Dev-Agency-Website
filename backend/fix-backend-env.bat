@echo off
echo ========================================
echo Fix Backend Environment Variables
echo ========================================
echo.

echo Adding NODE_ENV...
vercel env add NODE_ENV production

echo Adding FRONTEND_URL...
vercel env add FRONTEND_URL production

echo Adding EMAIL_HOST...
vercel env add EMAIL_HOST production

echo Adding EMAIL_PORT...
vercel env add EMAIL_PORT production

echo Adding EMAIL_USER...
vercel env add EMAIL_USER production

echo Adding EMAIL_PASSWORD...
vercel env add EMAIL_PASSWORD production

echo Adding EMAIL_FROM...
vercel env add EMAIL_FROM production

echo.
echo Redeploying backend...
vercel --prod

echo.
echo ========================================
echo Backend Fix Complete!
echo ========================================
pause
