# Fullstack Phonebook Application

Welcome to the Fullstack Phonebook Application, a robust and intuitive solution for managing your contacts. This project, originally forked from notsotruamatiq/full-stack-starterpack, utilizes React with TypeScript on the frontend and Laravel (PHP) on the backend.

## Prerequisites

Ensure you have the following prerequisites installed:

- PHP 7.4
- Docker

## Getting Started

Follow these instructions to set up and run the backend and frontend of the application.

### Running the Backend

1. **Navigate to the backend directory**:

   ```bash
   cd knot-backend
   ```

2. **Install the dependencies**:

   ```bash
   composer install
   ```

3. **Start the server**:
   ```bash
   php artisan serve
   ```

The backend server will be running at [http://localhost:8000](http://localhost:8000).

### Running the Frontend

1. **Navigate to the frontend directory**:

   ```bash
   cd frontend
   ```

2. **Start the frontend server**:
   ```bash
   docker-compose up
   ```

The frontend will be running at [http://localhost:5173](http://localhost:5173).

## Project Overview

### Features

- **Add Contacts**: Easily add new contacts with first name, last name, email, and phone number.
- **Edit Contacts**: Modify existing contact details.
- **Delete Contacts**: Remove contacts you no longer need.
- **View Contact History**: Track changes made to each contact.

### Technologies Used

- **Frontend**: React, TypeScript
- **Backend**: Laravel (PHP)
- **Database**: SQLite (or any other database supported by Laravel)

## Development Workflow

### Backend

1. **Migrate the database**:

   ```bash
   php artisan migrate
   ```

2. **Seed the database**:
   ```bash
   php artisan db:seed
   ```

### Frontend

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm start
   ```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the repository**
2. **Create a new branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit your changes**:

   ```bash
   git commit -m 'Add some feature'
   ```

4. **Push to the branch**:

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a pull request**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
