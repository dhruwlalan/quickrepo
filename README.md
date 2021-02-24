# quick-repository

> Quickly create a repository locally & also host it on github, all via the command line!

## Installation

```
$ npm install -g quick-repository
```

## Prerequisites

-  Make sure you have [node](https://nodejs.org/en/) and [git](https://git-scm.com/) installed.
-  You will also need to generate a github [personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token#creating-a-token) with the scope [repo] checked. The generated token will be required when setting up your app.

## Setup

Before you can use the app, you have to first run the setup. Inside the setup you will have to
provide the personal access token to connect the app with github's api.
To setup the app, run:

```
$  qr setup
```

> The setup is required to run only once when you first install this package.

## Initialize & Create Repository

After the setup is successful, the app is configured with default configurations and it is now
ready to initialize & create repositories. To initialize a directory as git repository and also
host it on github, you can run the below command inside that directory:

```
$  qr init
```

If you run the init command inside an empty directory, the app will initialize the directory as a
git repository and will also create that repository on github. The app will also add a remote named
origin to the local repository linked to the created remote repository on github.

If you run the init command inside a directory containing some content, the app will first do the same
it does above in an empty directory plus the app will also prompt you to wether create an initial commit
since the directory contains some content. If you choose yes then the app will add (stage) all the
contents & will create an initial commit with the provided initial commit message. Then the app will
push the local branch to the repository created on github & will also track the remote branch.

## Available Commands

| command           | description                                              |
| ----------------- | -------------------------------------------------------- |
| `qr setup`        | To setup the app.                                        |
| `qr reset`        | To reset the app.                                        |
| `qr view-config`  | To view the app configurations.                          |
| `qr edit-config`  | To edit the app configurations.                          |
| `qr new-token`    | To add a new github personal access token to the app.    |
| `qr view-token`   | To view the stored token.                                |
| `qr verify-token` | To verify the stored token if its valid or invalid.      |
| `qr delete-token` | To delete the stored token.                              |
| `qr init`         | To initialize and host a repository locally & on github. |

## License

[MIT](https://github.com/dhruwlalan/quick-repository/blob/master/LICENSE) © 2021 [dhruw lalan](https://github.com/dhruwlalan)
