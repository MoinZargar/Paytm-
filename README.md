# Digital Wallet and Money Transfer WebApp

## Overview
This project is a full-stack web application where users can create accounts, manage their wallet balances, search for friends, and transfer funds securely. The application is divided into three main components:
- **User App**: The primary user interface.
- **Bank App**: Manages banking operations.
- **Bank Webhook**: Handles webhook functionality for updating wallet balances and transaction statuses.

## Technologies Used
- **Frontend**: Next.js
- **Backend**: Next.js (User App), Express.js (Webhook)
- **Database**: PostgreSQL with Prisma ORM
- **Monorepo Management**: Turborepo
- **Containerization**: Docker

---

## Installation Guide

### Prerequisites
Make sure Docker is installed on your system. If not, download it from [Docker Desktop](https://www.docker.com/products/docker-desktop/).

### Setting Up Environment Variables
1. **User App**:
   - Navigate to `apps/user-app/`.
   - Rename `env.example` to `.env`.
   - Substitute your environment variable values in the `.env` file.

2. **Bank App**:
   - Navigate to `apps/bank-app/`.
   - Rename `env.example` to `.env`.
   - Substitute your environment variable values in the `.env` file.

3. **Bank Webhook**:
   - Navigate to `apps/bank-webhook/`.
   - Rename `env.example` to `.env`.
   - Substitute your environment variable values in the `.env` file.

4. **Database Setup**:
   - Navigate to `packages/db/`.
   - Rename `env.example` to `.env`.
   - Paste your PostgreSQL database URL in the `.env` file. You can get your cloud PostgreSQL database URL from [Aiven](https://aiven.io/).

---

### Building and Running the Application

1. Build the Docker image:
   ```bash
   docker build -t wallet .
   ```

2. Run the Docker container:
   ```bash
   docker run -d -p 3000:3000 -p 3002:3002 -p 3003:3003 wallet
   ```

---

### Accessing the Application

- Open your browser and visit:
  ```
  http://localhost:3002/
  ```

---

## Features
- **Account Management**: Create accounts and manage wallet balances.
- **Money Transfer**: Securely transfer funds between wallets.
- **Transaction Tracking**: Monitor transaction statuses (Processing, Failed, or Success).
- **Search Friends**: Find and connect with other users on the platform.

---

## Project Structure
- **apps/user-app/**: Frontend user interface.
- **apps/bank-app/**: Backend for banking operations.
- **apps/bank-webhook/**: Webhook service for transaction updates.
- **packages/db/**: Shared database setup and Prisma ORM configurations.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contributing
Contributions are welcome! Please create a pull request for any improvements or bug fixes.
