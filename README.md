# Habit Tracker

This project is an attempt to learn the Remix framework and my first solo attempt at making a full stack web application. At the moment it's just a Google Keep clone but eventually I'd like it to be used to track the development of habits and display your progress similar to applications like [Habitica](https://habitica.com/static/home) and [Fabulous](https://www.thefabulous.co).

## Development

Remix requires at least Node version `14` but I am using the current LTS version of Node which is `18.16.0` for testing and development. I recommend [NVM for Windows](https://github.com/coreybutler/nvm-windows):

```sh
nvm use 18.16.0
```

Then in the repo root directory:

```sh
npm install
```

To set up the dev environment you first need to create the database. Run the following after cloning the repo:

```sh
npx prisma migrate reset
```

If Intellisense it's giving you autocompletes for the database models the try:

```sh
npx prisma generate
```

The Remix dev server starts your app in development mode, rebuilding assets on file changes. To start the Remix dev server:

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000), and you should be ready to go!

The Netlify CLI builds a production version of your Remix App Server and splits it into Netlify Functions that run locally. This includes any custom Netlify functions you've developed. The Netlify CLI runs all of this in its development mode.

```sh
netlify dev
```

Open up [http://localhost:3000](http://localhost:3000), and you should be ready to go!

Note: When running the Netlify CLI, file changes will rebuild assets, but you will not see the changes to the page you are on unless you do a browser refresh of the page. Due to how the Netlify CLI builds the Remix App Server, it does not support hot module reloading.

## Resources

- [Remix Docs](https://remix.run/docs)
- [Netlify Functions](https://www.netlify.com/products/functions/)
