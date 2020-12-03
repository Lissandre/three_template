# THREE.js TEMPLATE

## Requirements & Setup
You need to have **node.js** installed. 

Start with `npm run init`

This command will init a git repository on your machine, install dependencies and remove useless files and directories for your project.
After that, this command won't be available anymore.

## Development
Run the local webpack-dev-server with hotreload and autocompile on:
- local: [http://localhost:8080/](http://localhost:8080/)
- network: http://your-local-ip:8080/

```sh
$ npm run dev
```

### Debug
Go to your-url/#debug

## Alias
- **@**: `src/`
- **@style**: `src/style/`
- **@fonts**: `src/fonts/`
- **@models**: `src/models/`
- **@sounds**: `src/sounds/`
- **@shaders**: `src/shaders/`
- **@textures**: `src/textures/`
- **@js**: `src/js/`
- **@tools**: `src/js/Tools/`
- **@world**: `src/js/World/`

## Features
- eslint
- prettier
- babel
- stylus
- dat.GUI
- models import

## Deployment
Build the current application (default output in `dist/`).
```sh
$ npm run build
```

## Template link
[https://github.com/Lissandre/three_template](https://github.com/Lissandre/three_template)
