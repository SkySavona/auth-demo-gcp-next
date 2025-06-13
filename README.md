````markdown
# Auth Demo GCP Next.js MVP

A **secure**, **accessible**, **cloud-native** authentication demo built with Next.js 14+ (App Router), Firebase Auth & Firestore, and Tailwind CSS. Every component is WCAG 2.2 AA–compliant, with high-contrast theming, visible focus states, and semantic landmarks.

---

## 📋 Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Getting Started](#getting-started)  
   1. [Prerequisites](#prerequisites)  
   2. [Installation](#installation)  
   3. [Environment Variables](#environment-variables)  
   4. [Firebase Setup](#firebase-setup)  
   5. [Firestore Security Rules](#firestore-security-rules)  
4. [Running Locally](#running-locally)  
5. [Deployment](#deployment)  
6. [Project Structure](#project-structure)  
7. [Accessibility](#accessibility)  
8. [Contributing](#contributing)  
9. [License](#license)

---

## 🔑 Features

- ✅ **Email/password authentication** with Firebase Auth  
- ✅ **Per-user Firestore** (`/users/{uid}`) with secure rules  
- ✅ **Next.js App Router** (v14+) for file-based routing  
- ✅ **Tailwind CSS** dark-theme styling & utility classes  
- ✅ **WCAG 2.2 AA compliance**  
  - Semantic HTML & ARIA roles  
  - Skip-to-content link, landmarks, headings  
  - Focus rings, logical tab order  
  - Accessible error (`role="alert"`) & status (`role="status"`) messages  

---

## 🛠️ Tech Stack

- [Next.js 14+](https://nextjs.org/) (App Router)  
- [React 19](https://reactjs.org/) & TypeScript  
- [Firebase](https://firebase.google.com/) (Auth, Firestore, Hosting)  
- [Tailwind CSS v4](https://tailwindcss.com/)  
- ESLint, Prettier, PostCSS  

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18  
- npm >= 9 (or Yarn/Pnpm)  
- A Firebase project with Auth & Firestore enabled  

### Installation

1. Clone this repo:  
   ```bash
   git clone https://github.com/your-org/auth-demo-gcp-next.git
   cd auth-demo-gcp-next
````

2. Install dependencies:

   ```bash
   npm install
   ```

### Environment Variables

Create a file named `.env.local` in the project root with:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

> **Restart** the dev server after updating env vars.

### Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create or select your project
3. **Authentication** → **Sign-in method** → Enable **Email/Password**
4. **Firestore Database** → **Create database** (start in test mode for dev)

#### Firestore Security Rules

In **Firestore → Rules**, replace the default with:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if
        request.auth != null &&
        request.auth.uid == userId;
    }
  }
}
```

Publish the rules to enforce per-user data isolation.

---

## ▶️ Running Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).
You should see:

* **Landing** page: “Please log in to access the dashboard”
* **Login** & **Register** pages with accessible forms
* **Dashboard** (protected) displaying your user email and sign-out button

---

## 📦 Deployment

This project is configured to deploy on Firebase Hosting:

1. Install the CLI if needed:

   ```bash
   npm install -g firebase-tools
   ```
2. Login & initialize:

   ```bash
   firebase login
   firebase use --add
   ```
3. Build & deploy:

   ```bash
   npm run build
   firebase deploy --only hosting,firestore:rules
   ```

Your app will be live on your Firebase Hosting domain.

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── globals.css       # Tailwind @import & focus styles
│   ├── layout.tsx        # RootLayout + skip link
│   ├── page.tsx          # Landing (“Please log in”) 
│   ├── login/page.tsx    # Login page + register link
│   ├── register/page.tsx # Registration page + sign-in link
│   └── dashboard/page.tsx# Protected dashboard & sign-out
├── components/
│   └── AuthForm.tsx      # Reusable login/register form
├── lib/
│   └── firebase.ts       # Firebase App/Auth/Firestore init
├── utils/
│   └── saveUserProfile.ts# Writes new user doc on registration
├── firebase/
│   └── firestore.rules   # Deployable Firestore security rules
.env.local                # Firebase config keys
package.json              # Project metadata & scripts
tailwind.config.ts        # Tailwind content paths & theme
tsconfig.json             # TypeScript config
next.config.ts            # Next.js config
```

---

## ♿ Accessibility

* **Skip-to-content** link for screen-reader & keyboard users
* All interactive elements have **visible focus** via `focus:ring`
* Forms use `<label>` + `htmlFor`, `aria-required`, `aria-describedby`
* Errors use `role="alert"`, success messages use `role="status"`
* High contrast colors: dark backgrounds + light text

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "feat: add …"`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please ensure all new code maintains WCAG 2.2 AA compliance and passes linting.

---

## 📝 License

This project is open-source under the **MIT License**. See [LICENSE](./LICENSE) for details.

```
```
