# setup.ps1

Write-Host "Generando clave JWT segura..." -ForegroundColor Green

$jwtSecret = node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

Write-Host "Clave generada: $jwtSecret" -ForegroundColor Cyan

$envContent = @"
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=farma_plus
DB_PORT=3306
PORT=4000
NODE_ENV=development
JWT_SECRET=$jwtSecret
"@

Set-Content -Path ".env" -Value $envContent

Write-Host "Archivo .env creado exitosamente" -ForegroundColor Green
Write-Host "Ubicación: $(Get-Location)\.env" -ForegroundColor Yellow