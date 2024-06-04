# Express JWT Authentication

This repository contains an implementation of JWT-based authentication in an Express.js application. The goal of this project is to provide a robust and scalable solution for managing user authentication and authorization using JSON Web Tokens (JWT).

## Table of Contents

- [Code Standard](#code-section)

  - [Tech Used](#tech-names)

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Running the Server](#running-the-server)
  - [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)

## Code Section

### Tech Names

- **TypeScript**: Leverages TypeScript for type-safety and modern JavaScript features.
- **Express**: Utilizes Express for building scalable and efficient APIs.
- **Environment Configuration**: Manages environment variables using `dotenv`.
- **ESLint**: Ensures code quality and consistency.
- **Prettier**: Formats code for readability and style consistency.
- **Nodemon**: Enables automatic server restarts during development.

## Getting Started

These instructions will help you set up and run the project on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/getting-started/install)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/seamoonpandey/express-jwt-auth.git
   cd express-jwt-auth
   ```

2. Install the dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

## Usage

### Running the Server

To start the server in development mode, use the following command:

```sh
npm run dev
# or
yarn dev
```

The server will start on `http://localhost:5000`.

### API Endpoints

The following endpoints are available in this application:

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Authenticate a user and issue a JWT.
- `GET /api/users/profile`: Get the profile of the authenticated user (protected route).

### Example API Requests

#### Register a new user

```sh
curl -X POST http://localhost:5000/api/users/register -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'
```

#### Authenticate a user

```sh
curl -X POST http://localhost:5000/api/users/login -H "Content-Type: application/json" -d '{"email": "john@example.com", "password": "password123"}'
```

#### Get user profile (requires JWT)

```sh
curl -X GET http://localhost:5000/api/users/profile -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Configuration

The application configuration is managed through environment variables. Create a `.env` file in the root directory of the project and add the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## Built With

- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [Mongoose](https://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - JSON Web Token implementation for Node.js

## Contributing

Contributions are welcome! Please fork the repository and use a feature branch. Pull requests are warmly welcome.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
