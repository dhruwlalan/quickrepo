# quick-repository

> A single command to quickly create a repository locally & also host it on github.

[![NPM](https://img.shields.io/npm/l/quick-repository)](https://github.com/dhruwlalan/quick-repository/blob/master/LICENSE) [![npm](https://img.shields.io/npm/v/quick-repository)](https://www.npmjs.com/package/quick-repository) [![npm](https://img.shields.io/npm/dt/quick-repository)](https://www.npmjs.com/package/quick-repository)

## Why?

Creating repository and hosting it on Github feels quite repetitive & contains quite a few steps _(initializing local repo → create new repo on Github → add remote → push to Github)_ if you are someone who creates a lot of repositories _(in this way)_.<br>

With `quick-repository` all you have to do is just run the command `$ qr init`, enter remote repository details and **DONE**.<br>

`quick-repository` will create the local repository _(if it is already not a git repository or else it will just host it)_ , create the remote repository, add the remote, push to Github. _(It will also set the local branch to track the remote branch i.e up-stream branch)_ .

## Installation

```
$ npm install -g quick-repository
```

## Prerequisites

-  Make sure you have [node](https://nodejs.org/en/) and [git](https://git-scm.com/) installed.
-  You will also need to generate a github [personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token#creating-a-token) with the scope of `repo` checked. The generated token will be required when setting up your app so store it somewhere temporarily or copy it into the clipboard.

## Usage

**First**, run the below command to setup the app by providing the github personal access token that you generated and copied.<br>
You will get the input prompt for pasting in the personal access token.

```bash
$  qr setup
```

> you only need to run the setup once **_or_** if the stored token becomes invalid **_or_** if you purposely want to override the stored token with a new token.

**Second**, run the below command inside any directory you wish to make it a git repository & also host it onto github.

```bash
$  qr init
```

> This command will automatically set up your local repository's remote (with the name origin) linked with the created host repository on github so you need not have to worry about it!

## Available Commands

| command     | description                                                   |
| ----------- | ------------------------------------------------------------- |
| `qr setup`  | To setup the app by providing github's personal access token. |
| `qr verify` | To verify the stored token if its valid or invalid.           |
| `qr init`   | To create a repository locally & host it onto github.         |

## License

[MIT](https://github.com/dhruwlalan/quick-repository/blob/master/LICENSE) © 2021 [dhruw lalan](https://github.com/dhruwlalan)
