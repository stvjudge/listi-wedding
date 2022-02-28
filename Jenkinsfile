pipeline {
    agent any
    stages {
        stage ('Build'){
            steps {
                echo 'Running build automation'
                sh 'mkdir -p /tmp/listi-wedding'
                zip archive: true, dir: '', exclude: '', glob: '', overwrite: true, zipFile: 'listi-wedding.zip'
            }
        }
        stage ('DeployToStaging') {
/*             when {
                branch 'main'
            } */
            steps ('SSHTransfer') {
                sshPublisher(
                    continueOnError: false, failOnError: true,
                    publishers: [
                        sshPublisherDesc(
                            configName: 'staging-webserver',
                            verbose: true, 
                            sshCredentials: [
                                encryptedPassphrase: '{AQAAABAAAAAQrhIcpQYZgE5K9i1jYgAWU6n37NI+UlmUadU9oootAs0=}', 
                                key: '', 
                                keyPath: '/tmp/staging-webserver.pem', 
                                username: 'ubuntu'
                            ], 
                            transfers: [
                                sshTransfer(
                                    sourceFiles: 'listi-wedding.zip',
                                    removePrefix: '',
                                    remoteDirectory: '/tmp',
                                    //*execCommand: 'sudo unzip /tmp/listi-wedding.zip -o -d /var/www/html', 
                                )
                            ] 
                                         
                        )
                    ]
                )
            }
        }
    }
}