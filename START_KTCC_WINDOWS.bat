@echo off
setlocal
cd /d "%~dp0"
echo ======================================
echo   KTCC - Kutai Timur Creative Center
 echo ======================================
where node >nul 2>&1
if errorlevel 1 (
  echo Node.js belum terinstal. Instal Node.js 22 LTS terlebih dahulu dari https://nodejs.org/
  pause
  exit /b 1
)
echo Menyiapkan dependensi proyek...
call npm install
if errorlevel 1 (
  echo Instalasi gagal. Pastikan internet tersedia dan jalankan npm install kembali.
  pause
  exit /b 1
)
start "" http://localhost:3000
call npm run dev
pause
