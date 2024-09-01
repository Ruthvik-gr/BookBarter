# Book Barter

## Overview

Book Barter is an online platform that allows users to exchange books with others, manage personal libraries, and discover recommended books. The platform includes user authentication, book management, exchange request processing, and a simple matchmaking algorithm.

## Features

- **User Authentication**: Secure login, registration, and logout features.
- **Book Management**: Add, modify, and delete books available for trade.
- **Book Discovery**: Browse and filter books listed by other users.
- **Matchmaking**: View potential matches for exchanges based on your book preferences.
- **Exchange Requests**: Create and accept exchange requests.
- **Request Cancellation**: Cancel all outstanding requests after an exchange is confirmed.

## Technology Stack

- **Frontend**: Tailwind CSS, React.js
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Database Integration

- **Users**: Stores user information and associated books.
- **Books**: Stores book details and ownership information.
- **Exchange Requests**: Manages exchange requests between users.

## Deployment

Access the platform here: [Book Barter Deployment](https://bookbarter.onrender.com/)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/BookBarter.git
    cd BookBarter
    ```

2. Install dependencies for the client:

    ```sh
    cd client
    npm install
    ```

3. Install dependencies for the server:

    ```sh
    cd ../server
    npm install
    ```

4. Create a `.env` file in the `server` directory and add your environment variables. Refer to `.env.example` for guidance.

### Running the Application

1. Start the client:

    ```sh
    cd client
    npm run dev
    ```

2. Start the server:

    ```sh
    cd ../server
    npm start
    ```

### Building for Production

1. Build the client:

    ```sh
    cd client
    npm run build
    ```

2. Deploy the server and the built client to your hosting provider.

## Usage

- Register a new account or log in with an existing account.
- Add books to your personal library.
- Browse and request book exchanges with other users.
- View recommended books based on your library.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
