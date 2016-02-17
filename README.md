# React.js POC - Juan Tonina

User management system for Internations. Using Reactjs and Es6.


My reasons to choose Reactjs were many, but the most important one was that I wanted to take advantage of this POC,
not only creating some small app but learning a new library that I might be using in Internations. 

The reasons for es6 are very similar, but also because it is what I'm used to.

I followed the approach of creating an "admin dashboard", because I wanted to explore the concept of Component Based UI,
and because I didn't want to mock persistence (it would have been a waste of time, since it wouldn't have added anything
to the proof of concept, hardly a realistic scenario) so you might find that I took some liberties in terms of UX.
You will also find several todo's; but the point is that 
it has a sample of every functionality (navigation, creation, deletion, etc.) and a solid architecture based on the 
best practices found on the very little (good) documentation that you can find, compared with other frameworks or 
libraries.

This POC was created using a react starter kit. 


#### Incomplete list of TODO's:

- Change the dashboard (if you add enough users or groups, it goes through the footer and it messes everything up)
- Mock persistence, maybe using localStorage or something like that.

### "List what API endpoints would you expect your backend to implement."

 _I would expect a Restful API, probably using OAuth_
 
 - /Login
 - /User (GET, POST, PUT) (Add and edit can use different http methods, and send the id in the body of the request)
 - /User/Id (GET, DELETE)
 - /Group (GET, POST, PUT) 
 - /Group/Id (GET, DELETE)(PUT: add or remove user)

-----

### Directory Layout

```
.
├── /build/                     # The folder for compiled output
├── /docs/                      # Documentation files for the project
├── /node_modules/              # 3rd-party libraries and utilities
├── /src/                       # The source code of the application
│   ├── /actions/               # Action creators that allow to trigger a dispatch to stores
│   ├── /api/                   # REST API / Relay endpoints
│   ├── /components/            # React components
│   ├── /constants/             # Constants (action types etc.)
│   ├── /content/               # Static content (plain HTML or Markdown, Jade, you name it)
│   ├── /core/                  # Core components (Flux dispatcher, base classes, utilities)
│   ├── /decorators/            # Higher-order React components
│   ├── /public/                # Static files which are copied into the /build/public folder
│   ├── /stores/                # Stores contain the application state and logic
│   ├── /utils/                 # Utility classes and functions
│   ├── /app.js                 # Client-side startup script
│   ├── /config.js              # Global application settings
│   ├── /routes.js              # Universal (isomorphic) application routes
│   └── /server.js              # Server-side startup script
├── /tools/                     # Build automation scripts and utilities
│   ├── /lib/                   # Library for utility snippets
│   ├── /build.js               # Builds the project from source to output (build) folder
│   ├── /bundle.js              # Bundles the web resources into package(s) through Webpack
│   ├── /clean.js               # Cleans up the output (build) folder
│   ├── /config.js              # Webpack configuration for application bundles
│   ├── /copy.js                # Copies static files to output (build) folder
│   ├── /deploy.js              # Deploys your web application
│   ├── /serve.js               # Launches the Node.js/Express web server
│   └── /start.js               # Launches the development web server with "live reload"
│── package.json                # The list of 3rd party libraries and utilities
└── preprocessor.js             # ES6 transpiler settings for Jest
```

### Getting Started

Just clone the repo and install dependencies:

```shell
$ git clone https://github.com/juan-tonina/internations-poc.git MyApp
$ cd MyApp
$ npm install                   # Install Node.js components listed in ./package.json
$ npm start                     # Compile and launch
```

### How to Build

```shell
$ npm run build                 # or, `npm run build -- release`
```

By default, it builds in a *debug* mode. If you need to build in a release
mode, just add `-- release` flag. This will optimize the output bundle for
production deployment.

### How to Run

```shell
$ npm start                     # or, `npm start -- release`
```

This will start a lightweight development server with "live reload" and
synchronized browsing across multiple devices and browsers.

### How to Deploy

```shell
$ npm run deploy                # or, `npm run deploy -- production`
```

For more information see `tools/deploy.js`.

### How to Test (there are no tests, but the app is prepared for them :) )  

Run unit tests powered by [Jest](https://facebook.github.io/jest/) with the following
[npm](https://www.npmjs.org/doc/misc/npm-scripts.html) command:

```shell
$ npm test
```
