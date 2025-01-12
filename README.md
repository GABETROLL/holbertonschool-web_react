# Learning React at Holberton
This repository contains different versions of a mock-up page of Holberton's student dashboard. Each version adds new features, using different tools from React.
## Usage
### Install Dependencies
Unfortunately, because of the way this project is structured, you will need to install the dependencies for each individual exercise folder you wish to test:
```
$ cd project_directory/task_N/dashboard/
project_directory/task_N/dashboard $ npm install
```
This is because as the app progresses, more dependencies are needed, so they are listed individually.
### Run Project Folder
```
$ npm run build
$ npm run
```
### Run Project Folder's Unit Tests
```
$ npm test
```
## Project Directory
Each folder, a new React tool is introduced, and implemented into the mock-up.
* ``react_intro/``
* ``react_props/``
* ``React_component/``
* ``React_inline_styling/``
* ``react_state/``
* ``0x08_react_redux_action_creator_normalizr/``
* ``react_redux_reducer_selector/``
* ``react_redux_connectors_and_providers/``
Loosely speaking, in each folder, there are exercise folders, each of wich are a new version of the mock-up page, which relate to the current React tool being taught. In each exercise folder, there may be a ``dashboard/`` folder, containing config files, and a ``src/`` folder, where the code for the current exercise is, but some exercise folders are structured differently.
```
react_tool/
  task_0/
    src/
  task_1/
    src/
  task_2/
    src/
  ...
react_other_tool/
  task_1/
    src/
  task_2/
    src/
  ...
...
```
