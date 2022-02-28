pipeline {
    agent any
    stages {
        stage ('Build'){
            steps {
                echo 'Running build automation'
                sh 'mkdir /tmp/listi-wedding/'
                zip archive: true, dir: '', glob: '', zipFile: 'listi-wedding.zip'
            }
        }
    }
}