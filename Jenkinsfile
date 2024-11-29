pipeline {
    agent { docker { image 'python:3.9-slim' } }
    stages {
        stage('test') {
            steps {
                sh 'pip install --upgrade pip'
                sh 'pip install -r requirements.txt'
                sh 'python3 -m pytest'
            }
        }
    }
    post {
        failure {
            updateGitlabCommitStatus name: 'test', state: 'failed'
            script {
                sh "cd ./apiserver/ && git diff -- ."
            }
        }
        success {
            updateGitlabCommitStatus name: 'test', state: 'success'
        }
    }
}
