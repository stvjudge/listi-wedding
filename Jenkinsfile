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
                                        execCommand: 'sudo rm -rf /var/www/html/* && unzip /tmp/listi-wedding.zip -d /var/www/html', 
                                        execTimeout: 120000, 
                                        flatten: false, 
                                        makeEmptyDirs: false, 
                                        noDefaultExcludes: false, 
                                        patternSeparator: '[, ]+', 
                                        remoteDirectory: '/tmp', 
                                        remoteDirectorySDF: false, 
                                        removePrefix: 'tmp/listi-wedding/', 
                                        sourceFiles: '/tmp/listi-wedding/listi-wedding.zip')], 
                                        usePromotionTimestamp: false, 
                                        useWorkspaceInPromotion: false, 
                                        verbose: true)])
            }
        }
    }
}