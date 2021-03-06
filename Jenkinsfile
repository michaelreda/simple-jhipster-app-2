#!/usr/bin/env groovy

node {
    stage('checkout') {
        checkout scm
    }

    // docker.image('jhipster/jhipster:v6.10.5').inside('-u jhipster -e GRADLE_USER_HOME=.gradle') {
        // stage('check java') {
        //     sh "java -version"
        // }

        stage('clean') {
            sh "chmod +x gradlew"
            sh "./gradlew clean --no-daemon"
        }

        // stage('nohttp') {
        //     sh "./gradlew checkstyleNohttp --no-daemon"
        // }

        stage('npm install') {
            sh "./gradlew npm_install -PnodeInstall --no-daemon"
        }

        stage('linting') {
            sh "npm run lint"
        }

        stage('prettier') {
            sh "npm run prettier:format"
        }

        parallel 'testing BE': {
            stage('backend tests') {
                try {
                    sh "./gradlew test integrationTest -PnodeInstall --no-daemon"
                } catch(err) {
                    throw err
                } finally {
                    junit '**/build/**/TEST-*.xml'
                }
            }

        }, 'testing FE': {
            stage('frontend tests') {
                try {
                    sh "./gradlew npm_run_test -PnodeInstall --no-daemon"
                } catch(err) {
                    throw err
                } finally {
                    junit '**/build/test-results/TESTS-*.xml'
                }
            }
        }

        

        stage('packaging') {
            sh "./gradlew bootJar -x test -Pprod -PnodeInstall --no-daemon"
            archiveArtifacts artifacts: '**/build/libs/*.jar', fingerprint: true
        }

        parallel 'e2e tests': {
            stage('e2e tests') {
                // sh 'npm i chromedriver --chromedriver_version=LATEST --save-dev'
                // sh 'npm install webdriver-manager --save-dev'
                // sh 'node node_modules/protractor/bin/webdriver-manager start'
                // sh 'node_modules/protractor/bin/webdriver-manager update'
                // sh 'echo "admin" | sudo -S node_modules/webdriver-manager update'
                sh 'java -jar build/libs/*.jar &'
                sh 'sleep 30s'
                sh 'npm run e2e'
            }
        }, 'quality analysis using sonar':{
                stage('quality analysis using sonar') {
                    withSonarQubeEnv('sonar') {
                        sh "./gradlew -Pprod check jacocoTestReport sonarqube --no-daemon"
                    }
                }
        }, 'security checks using snyk': {
                stage('security checks using snyk') {
                    snykSecurity severity: 'high', 
                    snykInstallation: 'snyk',
                    snykTokenId: 'snyk_token'
            }
        }

        stage('QA Team Approval') {
            input "Deploy to prod?"
        }


        stage('deployment') {
            sh "./gradlew deployHeroku --no-daemon"
        }
    // }
    
   

    // def dockerImage
    stage('publish docker') {
        // A pre-requisite to this step is to setup authentication to the docker registry
        // https://github.com/GoogleContainerTools/jib/tree/master/jib-gradle-plugin#authentication-methods
        sh "./gradlew -Pprod jib"
    }
}
