# Data Aggregator

A multi-purpose backend with a monolithic architecture.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Data Aggregator is a backend application designed to manage user data with CRUD functionality. It uses Node.js, Express, Sequelize, and PostgreSQL.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/VirgilioShadow/data-aggregator.git
   cd data-aggregator
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Set up the environment variables:

   Create a `.env` file in the root directory and add the following variables:

   ```sh
   DB_USERNAME=your_database_username
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   DB_HOST=127.0.0.1
   DB_DIALECT=postgres
   ```

## Usage

1. Start the application:

   ```sh
   npm start
   ```

   The server will run on `http://localhost:3000`.

2. API Endpoints:

   - `GET /` - Returns a simple message `{ msg: 'ok' }`.
   - `POST /users` - Creates a new user.
   - `GET /users` - Retrieves all users.
   - `GET /users/:id` - Retrieves a single user by ID.
   - `PUT /users/:id` - Updates a user by ID.
   - `DELETE /users/:id` - Deletes a user by ID.

## Testing

1. Run the tests:

   ```sh
   npm test
   ```

   The tests will run using Mocha and Chai.

## Debugging

This project includes debug configurations for Visual Studio Code.

### Debugging the Application

1. Open the project in Visual Studio Code.
2. Go to the Debug panel (or press `Ctrl+Shift+D`).
3. Select "Launch Program" from the dropdown menu.
4. Click the green play button to start debugging.

### Running Tests with Debugging

1. Open the project in Visual Studio Code.
2. Go to the Debug panel (or press `Ctrl+Shift+D`).
3. Select "Mocha Tests" from the dropdown menu.
4. Click the green play button to start debugging the tests.

## Project Structure

```bash
data-aggregator/
├── config/
│ └── config.js
├── models/
│ ├── index.js
│ └── user.js
├── test/
│ ├── app.test.js
│ ├── models/
│ │ └── user.test.js
│ └── routes/
│ └── user.test.js
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
