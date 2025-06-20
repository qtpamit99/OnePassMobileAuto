Playwright Framework for OnePassMobileAuto
Overview
This project contains automated tests for https://www.demoblaze.com using Playwright. It includes UI tests for purchase flow and category filtering, with support for multiple environments (qa, staging, prod).
Setup

Install dependencies:npm install


Ensure the .env file is configured with credentials:USERNAME=pavanol
PASSWORD=test@123


For Allure Reports:
Ensure Java is installed and JAVA_HOME is set to the JDK root directory (e.g., C:\Program Files\Java\jdk-21, not the bin subdirectory).
Install allure-commandline globally: npm install -g allure-commandline.
If where java shows multiple Java paths (e.g., C:\Program Files\Common Files\Oracle\Java\javapath\java.exe), remove the conflicting path from the system PATH to avoid issues with allure.



Running Tests Locally
The environment is specified using the --env flag (defaults to qa if not set).
Run a Single Test

Default environment (qa):npx playwright test "tests/categoryFilter.spec.js" --headed --project=chromium -- --env=qa


Specific environment (e.g., staging):npx playwright test "tests/categoryFilter.spec.js" --headed --project=chromium -- --env=staging



Run All Tests in Regression Suite

Default environment (qa):npx playwright test --project=Regression --headed -- --env=qa



View the Report
npm run report

Running Tests in Jenkins
The project is integrated with Jenkins and supports parameterized builds.
Jenkins Job Configuration

Prerequisites:
Install allure-commandline globally on the Jenkins server: npm install -g allure-commandline.
Ensure Java is installed and JAVA_HOME is set to the JDK root directory (e.g., C:\Program Files\Java\jdk-21, not the bin subdirectory).
If where java shows multiple Java paths, remove the conflicting path (e.g., C:\Program Files\Common Files\Oracle\Java\javapath) from the system PATH.


Parameters:
ENV: Environment (qa, stag, prod). Default: qa.
SUITE: Test suite (smoke, regression, mobile). Default: smoke.
BROWSER: Browser or device (chrome, firefox, webkit, mobile, all). Default: chrome. Note: all is only supported for smoke suite.
MODE: Mode (headed, headless). Default: headed. Note: Headless mode requires corresponding scripts in package.json (e.g., test:qa:smoke:chrome:headless).


Build Command:set JAVA_HOME=C:\Program Files\Java\jdk-21
set PATH=%JAVA_HOME%\bin;C:\Users\Amitu\AppData\Roaming\npm;%PATH%

if "%SUITE%"=="mobile" (
    call npm run test:%ENV%:%SUITE%
) else (
    call npm run test:%ENV%:%SUITE%:%BROWSER%:%MODE%
)

:: Generate Allure report
allure generate allure-results -o allure-report --clean

:: Remove allure-results to save space (optional)
rd /s /q allure-results


Post-Build Actions:
Archive artifacts: reports/html-report/**, allure-report/**
Add Allure Report: Results path: allure-report
(Optional) Add Publish HTML Reports:
HTML directory to archive: allure-report
Index page[s]: index.html
Report title: Allure Report (HTML)





Run a Build

Go to the Jenkins job and click Build with Parameters.
Select the desired parameters (e.g., ENV=qa, SUITE=smoke, BROWSER=chrome, MODE=headed).
Click Build.
View the reports after completion:
Playwright HTML Report: Available in the build artifacts under reports/html-report.
Allure Report: Click the "Allure Report" link on the build page.
Allure Report (HTML): If configured, click the "Allure Report (HTML)" link to view the report directly.



Environment Configuration
Environments are defined in config/config.json:

qa: baseUrl: "https://www.demoblaze.com", timeout: 30000
staging: baseUrl: "https://staging.demoblaze.com", timeout: 40000
prod: baseUrl: "https://prod.demoblaze.com", timeout: 50000

The environment is selected using the --env flag (defaults to qa if not set).
