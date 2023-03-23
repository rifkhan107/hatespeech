pipeline {
    agent any

    environment {
        APP_NAME = "hatespeech-frontend"
        APP_DIR = "/var/www/html"
        NGINX_CONFIG_FILE = "/etc/nginx/sites-available/${APP_NAME}"
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
                dir('Implementation/hatespeech-frontend') {
                    // Install dependencies
                    sh 'npm install'

                    // Build the project
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                // Copy the built files to the web root directory
                sh "sudo cp -r Implementation/hatespeech-frontend/build/* ${APP_DIR}/"

                // Create the Nginx server block configuration file
                withCredentials([string(credentialsId: 'nginx-config', variable: 'NGINX_CONFIG')]) {
                    writeFile file: NGINX_CONFIG_FILE, text: "${env.NGINX_CONFIG}\n"
                }

                // Enable the new configuration file
                sh "sudo ln -s ${NGINX_CONFIG_FILE} /etc/nginx/sites-enabled/"

                // Test the configuration
                sh "sudo nginx -t"

                // Restart Nginx to apply the changes
                sh "sudo systemctl restart nginx"
            }
        }
    }
}
