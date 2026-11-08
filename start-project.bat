@echo off
title UniSwap Full Stack Launcher
echo ========================================================
echo   Launching UniSwap (DEV 5 - Admin & Moderation)
echo ========================================================

set "PATH=C:\Users\dell\nodejs\PFiles64\nodejs;%PATH%"

echo [1/2] Starting Backend Server on port 5000...
start "UniSwap Backend" cmd /k "cd /d "%~dp0server" && node dist/server.js"

echo [2/2] Starting Frontend Vite Dev Server on port 3000...
start "UniSwap Frontend" cmd /k "cd /d "%~dp0client" && npm run dev"

timeout /t 2 >nul
echo Opening UniSwap Admin Portal in your browser...
start http://localhost:3000

echo.
echo All services launched!
echo - Frontend: http://localhost:3000
echo - Backend:  http://localhost:5000
pause
