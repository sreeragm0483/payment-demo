# Payment System Demo

## Overview

This project consists of two main folders: `frontend` and `backend`. Follow the steps below to set up and run the project.

## Prerequisites

- Node.js
- npm (Node Package Manager)

## Setup Instructions

### Frontend

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on the `.env.example` file:

   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Backend

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Navigate to the `payment` directory within the `backend`:

   ```bash
   cd payment
   ```

3. Build the payment module:

   ```bash
   npm run build
   ```

4. Return to the `backend` directory:

   ```bash
   cd ..
   ```

5. Create a `.env` file based on the `.env.example` file:

   ```bash
   cp .env.example .env
   ```

6. Install the dependencies:

   ```bash
   npm install
   ```

7. Build the backend:
   ```bash
   npm run build
   ```

## To-Do

### Implemented

#### Frontend

- [x] Basic payment page in Next.js
- [x] Stripe integration with backend API in Next.js

#### Backend

- [x] Custom methods for Stripe to simplify implementation
- [x] Dynamic Controller for creating payment endpoints
- [x] Webhook for confirming transactions

### Not Implemented

- [ ] In-memory database

## Demo

Here is a demo of the application:

<video controls src="https://github.com/sreeragm0483/payment-demo/blob/main/assets/demo.mp4" title="Title"></video>
