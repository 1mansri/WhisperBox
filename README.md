# WhisperBox

WhisperBox is a Next.js-based web application that lets you create a personal public link to collect anonymous feedback. Whether you need honest opinions on your work or just want to have fun receiving feedback, WhisperBox offers a secure and streamlined platform to do just that.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

---

## Overview

WhisperBox empowers users to:
- Generate a unique public URL.
- Share that link to receive anonymous feedback.
- Manage and review all submitted feedback through a user dashboard.
- Enjoy a secure and privacy-focused environment powered by modern web technologies.

The project leverages Next.js for server-side rendering, Tailwind CSS for styling, and TypeScript for type safety. It also integrates authentication (using NextAuth), email verification, and schema-based validation for robust functionality.

---

## Features

- **Anonymous Feedback**: Collect untraceable opinions and messages.
- **Personalized Public Link**: Create and share your unique feedback link.
- **User Dashboard**: View, archive, or delete received feedback.
- **Authentication & Verification**: Secure sign-in/sign-up flows with email verification.
- **Modern UI Components**: Built with reusable components and a responsive design using Tailwind CSS.
- **API-Driven**: Modular API routes for handling messages, user authentication, and more.

---

## Tech Stack

- **Framework:** Next.js (with App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, PostCSS
- **Authentication:** NextAuth
- **Database Integration:** (we integrate MongoDb as our database and Configured it via `lib/dbConnect.ts` – adjust as needed)
- **Validation:** Zod or similar (see schemas folder for details)
- **Email Handling:** Custom email components for verification

---

## Installation

### Prerequisites

- **Node.js** (v14 or later)
- **npm** or **yarn**

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/1mansri/WhisperBox
   cd 1mansri-whisperbox

2. Install Dependencies

Using npm:

npm install

or using yarn:

yarn install


3. Environment Variables

Rename .env.sample to .env and update the configuration with your environment-specific variables (e.g., database URL, email server credentials, NextAuth secrets).



4. Run the Development Server

Using npm:

npm run dev

or using yarn:

yarn dev

The application should now be running at http://localhost:3000.




---

Usage

1. Sign Up / Sign In

Access the authentication routes under /auth/sign-up or /auth/sign-in to create or access your account.



2. Generate Your Public Link

Once authenticated, navigate to your dashboard where you can create and manage your personal public feedback link.



3. Share & Collect Feedback

Distribute your unique link to friends, colleagues, or online communities.

View incoming anonymous feedback in real time.



4. Manage Feedback

Use dashboard features to mark, archive, or delete feedback messages.


---

Contributing

Contributions are welcome! If you'd like to improve WhisperBox or add new features, please follow these steps:

1. Fork the Repository


2. Create a New Branch

git checkout -b feature/your-feature-name


3. Commit Your Changes

git commit -m "Add feature: description"


4. Push to Your Branch

git push origin feature/your-feature-name


5. Open a Pull Request
Include a detailed description of your changes.


---


Happy coding and thank you for using WhisperBox!



