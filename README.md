![](https://github.com/boscan-alexandru/technical-assignment/blob/main/app_preview_video.gif)
This is a Next.js project assignment of a chat application.

## Getting Started

First, run the development server:

```bash
npm install
npx prisma init
npx prisma migrate dev --name init
npx prisma generate
npm run seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployed on a self-hosted server

Or visit [https://technical-assignment.server.influendoo.com/](https://technical-assignment.server.influendoo.com/) in your browser for the live version.

## Learn More

- this project uses [Prisma](https://prisma.io) for database management.
- this project uses [Next.js](https://nextjs.org) for server-side rendering.
- this project uses [React](https://reactjs.org) for client-side rendering.
- this project uses CSS for styling.
- this project is deployed on a self-hosted server.
- as Database it uses SQLite just because it's a small project. the database setup can be easily changed to use something more sophisticated if needed.
- this project uses [Socket.io](https://socket.io) for real-time communication.
- the files are stored in a Minio bucket.
- next.js monorepo setup.

## Additional NOTES

This project is not perfect. Some features are missing but just because it will take a lot of additional time to implement them. So i choose to push something to not loose my spot and if requested i can add more.
I would love to get your feedback.

## Known issues

- When first searching for a user and message him, the other user needs to refresh the page first so he can see the converasation. This is just the first time. after that the app works as expected and they can chat.
- when first clicking on the theme change button it changes to dark mode, but the icon doesn't update (just the first time).

## Features implemented

- Login
- Register
- Theme change
- User profile
- Real-time chat
- User search
- User list
- File sharing
- Private chat
- Mobile responsiveness

## Features not implemented

- Group chat
- notifications
- status (online/offline)
- live tipping
- message encryption
- emojis support
- no tests (lack of time)

## Deployment

For production deployment i used a docker image.
