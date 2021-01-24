#!/usr/bin/env groovy

node {
    stage('checkout') {
        checkout scm
    }

    docker.image('jhipster/jhipster:v6.10.5').inside('-u jhipster -e GRADLE_USER_HOME=.gradle') {
        stage('check java') {
            sh "java -version"
        }

        // stage('clean') {
        //     sh "chmod +x gradlew"
        //     sh "./gradlew clean --no-daemon"
        // }

        // stage('nohttp') {
        //     sh "./gradlew checkstyleNohttp --no-daemon"
        // }

        // stage('npm install') {
        //     sh "./gradlew npm_install -PnodeInstall --no-daemon"
        // }

        // stage('linting') {
        //     sh "npm run lint"
        // }

        // stage('prettier') {
        //     sh "npm run prettier:format"
        // }

        // parallel firstBranch: {
        //         stage('backend tests') {
        //         try {
        //             sh "./gradlew test integrationTest -PnodeInstall --no-daemon"
        //         } catch(err) {
        //             throw err
        //         } finally {
        //             junit '**/build/**/TEST-*.xml'
        //         }
        //     }

        // }, secondBranch: {
        //     stage('frontend tests') {
        //         try {
        //             sh "./gradlew npm_run_test -PnodeInstall --no-daemon"
        //         } catch(err) {
        //             throw err
        //         } finally {
        //             junit '**/build/test-results/TESTS-*.xml'
        //         }
        //     }
        // }

        stage('e2e') {
            sh 'npm i chromedriver'
            sh 'npm run e2e'
        }

        // stage('packaging') {
        //     sh "./gradlew bootJar -x test -Pprod -PnodeInstall --no-daemon"
        //     archiveArtifacts artifacts: '**/build/libs/*.jar', fingerprint: true
        // }


        // stage('quality analysis using sonar') {
        //     withSonarQubeEnv('sonar') {
        //         sh "./gradlew -Pprod check jacocoTestReport sonarqube --no-daemon"
        //     }
        // }

        

        // stage('QA Team certification') {
        //     input "Deploy to prod?"
        // }

        // stage('deployment') {
        //     sh "./gradlew deployHeroku --no-daemon"
        // }
    }

    // stage('security checks using snyk') {
    //     snykSecurity severity: 'high', 
    //     snykInstallation: 'snyk',
    //     snykTokenId: 'snyk_token'
        
    //     // sh "npm install -d snyk"
    //     // sh 'mkdir ./snyk'
    //     // sh 'wget https://github.com/snyk/snyk/releases/download/v1.439.0/snyk-linux -P ./snyk'
    //     // sh 'chmod +x snyk'
    //     // sh 'sudo -n ./snyk test --all-projects'
    //     // sh 'sudo -n ./snyk monitor --all-projects'
    // }

    def dockerImage
    stage('publish docker') {
        // A pre-requisite to this step is to setup authentication to the docker registry
        // https://github.com/GoogleContainerTools/jib/tree/master/jib-gradle-plugin#authentication-methods
        sh "./gradlew -Pprod jib"
    }
}
