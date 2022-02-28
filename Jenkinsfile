pipeline {
    agent any
    stages {
        stage ('Build'){
            steps {
                echo 'Running build automation'
                sh 'mkdir -p wedding'
                zip archive: true, dir: '', exclude: '', glob: '', overwrite: true, zipFile: 'wedding/listi-wedding.zip'
            }
        }
        stage ('DeployToStaging') {
            when {
                branch 'main'
            }
            steps ('SSHTransferToStaging') {
                sshPublisher(
                    failOnError: true, continueOnError: false,
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
                                    sourceFiles: 'wedding/listi-wedding.zip',
                                    removePrefix: 'wedding/',
                                    remoteDirectory: '/tmp',
                                    execCommand: 'sudo unzip -o /tmp/listi-wedding.zip -d /var/www/html', 
                                )
                            ] 
                                         
                        )
                    ]
                )
            }
        }
        
        stage ('DeployToProduction') {
            when {
                branch 'main'
            }
            steps ('SSHTransferToProd') {
                input 'Is Staging OK?'
                milestone (1)
                sshPublisher(
                    failOnError: true, continueOnError: false,
                    publishers: [
                        sshPublisherDesc(
                            configName: 'prod-webserver',
                            verbose: true, 
                            sshCredentials: [
                                encryptedPassphrase: '{AQAAABAAAAAQc6cGLLA3ZMmtEdLMI4IJWe+t2LMbBNDd363MCpwaBfs=}', 
                                key: '', 
                                keyPath: '/tmp/prod-webserver.pem', 
                                username: 'ubuntu'
                            ], 
                            transfers: [
                                sshTransfer(
                                    sourceFiles: 'wedding/listi-wedding.zip',
                                    removePrefix: 'wedding/',
                                    remoteDirectory: '/tmp',
                                    execCommand: 'sudo unzip -o /tmp/listi-wedding.zip -d /var/www/html', 
                                )
                            ]        
                        )
                    ]
                )
            }
        }
    }
}