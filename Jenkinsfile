pipeline {
    agent any
    stages {
        stage ('Build'){
            steps {
                echo 'Running build automation'
                sh 'mkdir -p /tmp/listi-wedding'
                zip archive: true, dir: '', exclude: '', glob: '', overwrite: true, zipFile: '/tmp/listi-wedding/listi-wedding.zip'
            }
        }
        stage ('DeployToStaging') {
/*             when {
                branch 'main'
            } */
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