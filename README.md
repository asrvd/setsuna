## Setsuna
Setsuna is a fun little project made for the [Supabase Launch Week X Hackathon](https://supabase.com/blog/supabase-hackathon-lwx) which lets you create virtual time capsules with files and notes that you can open in the future to relive the past memories. It's a simple idea, but it's a fun one. I hope you enjoy it!

https://github.com/asrvd/code-streak/assets/68690233/c94f2afa-8a99-4282-9605-482e836a6b15

## Inspiration
I've always been fascinated by the idea of time capsules  & think it's a fun way to preserve memories and relive them in the future. I've always wanted to create a time capsule for myself, but I never got around to doing it. So, I thought why not build a virtual time capsule where you can store files and notes and open them in the future. And that's how Setsuna was born. The beauty of virtual time capsules is that it can remain unharmed by the elements of nature and can be opened from anywhere in the world as long as you have an internet connection.

## Tech Stack
- Next.js
- TailwindCSS
- Supabase
- Vercel
- Prisma

## Features
- Create time capsules with files and notes.
- Set a date for when you want to open the time capsule.
- Get email reminders when the time capsule is ready to be opened.

## How to run locally
1. Clone the repo
```
git clone https://github.com/asrvd/setusna.git
```
2. Install dependencies
```
pnpm i
```
3. Create a `.env.local` or `.env` file and add the following environment variables
```
DATABASE_URL={DIRECT_URL}?pgbouncer=true&connection_limit=1
DIRECT_URL=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
NEXTAUTH_SECRET=
SUPABASE_PROJECT_URL=
SUPABASE_KEY=
RESEND_API_KEY=
```
4. Fire up prisma
```
pnpm dlx prisma db push
pnpm dlx prisma generate
```
5. Run the dev server
```
pnpm dev
```

## Team
This project is solo built by me - [ashish](https://twitter.com/_asheeshh)

## Conclusion
I hope you enjoy Setsuna as much as I enjoyed building it. If you have any questions, feel free to reach out to me on [Twitter](https://twitter.com/_asheeshh) or open a new issue, and I'll get back to you as soon as I can. Thanks for checking out my project!
