//Added shared Library
library identifier: 'cicdjenkins@master', retriever: modernSCM(
    [$class: 'GitSCMSource',
    remote: 'git@spruce.arlo.com:ARLO/cicdjenkins.git',
    credentialsId: '6327e8a3-b51d-44e6-a900-50965cfa5591']
)

/*
FileName : Jenkinsfile (Build)
Purpouse : Usefull to Build Code & generate Image
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
                githubstatus('STARTED')
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
                }
                
            }
        }
    }
    /*
    Post Build Actions
    Purpouse : Perform slack Notification,Generate Junit & Jacoco Reports & trigger Deploy job for related environment
    */
    post {
        always {
            //add short text
            addShortText(text: "${GIT_BRANCH}", background: 'yellow', border: 1);
            addShortText(text: "${NODE_NAME}", background: 'cyan', border: 1) ;

            //Added Triggerbuild
            //trigger_build("${ENVIRONMENT}", BUILD_NUMBER)
        } 
    }
}

def trigger_build(ENVIRONMENT, BUILD_NUMBER){
    build(job: "lambda-cicd-deploy",
        parameters:
        [string(name: 'ENVIRONMENT', value: ENVIRONMENT),
         string(name: 'BUILD_NUMBER', value: BUILD_NUMBER)],
         propagate: false,
         wait: false
    )
}
