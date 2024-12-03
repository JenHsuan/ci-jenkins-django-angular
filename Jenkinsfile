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
    }
    post {
        always {
            // Trigger parameterized build on other projects
            script {
                def buildResult = build job: 'ci-jenkins-django-angular-fe'


            }
        }
    }
}
