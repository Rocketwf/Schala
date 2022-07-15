# Contribute
## Human language policy
* Try to use technical terminology in your commits
* Try to use proper spelling
* The language of the project is American English with en_US.UTF-8
## Codestyle policy
* Write typed code, using TypeScript
* Split larger changes into smaller commits
* Commit message should be written with care, and with proper punctuation.
* Commit message shouldn't exceed 80 characters
* Following lines can provide more details about the commit
* Write the commits in the imperative mood
## Workflow
* To work on a feature:
1. pull from origin/develop (git pull origin develop)
2. create/switch to the feature branch (git checkout -b [feature_name])
3. commit/push into the feature branch (git add [files] ; git commit ; git push -u origin [feature_name])
4. repeat step.3 until you are done working on the feature
4. create a pull request
5. make sure your PR passes CI
## Development
### Prerequisites
Make sure you have all the following dependencies <br />
On Debian based systems e.g., Ubuntu and WSL: <br />
First, update your local repos:
```console
sudo apt update
```
It's also recommended to upgrade your system: 
```console
sudo apt upgrade
```
### NodeJS >=18
```console
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs npm
```
Next, install make:
```console
sudo apt install make
```
Using the following command install @quasar/cli and yarn:
```console
sudo npm i -g @quasar/cli yarn
```
### SemanticScholar API key:
If you have an SemanticScholar API key you can use it by ecporting it as a global variable (Replace API_KEY with your key)
```console
export SCHALA_API_KEY='API_KEY'
```
### Build/Install: spa/electron
First time you need to the following command to install all dependencies
```console
make all
```
To run the project for testing/development (skip testing):
```console
make run
```
To run the core tests only (backend should be up and running):
```console
make core_test
```
To run the server tests only:
```console
make core_test
```
To run the gui tests only:
```console
make core_test
```
To build the project (SPA):
```console
make build_spa
```
To build the project (electron):
```console
make build_electron
```
### Build/Install: Android
Install Java 8:
```console
apt install openjdk-8-jdk
```
Download and install Android Studio: [Android Studio](https://developer.android.com/studio).
Add Android SDK to the path:
```console
export ANDROID_HOME="$HOME/Android/Sdk"
export ANDROID_SDK_ROOT="$HOME/Android/Sdk"
export PATH=$PATH:$ANDROID_SDK_ROOT/tools; PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
```
Install Gradle 4.10.3
```console
wget https://downloads.gradle-dn.com/distributions/gradle-4.10.3-all.zip
unzip gradle-4.10.3-all.zip
export PATH=$PATH:$PWD/gradle-4.10.3/bin/
```
Install Cordova:
```console
sudo npm install -g cordova
```
Build (in the project directory):
Change directory to src-cordova:
```console
cd src-cordova
```
Add android platform:
```console
cordova platform add android
```
Go back to schala-gui:
```console
cd ../schala-gui
```
Run the quasar build command to generate cordova files:
```console
quasar build -m android
```
Change directory to src-cordova:
```console
cd src-cordova
```
Build using cordova:
```console
cordova build android
```