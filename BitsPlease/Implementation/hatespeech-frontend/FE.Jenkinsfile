pipeline {
    agent any

    environment {
        APP_NAME = "hatespeech-frontend"
        DEPLOY_DIR = "/var/www/html/${APP_NAME}"
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the repository
                checkout scm
            }
        }

        stage('Build') {
            steps {
                // Change to the correct directory
                dir('BitsPlease/Implementation/hatespeech-frontend') {
                    // Install dependencies
                    sh 'npm install'

                    // Build the project
                    sh 'npm run build'
                }
            }
        }

        stage('Run') {
            steps {
                // Change to the correct directory
                dir('BitsPlease/Implementation/hatespeech-frontend') {
                    // Start the application using npm start in the background
                    sh 'npm start &'
                }
            }
        }
    }
}
