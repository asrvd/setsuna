import { db } from "@/app/lib/db";
import { Resend } from "resend";
import EmailTemplate from "@/app/components/email-template";

const r = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  const capsules = await db.timeCapsule.findMany({
    include: {
      user: true,
    },
  });

  const today = new Date();

  capsules.forEach(async (capsule) => {
    if (
      capsule.locked &&
      (capsule.openingDate as Date).getDate() <= today.getDate()
    ) {
      try {
        const { data, error } = await r.emails.send({
          from: "Setsuna <setsuna@sup.asrvd.me>",
          to: [capsule.user.email as string],
          subject: "Your time capsule is ready to be opened!",
          react: EmailTemplate({ capsule: capsule }) as React.ReactElement,
        });

        if (error) {
          return Response.json({ error });
        }

        return Response.json({ data });
      } catch (error) {
        return Response.json({ error });
      }
    } else {
      console.log(capsule.openingDate, today);
    }
  });

  return Response.json({ message: "ok" });
}
