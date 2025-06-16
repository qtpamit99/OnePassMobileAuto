pipeline {
    agent any
    
    environment {
        // Set your paths here
        ALLURE_HOME = 'C:\\Program Files\\Jenkins\\allure-2.34.0'
        PATH = "${ALLURE_HOME}\\bin;${env.PATH}"
    }
    
    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                bat '''
                set ENV=qa
                set SUITE=smoke
                set BROWSER=chrome
                set MODE=headed
                
                if "%SUITE%"=="mobile" (
                    call npm run test:%ENV%:%SUITE%
                ) else (
                    call npm run test:%ENV%:%SUITE%:%BROWSER%:%MODE%
                )
                '''
            }
        }
        
        stage('Generate Report') {
            steps {
                bat 'allure generate allure-results -o allure-report --clean'
            }
        }
    }
    
    post {
        always {
            allure([
                includeProperties: false,
                jdk: '',
                properties: [],
                reportBuildPolicy: 'ALWAYS', // Forces success status
                results: [[path: 'allure-results']]
            ])
            
            // Clean up (optional)
            bat 'rd /s /q allure-results'
        }
    }
}