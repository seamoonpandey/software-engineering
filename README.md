# Express with TypeScript Standard Template

## Overview

This project is a backend API application template built with Node.js, Express.js, and TypeScript. It provides a structured foundation for developing robust and maintainable APIs with TypeScript's type-safety and Express's powerful routing capabilities.

## Features

- **TypeScript**: Leverages TypeScript for type-safety and modern JavaScript features.
- **Express**: Utilizes Express for building scalable and efficient APIs.
- **Environment Configuration**: Manages environment variables using `dotenv`.
- **ESLint**: Ensures code quality and consistency.
- **Prettier**: Formats code for readability and style consistency.
- **Nodemon**: Enables automatic server restarts during development.

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/express-typescript-template.git
   cd express-typescript-template
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create a `.env` file**:

   ```bash
   cp .env.example .env
   ```

4. **Set environment variables** in the `.env` file:

   ```env
   PORT=3000
   ```

### Running the Application

#### Development

To start the application in development mode with automatic restarts using Nodemon:

```bash
npm run dev
# or
yarn dev
```

The server will start on the port specified in the `.env` file (default: 3000).

#### Production

To build and start the application in production mode:

```bash
npm run build
npm start
# or
yarn build
yarn start
```

### Linting and Formatting

To lint the code using ESLint:

```bash
npm run lint
# or
yarn lint
```

To format the code using Prettier:

```bash
npm run format
# or
yarn format
```

## Project Structure

```bash

├── src
│   ├── controllers      # Define your controllers here
│   ├── middlewares      # Define custom middlewares here
│   ├── routes           # Define the application routes here
│   ├── services         # Define your services here
│   ├── utils            # Utility functions
│   ├── index.ts         # Entry point of the application
├── tests                # Test files
├── .env.example         # Example environment variables file
├── .eslintrc.js         # ESLint configuration
├── .prettierrc          # Prettier configuration
├── jest.config.js       # Jest configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Project dependencies and scripts
└── README.md            # Project documentation
```

## Usage Guide

### Step-by-Step Guide to Customizing the Template

1. **Fork the repository**:

   - Navigate to the repository on GitHub and fork it to your own account.

2. **Clone your forked repository**:

   ```bash
   git clone https://github.com/your-username/express-typescript-template.git
   cd express-typescript-template
   ```

3. **Change the project name**:

   - Update `package.json` with your project name and description:

     ```json
     {
       "name": "your-project-name",
       "version": "1.0.0",
       "description": "Your project description",
       ...
     }
     ```

4. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

5. **Set up environment variables**:

   - Create a `.env` file by copying the example:

     ```bash
     cp .env.example .env
     ```

   - Edit the `.env` file with your configuration:

     ```env
     PORT=3000
     ```

6. **Run the application in development mode**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

7. **Build and run the application in production mode**:

   ```bash
   npm run build
   npm start
   # or
   yarn build
   yarn start
   ```

### Adding New Features

1. **Add a new route**:

   - Create a new file in `src/routes` (e.g., `example.route.ts`):

     ```typescript
     import { Router } from "express";
     import { exampleController } from "../controllers/example.controller";

     const router = Router();

     router.get("/example", exampleController);

     export default router;
     ```

   - Register the new route in `src/index.ts`:

     ```typescript
     import express from "express";
     import exampleRoute from "./routes/example.route";

     const app = express();
     const port = process.env.PORT || 3000;

     app.use(express.json());

     app.use("/api", exampleRoute);

     app.listen(port, () => {
       console.log(`Server is running on port ${port}`);
     });
     ```

2. **Add a new controller**:

   - Create a new file in `src/controllers` (e.g., `example.controller.ts`):

     ```typescript
     import { Request, Response } from "express";

     export const exampleController = (req: Request, res: Response): void => {
       res.json({ message: "Hello from the example controller!" });
     };
     ```

3. **Add a new service**:

   - Create a new file in `src/services` (e.g., `example.service.ts`):

     ```typescript
     export const exampleService = (): string => {
       return "This is a message from the example service!";
     };
     ```

   - Use the service in the controller:

     ```typescript
     import { Request, Response } from "express";
     import { exampleService } from "../services/example.service";

     export const exampleController = (req: Request, res: Response): void => {
       const message = exampleService();
       res.json({ message });
     };
     ```

## Contributing

If you would like to contribute to this project, please follow the guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or discussions, please open an issue in the repository.

---

Happy coding! 🚀
