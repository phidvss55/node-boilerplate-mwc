### Creating production builds

Add this to your **package.json**

    "build": "rimraf ./build && tsc"

---

### Production startup script

    "start": "npm run build && node build/index.js"

### Scripts overview

    npm run start

_Starts the application in development using **nodemon** and **ts-node** to do cold reloading._

    npm run build

Builds the app at **build**, cleaning the folder first

    npm run start

Starts the app in production
