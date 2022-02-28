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
        stage ('Deploy to Staging') {
/*             when {
                branch 'main'
            } */
            steps ('SSH transfer') {
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
                                    remoteDirectory: '/tmp',
                                    removePrefix: 'tmp/',
                                    sourceFiles: 'tmp/listi-wedding/listi-wedding.zip', 
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