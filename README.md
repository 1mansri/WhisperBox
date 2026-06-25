# WhisperBox

WhisperBox is a Next.js web application that lets users create a personal public link to collect anonymous feedback. It is designed for honest responses, quick sharing, and simple message management from a secure dashboard.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

With WhisperBox, you can:

- Generate your own public feedback URL.
- Share it anywhere to receive anonymous messages.
- View and manage all received messages in one dashboard.

The project is built using Next.js (App Router), TypeScript, Tailwind CSS, and MongoDB, with authentication handled through NextAuth.

---

## Features

- **Anonymous Feedback Collection**
  - Receive untraceable, anonymous messages via a public link.

- **Personal Feedback Link**
  - Every user gets a unique public URL to share.

- **Dashboard for Message Management**
  - View incoming messages and manage them from a centralized interface.

- **Authentication & Account Security**
  - Sign up/sign in flow with NextAuth.
  - Email verification support.

- **Modern UI**
  - Responsive and reusable component-based interface with Tailwind CSS.

- **API-Driven Architecture**
  - Modular API routes for auth, messages, and user operations.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, PostCSS
- **Authentication:** NextAuth
- **Database:** MongoDB
- **Validation:** Zod (schema-based validation)
- **Email:** Custom email templates/components for verification flows

---

## Project Structure

A high-level structure may look like:

```text
.
├── app/                  # App Router pages and routes
├── components/           # Reusable UI components
├── lib/                  # Utilities (e.g., dbConnect)
├── models/               # Database models
├── schemas/              # Zod validation schemas
├── public/               # Static assets
└── ...
```

> Adjust this structure section if your repository differs.

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (recommended)
- **npm** (or **yarn** / **pnpm**)
- A running **MongoDB** instance

### 1) Clone the repository

```bash
git clone https://github.com/1mansri/WhisperBox.git
cd WhisperBox
```

### 2) Install dependencies

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

---

## Environment Variables

Create a `.env` file (or copy from `.env.sample` if present):

```bash
cp .env.sample .env
```

Update required values, such as:

- `MONGODB_URI`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- Email provider credentials (for verification emails)

> Ensure `.env` is **not** committed to version control.

---

## Running the App

Start the development server:

Using npm:

```bash
npm run dev
```

Using yarn:

```bash
yarn dev
```

Open: [http://localhost:3000](http://localhost:3000)

---

## Usage

1. **Sign Up / Sign In**  
   Visit auth routes to create or access your account.

2. **Create Your Public Link**  
   After login, generate your personal feedback URL from the dashboard.

3. **Share & Collect Messages**  
   Share your link publicly to receive anonymous feedback.

4. **Manage Feedback**  
   Review and organize messages from your dashboard.

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m "feat: add your feature"
   ```

4. Push to your branch:

   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a Pull Request with a clear description

---

## License

If this project is open source, add your license details here (for example, MIT).  
If no license is currently defined, consider adding a `LICENSE` file.

---

Made with ❤️ using Next.js + TypeScript.
