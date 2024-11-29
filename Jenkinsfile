pipeline {
    agent none
    stages {
        stage('test-backend') {
            agent { docker { image 'python:3.9-slim' } }
            steps {
                script {
                    updateGitlabCommitStatus name: 'test-backend', state: 'running'
                    sh 'pip install --upgrade pip'
                    sh 'pip install -r requirements.txt'
                    sh 'python3 -m pytest --junitxml=./report/report.xml'
                }
            }
            post {
                failure {
                    updateGitlabCommitStatus name: 'test-backend', state: 'failed'
                    script {
                        sh "cd ./apiserver/ && git diff -- ."
                    }
                }
                success {
                    updateGitlabCommitStatus name: 'test-backend', state: 'success'
                }
                always {
                    junit 'report/*.xml'
                }
            }
        }
        stage('build-frontend') {
            agent { docker { image 'node:20-bullseye' } }
            steps {
                dir("${env.WORKSPACE}/ui/frontend-workspace"){
                    script {
                        updateGitlabCommitStatus name: 'build-frontend', state: 'running'
                        sh 'ls'
                        sh 'npm install'
                    }
                }
            }
            post {
                failure {
                    updateGitlabCommitStatus name: 'build-frontend', state: 'failed'
                    script {
                        sh "cd ./ui/frontend-workspace' && git diff -- ."
                    }
                }
                success {
                    updateGitlabCommitStatus name: 'build-frontend', state: 'success'
                }
            }
        }
        stage('test-frontend') {
            agent { docker { image 'node:20-bullseye' } }
            steps {
                script {
                    updateGitlabCommitStatus name: 'test-frontend', state: 'running'
                    sh 'cd ui/frontend-workspace'
                    sh 'apt-get update'
                    sh 'wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb'
                    sh 'apt install -y ./google-chrome*.deb'
                    sh 'export CHROME_BIN=/usr/bin/google-chrome'
                    sh 'npm install -g @angular/cli@^17.3.8'
                    sh 'npm install'
                    sh 'npm run build'
                    sh 'npm run test:ci'
                }
            }
            post {
                failure {
                    updateGitlabCommitStatus name: 'test-frontend', state: 'failed'
                    script {
                        sh "cd ./src/ui/frontend-workspace && git diff -- ."
                    }
                }
                success {
                    updateGitlabCommitStatus name: 'test-frontend', state: 'success'
                }
                always {
                    junit 'unit-test-results.xml'
                }
            }
        }
    }
}
