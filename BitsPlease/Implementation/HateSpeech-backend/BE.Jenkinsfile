pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                // Change to the correct directory
                dir('Implementation/HateSpeech-backend') {
                    // Install dependencies
                    sh 'python setup.py build'
                }
            }
        }

        stage('Test') {
            steps {
                sh 'python setup.py test'
            }
        }

        stage('Deploy') {
            steps {
                sh 'python setup.py install'
            }
        }
    }
}
