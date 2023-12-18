import * as React from "react";
import type { TimeCapsule, User } from "@prisma/client";
import { Prisma } from "@prisma/client";

type CapsuleWithUser = Prisma.TimeCapsuleGetPayload<{
  include: { user: true };
}>;

interface EmailTemplateProps {
  capsule: CapsuleWithUser;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  capsule,
}) => (
  <div>
    <h1>Hey there, {capsule.user.name}!</h1>
    <p>
      Your time capsule &quot;{capsule.name}&quot; can be opened now! Click{" "}
      <a href={`https://setsuna.vercel.app/capsules/${capsule.id}`}>here</a> to
      open it now.
    </p>
  </div>
);

export default EmailTemplate;
