@echo off
setlocal

:: Usage: link-skills.cmd C:\Optimizely\Headless\training-saas-site
:: Creates a junction at C:\Optimizely\Headless\training-saas-site\.claude\skills -> C:\Optimizely\Headless\training-saas-site\skills

if "%~1"=="" (
    echo Usage: %~nx0 ^<project-path^>
    echo Example: %~nx0 C:\Optimizely\Headless\training-saas-site
    exit /b 1
)

set "PROJECT=%~1"
set "TARGET=%~dp0"
:: Remove trailing backslash from target
if "%TARGET:~-1%"=="\" set "TARGET=%TARGET:~0,-1%"
set "LINK=%PROJECT%\.claude\skills"

if not exist "%PROJECT%" (
    echo Error: Project path "%PROJECT%" does not exist.
    exit /b 1
)

:: Create .claude directory if it doesn't exist
if not exist "%PROJECT%\.claude" (
    mkdir "%PROJECT%\.claude"
)

:: Check if skills already exists
if exist "%LINK%" (
    echo Error: "%LINK%" already exists.
    echo Remove it first if you want to replace it.
    exit /b 1
)

mklink /J "%LINK%" "%TARGET%"

if %errorlevel% equ 0 (
    echo Created junction: %LINK% -^> %TARGET%
) else (
    echo Failed to create junction.
    exit /b 1
)
