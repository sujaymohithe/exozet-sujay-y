## GitHub resume builder

### `ABOUT PROJECT`
This is single page React application (js) called GitHub resume builder, this application allows user to enter his/her github account name on landing page and submit the form. Once submitted a result view is dispalyed to the user with his github profile and repository information. The result view consists of basic github profile information, programming languages used in repositories and 10 popular repositories details.

This project was created with [Create React App](https://github.com/facebook/create-react-app) using npx create-react-app github_resume

## Available Scripts

In the project directory, you can run:

### `npm install`

To set up the node modules folder, please use npm install.<br />

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view app in the newest - chrome browser, internet explorer 11 , Edge , safari and firefox . <br/> <br/>

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

## Other Details

### `create-react-app`
Application is built from scratch using command `npx create-react-app github_resume`

### `redux`
No redux is used in this application for managing application state as it is a simple application.

### `react-router`
No routing is used as this application consists of only a single page. This application contains single page url and does not contain any navigation url.

### `API`
ResumeAPI.js implements 2 methods getProfileData and getReposData which connects with GitHub API https://api.github.com/ .Please refer https://developer.github.com/ for more details. Axios is used for supporting promise, error handling and callbacks.

### `styles`
App.css is modified for implementing basic styling and layout.
ResumeGenerator.css is added for implementing styling for landing page.
ResumeWidget.css is added for implementing styling for resume widget page.

### `SUPPORTED BROWSERS`
Application is best viewed in newest - chrome browser, internet explorer, firefox and safari. Please refer to `development` section in package.json for supported browsers.
