@echo off

echo Limpando node_modules...
rmdir /s /q node_modules

echo Limpando package-lock...
del package-lock.json

echo Instalando dependencias...
npm install

if %errorlevel% neq 0 (
  echo Erro ao instalar dependencias
  pause
  exit /b
)

echo Rodando projeto...
npm run dev

pause