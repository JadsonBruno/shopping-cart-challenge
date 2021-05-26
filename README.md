# A shopping cart app

This application provides product listings, filtering products by category and adding products to the cart for checkout.

It is done with:

  - Typescript
  - Hooks
  - React
  - React Testing Library

## Instalation

**You need to install [Node.js](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/) first, then in order to clone the project via HTTPS, run this command:**

```git@github.com:JadsonBruno/shopping-cart-challenge.git```

SSH URLs provide access to a Git repository via SSH, a secure protocol. If you have a SSH key registered in your Github account, clone the project using this command:

```git clone git@github.com:JadsonBruno/shopping-cart-challenge.git```

### Instal dependencies

After clone, install the dependencies and devDependencies.

```sh
$ cd shopping-cart-challenge
$ yarn install
```

### Run application

First, you will need to start a fake server to deliver the products to the application. To do this, run the following command:
```yarn server```

With the server ready, open a new terminal tab and run the following command to start the application in a development environment:

```yarn start```

Now you can access http://localhost:3000/ to see the main page.

### Run tests

Run the following command to run all tests for the application:

```yarn test```