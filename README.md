## Setsuna
Setsuna is a fun little project made for the [Supabase Launch Week X Hackathon](https://supabase.com/blog/supabase-hackathon-lwx) which lets you create virtual time capsules with files and notes that you can open in the future to relive the past memories. It's a simple idea, but it's a fun one. I hope you enjoy it!

[https://github.com/asrvd/code-streak/assets/68690233/93a0b86d-7f64-42ee-b8a4-c8943780dea9](https://github.com/asrvd/code-streak/assets/68690233/c69a610d-a31c-428a-8f6e-0cb7254a2ac8)

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

## Conclusion
I hope you enjoy Setsuna as much as I enjoyed building it. If you have any questions, feel free to reach out to me on [Twitter](https://twitter.com/_asheeshh) or open a new issue, and I'll get back to you as soon as I can. Thanks for checking out my project!
