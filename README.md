# Contribute
## Human language policy
* Try to use technical terminology in your commits
* Try to use proper spelling
* The language of the project is American English with en_US.UTF-8
### Codestyle policy
* Write typed code, using TypeScript
* Split larger changes into smaller commits
* Commit message should be written with care, and with proper punctuation.
* Commit message shouldn't exceed 80 characters
* First line of the commit should include the todo ID e.g., S21, which is a reference to the TODO with a title that begins with (S21)
* Following lines can provide more details about the commit
* Write the commits in the imperative mood
### Workflow
* To work on a feature:
1. pull from origin/main (git pull origin main)
2. create/switch to the feature branch (git checkout -b [feature_name])
3. commit/push into the feature branch (git add [files] ; git commit ; git push -u origin [feature_name])
4. repeat step.3 until you are done working on the feature
4. create a pull request
5. make sure your PR passes CI
