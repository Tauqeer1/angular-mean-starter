# angular-mean-starter

Angular MEAN starter - MongoDB + ExpressJS + Angular + NodeJS

## Highlights

- Angular 4
- Webpack 2 + multiple loaders
- REST API (done with ExpressJS)
- Templates (and single page app loading page, e.g. index.html) are made with [Jade](http://jade-lang.com/) (actually it's renamed to "Pug" nowadays)
- Styles are made with [Stylus](http://stylus-lang.com/)
- Easy-to-use date pipe replacement (using MomentJS instead of the default Angular date pipe)
- Webpack livereloading (on local development, not HMR but almost as good)
- Full stack compilation on Heroku build process (this is really must to have, should also work on other systems)

## Prequisities

The projects needs that you have the following things installed:

- [NodeJS](https://nodejs.org/) (version 7 or greater, tested with v7.10.0)
- [MongoDB](https://www.mongodb.com/) (tested with version 3.4.2)
- [Heroku Toolbelt](https://toolbelt.heroku.com/) (latest)

All of the prequisities are available on Linux, Windows and Mac OS X systems with their own installers (just go to links above and download package).

### Installing prequisities on Mac OS X

You might wish to install the prequisities with Homebrew, so here're quick guide to do that.

#### Install Homebrew

You can install [Homebrew](http://brew.sh/) with this command:

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

#### NodeJS

You can install NodeJS simply by giving command:

```
brew install node
```

#### Node Version Manager (recommended)

If you wish to run multiple NodeJS versions (to avoid problems with old NodeJS modules, you might want to use 4.2 as default, and NodeJS 6 on newer projects, you should install [NVM](https://github.com/creationix/nvm) (Node Version Manager) for managing multiple NodeJS versions.

NVM can be installed by the following command:

```
brew install nvm
```

Note! Follow the instructions after installing NVM, so that you'll get the shell extended (basically adding stuff to your `.bash_profile`).

Then you can just install and use specific NodeJS version like:

```
nvm install v7
nvm use v7
```

#### MongoDB

```
brew install mongodb
ln -sf /usr/local/opt/mongodb/homebrew.mxcl.mongodb.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist
```

Note! You can also unload with `launchctl`, as well as add the load/unload commands to your `.bash_profile` or equivalent as aliases.

### Installing prequisities on Windows

You should install installer packages of [NodeJS](https://nodejs.org/en/download/current/), [MongoDB](https://www.mongodb.com/download-center) and [Heroku Toolbelt](https://toolbelt.heroku.com/windows), either 32bit or 64bit depending on your system.

#### MongoDB

When MongoDB is installed, you should create (or ensure) that you have `C:\Data` -directory created:

```
dir C:\Data
```

After ensuring or creating the directory, you can just launch MongoDB from command line:

```
mongod.exe
```

#### Other notes

On Windows installations, it will ease the task if you use PowerShell and add all the necessary paths to utilities to Windows environment path. To do so, you can right-click the *Start* -button, select *Advanced System Settings* and finally select *Environment Variables*. You need to restart the PowerShell (or possibly logout and login) to get the environment variables going.

## Installation

### Install node modules and type definitions

```
npm install
```

## Local development

### Build

```
npm run build
```

### Start web server

```
npm start
```

### Open local app in browser

[http://localhost:5000/](http://localhost:5000/)

## Configuration

- `MONGODB_URI=mongodb://user:pass@hostname:port/database` MongoDB URI (you can leave empty if you use MongoDB on localhost)
- `GOOGLE_ANALYTICS_TRACKING_ID` Google Analytics tracking ID
- `SITE_TITLE` = Site title (default "Angular MEAN starter")

For local development, you can save the environment to `.env` -file on project root:

```
MONGODB_URI=mongodb://user:pass@hostname:port/database
```

### Local Development

In local development you might want to run WebPack continuously with nodemon (e.g. `npm run build:watch` and `npm run server:dev`). You can do that just by giving command:

```
npm run dev
```

## Heroku

### Install Heroku cli

```
brew install heroku-cli
```

### Create a Heroku app first (if you don't have already one)

```
heroku create --region eu mycoolapp
```

### Add MongoDB

You can use a free plan of [MongoLab](https://elements.heroku.com/addons/mongolab) for data storage:

```
heroku addons:create mongolab:sandbox
```

### Deploy

```
git push heroku master
```

### Open Heroku app in browser

```
heroku open
```

