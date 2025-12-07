# Vehicle Rental Management System

A robust backend solution for managing vehicle rentals, users, and bookings.

**Live URL:** [Your Live URL Here]

## Features

- **User Authentication:** Secure user registration and login with JWT (JSON Web Tokens).
- **Role-Based Access Control:** Differentiated access for `admin` and `customer` roles.
- **Admin Dashboard:**
    - Manage users (View, Update roles, Delete).
    - Manage vehicles (Add, Update, Delete).
    - View and manage all bookings.
- **Vehicle Listings:** All users can browse and search for available vehicles.
- **Booking System:**
    - Authenticated users can book a vehicle.
    - Users can view their own booking history.
    - Admins can view and manage all bookings.

## Technology Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Language:** TypeScript
- **Authentication:** JWT (jsonwebtoken), bcryptjs for password hashing
- **ORM/Database Client:** pg

## Setup & Usage

### Prerequisites

- Node.js (v18 or later)
- pnpm (or your preferred package manager)
- A running PostgreSQL database instance

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/assignment-2.git
    cd assignment-2
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables. Replace the placeholder values with your actual database credentials.
    ```env
    PORT=5000
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name
    JWT_SECRET=your_jwt_secret
    ```

### Running the Application

To run the application in development mode with live reloading:

```bash
pnpm run dev
```

The server will start on the port specified in your `.env` file (e.g., `http://localhost:5000`).

## API Endpoints

A brief overview of the available API endpoints.

- `POST /api/auth/signup` - Register a new user.
- `POST /api/auth/signin` - Login a user.
- `GET /api/users` - Get all users (admin only).
- `PUT /api/users/:userId` - Update a user (admin/customer).
- `DELETE /api/users/:userId` - Delete a user (admin only).
- `POST /api/vehicles` - Add a new vehicle (admin only).
- `GET /api/vehicles` - Get all vehicles.
- `GET /api/vehicles/:vehicleId` - Get a single vehicle.
- `PUT /api/vehicles/:vehicleId` - Update a vehicle (admin only).
- `DELETE /api/vehicles/:vehicleId` - Delete a vehicle (admin only).
- `POST /api/bookings` - Create a new booking.
- `GET /api/bookings` - Get all bookings (admin/customer).
- `PUT /api/bookings/:bookingId` - Update a booking (admin/customer).

## What You Need to Provide

-   **GitHub Repository Link:** [Your GitHub Repository Link Here]
-   **Live Deployment Link:** [Your Live Deployment Link Here]
