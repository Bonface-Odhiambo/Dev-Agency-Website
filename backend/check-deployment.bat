@echo off
echo ========================================
echo Backend Deployment Checker
echo ========================================
echo.

echo [1/5] Checking required files...
if not exist "api\index.js" (
    echo ❌ ERROR: api\index.js not found!
    echo    This file is required for Vercel deployment.
    goto :error
)
echo ✅ api\index.js exists

if not exist "vercel.json" (
    echo ❌ ERROR: vercel.json not found!
    goto :error
)
echo ✅ vercel.json exists

if not exist "package.json" (
    echo ❌ ERROR: package.json not found!
    goto :error
)
echo ✅ package.json exists

echo.
echo [2/5] Checking package.json dependencies...
findstr /C:"express" package.json >nul
if errorlevel 1 (
    echo ❌ ERROR: express not found in dependencies!
    goto :error
)
echo ✅ All core dependencies present

echo.
echo [3/5] Checking vercel.json configuration...
findstr /C:"api/index.js" vercel.json >nul
if errorlevel 1 (
    echo ❌ ERROR: vercel.json doesn't point to api/index.js!
    goto :error
)
echo ✅ vercel.json configured correctly

echo.
echo [4/5] Checking .env.example...
if not exist ".env.example" (
    echo ⚠️  WARNING: .env.example not found
) else (
    findstr /C:"DATABASE_URL" .env.example >nul
    if errorlevel 1 (
        echo ⚠️  WARNING: DATABASE_URL not in .env.example
    ) else (
        echo ✅ .env.example has DATABASE_URL
    )
)

echo.
echo [5/5] Pre-deployment checklist...
echo.
echo ========================================
echo IMPORTANT: Before deploying to Vercel
echo ========================================
echo.
echo Make sure you have set these environment variables in Vercel:
echo.
echo ✓ NODE_ENV=production
echo ✓ DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
echo ✓ JWT_SECRET=your-secret-key-min-32-chars
echo ✓ EMAIL_HOST=smtp.gmail.com
echo ✓ EMAIL_PORT=587
echo ✓ EMAIL_USER=your-email@gmail.com
echo ✓ EMAIL_PASSWORD=your-app-password
echo ✓ EMAIL_FROM=Function Call ^<your-email@gmail.com^>
echo ✓ FRONTEND_URL=https://your-frontend.vercel.app
echo.
echo ========================================
echo.
echo ✅ All checks passed!
echo.
echo Ready to deploy? Run:
echo   vercel --prod
echo.
echo Or use the deployment script:
echo   deploy-backend.bat
echo.
pause
exit /b 0

:error
echo.
echo ========================================
echo ❌ Deployment check FAILED!
echo ========================================
echo.
echo Please fix the errors above before deploying.
echo.
pause
exit /b 1
