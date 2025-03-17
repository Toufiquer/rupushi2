# Rupushi

This is a Next.js project built with PWA (Progressive Web App) support. It uses MongoDB as the database, connected through the Mongoose library.

## Technologies

- [Next.js](https://nextjs.org/) - React-based full-stack framework
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Mongoose](https://mongoosejs.com/) - ODM (Object Data Modeling) tool for MongoDB
- [Next-PWA](https://www.npmjs.com/package/next-pwa) - PWA support for Next.js
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd rupushi-2.0
```

2. Install dependencies:

```bash
npm install
```

3. MongoDB Setup:

   - Install MongoDB server or use MongoDB Atlas
   - Update your MongoDB URI in the `.env.local` file

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
rupushi-2.0/
  ├── public/
  │   ├── icons/
  │   │   ├── icon-192x192.png
  |   │   └── icon-512x512.png
  │   └── manifest.json
  ├── src/
  │   ├── app/
  │   │   ├── api/
  │   │   │   └── users/
  │   │   │       └── route.ts
  │   │   ├── layout.tsx
  │   │   └── page.tsx
  │   ├── lib/
  │   │   └── mongoose.ts
  │   └── models/
  │       └── User.ts
  ├── .env.local
  ├── next.config.js
  └── package.json
```

## Production Build

To create a production build:

```bash
npm run build
```

To view the production build:

```bash
npm start
```

## PWA Support

This application is built with PWA (Progressive Web App) support. It provides offline capabilities, home screen installation, and a native app-like experience when running in production mode.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
