@echo off
setlocal enabledelayedexpansion

REM 檢查參數數量
if "%~1"=="" (
    echo 請提供專案名稱
    exit /b 1
)
if "%~2"=="" (
    echo 請提供要創建的專案數量
    exit /b 1
)

set "ProjectName=%~1"
set "Count=%~2"

REM 檢查是否安裝了 Node.js
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Node.js 未安裝，請先安裝 Node.js
    exit /b 1
)

REM 檢查是否安裝了 npm
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo npm 未安裝，請先安裝 npm
    exit /b 1
)

REM 創建指定數量的專案
for /L %%i in (0,1,%Count%) do (
    if %%i==0 (
        set "currentProjectName=%ProjectName%"
    ) else (
        set /a "num=%%i+1"
        set "currentProjectName=%ProjectName%-!num!"
    )
    
    echo 正在創建專案: !currentProjectName!
    
    REM 使用 Vite 創建 React + TypeScript + SWC 專案
    call npm create vite@latest !currentProjectName! -- --template react-swc
    
    echo 專案 !currentProjectName! 創建完成！
)

echo 所有專案創建完成！
endlocal 