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

        stage('Deploy') {
            steps {
                // Create the deployment directory if it doesn't exist
                sh "sudo mkdir -p ${DEPLOY_DIR}"

                // Copy the build output to the deployment directory
                sh "sudo cp -r BitsPlease/Implementation/hatespeech-frontend/build/* ${DEPLOY_DIR}"
            }
        }

        stage('Run') {
            steps {
                // Change to the correct directory
                dir('BitsPlease/Implementation/hatespeech-frontend') {
                    // Install http-server globally
                    sh 'sudo npm start'
            }
        }
    }
}
