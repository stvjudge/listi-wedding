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
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'staging-webserver', 
                            sshCredentials: [
                                encryptedPassphrase: '{AQAAABAAAAAQrhIcpQYZgE5K9i1jYgAWU6n37NI+UlmUadU9oootAs0=}', 
                                key: '', 
                                keyPath: '/tmp/staging-webserver.pem', 
                                username: 'ubuntu'], 
                                transfers: [
                                    sshTransfer(
                                        cleanRemote: false, 
                                        excludes: '',
                                        flatten: false, 
                                        makeEmptyDirs: false, 
                                        noDefaultExcludes: false, 
                                        patternSeparator: '[, ]+',
                                        sourceFiles: '/tmp/listi-wedding/listi-wedding.zip',
                                        removePrefix: 'tmp/listi-wedding/', 
                                        remoteDirectory: '/tmp', 
                                        remoteDirectorySDF: false, 
                                        execCommand: 'sudo rm -rf /var/www/html/* && unzip /tmp/listi-wedding.zip -d /var/www/html', 
                                        execTimeout: 120000
                                    )
                                ] 
                                         
                        )
                    ]
                )
            }
        }
    }
}