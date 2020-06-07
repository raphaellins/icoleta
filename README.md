# iColeta

<p align="center"> 
  <img src="./images/overview.png" />
</p>

## Summary
- [Technologies](#technologies)
- [How to setup](#how-to-setup)
- [License](#license)

## Technologies
- [Typescript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/en/)
- [React](https://pt-br.reactjs.org/)
- [React Native](https://pt-br.reactjs.org/)
 
## What you need?

First you need to have the <a href="https://nodejs.org/en/">Node</a> 

### Api

```bash
  # Clone this repository
  $ git clone https://github.com/raphaellins/icoleta.git Ecoleta

  # Access the backend folder
  $ cd icoleta/api

  # Install the dependencies
  $ npm install

  # Generate the tables in the database
  $ npx knex migrate:latest

  # Insert standard rows into the database
  $ npx knex seed:run

  # Start the server
  $ npm run dev
```

The Api is UP.

### Web

Now it`s time to Up our Front End:

```bash
  # Access the website folder
  $ cd Icoleta/web

  # Install the dependencies
  $ npm install

  # Start the server
  $ npm start
```

### Mobile

Now it`s time to Up our App:

```bash
  # Access the mobile folder
  $ cd Icoleta/mobile

  # Install the dependencies
  $ npm install

  # Start the server
  $ expo start

```

## License
This project is under the MIT license. See the LICENSE file for more details.

<hr/>
