To install:

    npm install ensure-latest --save

Add the script hook to your package.json:

    "scripts": {
        "preinstall": "node ./node_modules/ensure-latest/index.js"
    },

Finally, mark the modules that you want to ensure are latest in your package.json:

    "ensureLatest": [ "grunt", "mocha" ]

Now whenever you run `npm install`, you will see logging from ensure-latest!

If everything is up to date:
    
    > npm install
    
    > node ./node_modules/ensure-latest/run.js
    
    Making sure we are using the latest versions of certain modules...
    Ensured modules are up to date!
    > 

Or, if an update is available:

    > npm install
    
    > node ./node_modules/ensure-latest/run.js
    
    Making sure we are using the latest versions of certain modules...
    - Updating arrow from 0.3.35 to 0.3.38
    Updated package.json with new module versions!

Followed by npm installing the new version.

Enjoy!

- Dawson Toth

