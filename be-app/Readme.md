<!-- SETUP -->
install typescript devDependencies

`npm install -D @types/express @types/node concurrently nodemon rimraf typescript`

`@types/express` - Type definitions for Express.js, a popular web framework for Node.js. This package provides TypeScript type definitions for Express, allowing developers to use Express with TypeScript and benefit from type checking and autocompletion.

`@types/node` - Type definitions for Node.js, the JavaScript runtime environment. This package provides TypeScript type definitions for Node.js, allowing developers to use Node.js with TypeScript and benefit from type checking and autocompletion.

`rimraf` - A utility that provides a cross-platform way to delete files and directories. It is often used in build scripts to clean up generated files or directories before rebuilding.

`npx tsc --init` - initialize a TypeScript project and create a tsconfig.json file with default settings. 

configure the tsconfig.json file to include the following settings:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "nodenext",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
  },
}
```

and configure the package.json file to include the following scripts:
```json
{
    "type": "module",
    "main": "dist/server.js",
    "scripts": {
        "dev": "tsx watch src/server.ts",
        "clean": "rimraf dist",
        "prebuild": "npm run clean",
        "build": "tsc",
        "start": "node dist/server.js"
    },
}
```
`dev` - runs the development server using tsx, which watches for changes in the src directory and automatically restarts the server when changes are detected.

`clean` - deletes the dist directory, which is where the compiled JavaScript files are outputted.

`prebuild` - runs the clean script before building the project, ensuring that the dist directory is clean before new files are generated.

`build` - compiles the TypeScript files in the src directory and outputs the JavaScript files to the dist directory.

`start` - starts the server by running the compiled JavaScript file in the dist directory.