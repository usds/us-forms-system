# Creating a new application with the US Forms System Starter App

The US Forms System Starter App creates the initial files, configuration, build process, and web server you need to start building your form.

Before you begin, review "[Tools for getting started with the US Forms System](getting-started/tools-for-getting-started-with-the-us-forms-system)."

### In this guide

- [Clone the Starter App repository and change the remote URL](#clone-the-starter-app-repository-and-change-the-remote-url)
- [Install dependencies](#install-dependencies)
- [Build and run your app](#build-and-run-your-app)

### Clone the Starter App repository and change the remote URL

1. Clone the us-forms-system-starter-app repository to your computer:
```bash
$ git clone https://github.com/usds/us-forms-system-starter-app.git
```
2. Change the current directory to the new us-forms-system-starter-app directory:
```bash
$ cd us-forms-system-starter-app
```
3. [On GitHub, create a new repository](https://help.github.com/articles/creating-a-new-repository/) named for your new forms app.
4. From your new repository on GitHub, [copy the clone URL](https://help.github.com/articles/cloning-a-repository/).
5. In Terminal (Mac and Linux) or the Command Prompt (Windows), review the current remote URL that's set to `origin`. The `fetch` and `push` URLs should be set to `https://github.com/usds/us-forms-system-starter-app.git`:
```bash
$ git remote -v
# Lists all remote repositories, along with the URL for those remotes.
origin https://github.com/usds/us-forms-system-starter-app.git (fetch)
origin https://github.com/usds/us-forms-system-starter-app.git (push)
```
6. Change your `origin` to use the URL for the new remote repository you created in Step 3 and copied in Step 4:
```bash
$ git remote set-url origin https://github.com/YOUR-USERNAME/YOUR-NEW-REPOSITORY-NAME.git
# Changes 'origin' to the new remote's URL
```
7. Review your current remote URL again. `origin` should be set to *your* repository on GitHub, not https://github.com/usds/us-forms-system-starter-app.git:
```bash
$ git remote -v
# Lists all remote repositories, along with the URL for those remotes.
origin https://github.com/YOUR-USERNAME/YOUR-NEW-REPOSITORY-NAME.git (fetch)
origin https://github.com/YOUR-USERNAME/YOUR-NEW-REPOSITORY-NAME.git (push)
```

### Install dependencies

Use npm to install dependencies specified in `us-forms-system-starter-app/package-lock.json`.

1. [Make sure Node and npm are installed](tools-for-getting-started-with-the-us-forms-system#node-js-and-npm).
2. In Terminal (Mac and Linux) or the Command Prompt (Windows), use npm to install dependencies for the Starter App:
```bash
$ npm install
```

### Build and run your app

Once your repository is set up and dependencies are installed, you can begin building your app by editing `/js/config/form.js`. For more information, see "[Creating a form config file](building-a-form/creating-a-form-config-file.md)."

To run your app locally, in Terminal (Mac and Linux) or the Command Prompt (Windows), type `npm start`.

[Back to *Getting Started with the US Forms System*](README.md)
