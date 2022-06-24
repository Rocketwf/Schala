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
* First line of the commit should include the todo ID e.g., S21, which is a reference to the TODO with a title that begins with (S21)
* Following lines can provide more details about the commit
* Write the commits in the imperative mood
## Workflow
* To work on a feature:
1. pull from origin/main (git pull origin main)
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
#### NodeJS >=18
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
To run the project for testing/development:
```console
make all
```
To run the project for testing/development (skip testing):
```console
make run
```
To run the core tests only:
```console
make core_test
```
