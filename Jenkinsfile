/*
FileName : Jenkinsfile (Build)
Purpouse : Usefull to Build Code & deploy to Lambda
Description: 
*/
def VERSION = 'latest'
def GIT_REVISION = 'latest'
def BUILD_NUMBER = 'latest'

pipeline {
    agent { node { label 'master' } }
    environment {
        ENVIRONMENT='DEV'
    }
    stages {
        /*
        Stage : Pre-Build Step
        Purpouse : notify slack about JOB started
        */
        stage('General') {
            steps {
                echo sh(script: 'env|sort', returnStdout: true)
            }
        }
        /*
        Stage : Build Environment
        Purpouse : setup variables for further use in Job
        */
        stage('Build Environment') {
            steps {
                script {
                    GIT_REVISION = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
                }
            }
        }
        /*
        Stage : Build
        Purpouse : Build code using maven & generate Image 
        */
        stage('Build') {
            steps {
                script {
                    BUILD_NUMBER = BUILD_NUMBER+"-"+GIT_REVISION
                    //zip of code
					sh '''#!/bin/bash
                            rm -f lambda_cicd.zip
                            zip -r lambda_cicd.zip . -x Jenkins* -x "*.git*"
                    '''

                }
                
            }
        }
    }
}

def trigger_build(ENVIRONMENT, BUILD_NUMBER){
    build(job: "MyBuild-deploy",
        parameters:
        [string(name: 'ENVIRONMENT', value: ENVIRONMENT),
         string(name: 'BUILD_NUMBER', value: BUILD_NUMBER)],
         propagate: false,
         wait: false
    )
}
