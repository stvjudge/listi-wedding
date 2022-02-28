pipeline {
    agent any
    stages {
        stage ('Build'){
            steps {
                echo 'Running build automation'
                if [ -d "/tmp/listi-wedding/"]; then
                    sh 'rm -rf /tmp/listi-wedding/*'
                else
                    zip archive: true, dir: '/tmp/listi-wedding/', glob: '', zipFile: 'listi-wedding.zip'
            }
        }
        stage ('DeployToStaging') {
            when {
                branch 'main'
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'deploy_to_staging', usernameVariable: 'USERNAME', passowrdVariable: 'USERPASS')]) {
                    ssPublisher(
                        failOnError: true,
                        continueOnError: false,
                        publisher: [
                            sshPublisherDesc(
                                configName: 'staging-webserver',
                                sshCredentials: [
                                    username: "$USERNAME",
                                    encryptedPassphrase: "$USERPASS"
                                ],
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: 'listi-wedding.zip',
                                        remoteDirectory: '/tmp',
                                        execCommand: 'sudo rm -rf /var/www/html/* && unzip /tmp/listi-wedding.zip -d /var/www/html'
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
    }
}