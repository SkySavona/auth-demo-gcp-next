# Auth Demo GCP Next.js MVP

A **secure**, **accessible**, **cloud-native** authentication demo built with Next.js 14+ (App Router), Firebase Auth & Firestore, and Tailwind CSS. Every component is WCAG 2.2 AA–compliant, with high-contrast theming, visible focus states, and semantic landmarks.

---

## 📋 Table of Contents

1. [Features](#-features)  
2. [Tech Stack](#-tech-stack)  
3. [Getting Started](#-getting-started)  
4. [Running Locally](#-running-locally)  
5. [Deployment](#-deployment)  
6. [Project Structure](#-project-structure)  
7. [Accessibility](#-accessibility)  
8. [Contributing](#-contributing)  
9. [License](#-license)

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

- [Next.js 14+](https://nextjs.org/)  
- [React 19](https://reactjs.org/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Firebase](https://firebase.google.com/) (Auth, Firestore, Hosting)  
- [Tailwind CSS](https://tailwindcss.com/)  
- ESLint, Prettier, PostCSS  

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18  
- npm ≥ 9 (or Yarn/Pnpm)  
- Firebase project with Email/Password Auth and Firestore enabled  

### Installation

```bash
git clone https://github.com/your-org/auth-demo-gcp-next.git
cd auth-demo-gcp-next
npm install
```

### Environment Variables

Create a `.env.local` file in the root of the project:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

> Restart the dev server after editing `.env.local`.

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create/select your project
3. Enable **Authentication → Email/Password**
4. Enable **Cloud Firestore** in test mode for development

### Firestore Security Rules

Paste the following into Firebase Console → Firestore → Rules tab:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if
        request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Click "Publish" to activate your rules.

---

## ▶️ Running Locally

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)
You should see:

* Landing page: "Please log in to access the dashboard"
* `/login` and `/register` pages with accessible forms
* `/dashboard` (protected) displaying your user email and sign-out option

---

## 📦 Deployment (Firebase Hosting)

To deploy:

```bash
npm run build
firebase deploy --only hosting,firestore:rules
```

Make sure you've already initialized Firebase in your project with:

```bash
firebase login
firebase init
```

Choose Hosting and Firestore Rules when prompted.

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with skip link and accessibility
│   ├── page.tsx                # Landing page
│   ├── login/page.tsx          # Login route
│   ├── register/page.tsx       # Register route
│   └── dashboard/page.tsx      # Protected user dashboard
├── components/
│   └── AuthForm.tsx            # Shared form with login/register modes
├── lib/
│   └── firebase.ts             # Firebase App, Auth, Firestore init
├── utils/
│   └── saveUserProfile.ts      # Write user profile to Firestore
├── firebase/
│   └── firestore.rules         # Firestore rules for deployment
├── public/
│   └── *.svg                   # Icons and assets
├── .env.local                  # Firebase environment config
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
```

---

## ♿ Accessibility

This app was built with WCAG 2.2 AA in mind:

* `role="alert"` and `role="status"` used for error/success messages
* All forms use `label` + `htmlFor`, `aria-required`, and `aria-describedby`
* Accessible skip-to-content link
* Keyboard navigable
* Focus ring visibility using Tailwind
* High color contrast (dark background, bright accents)

---

## 🤝 Contributing

We welcome contributions! Follow these steps:

```bash
# Fork the repo
# Create your branch: git checkout -b feature/your-feature
# Commit your changes: git commit -m "feat: add new feature"
# Push to your branch: git push origin feature/your-feature
# Open a Pull Request
```

Please ensure all code is accessible and follows project style guidelines.

---

## 📝 License

This project is licensed under the MIT License. See `LICENSE` for details.