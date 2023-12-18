"use server";

import { db } from "./db";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";
import s from "./supabase";

export async function createCapsule(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized!");
  }

  const name = formData.get("name")?.toString() || "";
  const description = formData.get("description")?.toString() || null;

  await db.timeCapsule.create({
    data: {
      name,
      description,
      userId: session.user.id,
    },
  });

  revalidatePath("/dashboard");
}

export async function uploadFile(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized!");
  }

  const capsuleId = formData.get("capsuleId")?.toString() || "";
  const file = formData.get("file") as File;
  const description = formData.get("description")?.toString() || null;

  const { data, error } = await s.storage
    .from("setsuna")
    .upload(`${capsuleId}/${file.name}`, file);

  if (error) {
    throw new Error("Could not upload file");
  }

  const fileURL = s.storage.from("setsuna").getPublicUrl(data.path)
    .data.publicUrl;

  await db.item.create({
    data: {
      timeCapsuleId: capsuleId,
      description,
      mediaUrl: fileURL,
      type: "file",
    },
  });

  revalidatePath(`/capsule/${capsuleId}`);
}

export async function addNote(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized!");
  }

  const notes = formData.get("notes")?.toString() || "";
  const capsuleId = formData.get("capsuleId")?.toString() || "";
  const description = formData.get("description")?.toString() || null;

  await db.item.create({
    data: {
      timeCapsuleId: capsuleId,
      description,
      notes,
      type: "note",
    },
  });

  revalidatePath(`/capsule/${capsuleId}`);
}

export async function lockCapsule(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized!");
  }

  const capsuleId = formData.get("capsuleId")?.toString() || "";
  const openDate = formData.get("openDate")?.toString() || "";

  await db.timeCapsule.update({
    where: {
      id: capsuleId,
    },
    data: {
      locked: true,
      openingDate: new Date(openDate),
    },
  });

  revalidatePath(`/capsule/${capsuleId}`);
}

export async function unlockCapsule(capsuleId: string) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized!");
  }

  await db.timeCapsule.update({
    where: {
      id: capsuleId,
    },
    data: {
      locked: false,
      openingDate: null,
    },
  });

  revalidatePath(`/capsule/${capsuleId}`);
}

export async function updateProfile(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized!");
  }

  const name = formData.get("name")?.toString() || session.user.name;
  const email = formData.get("email")?.toString() || session.user.email;

  await db.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name,
      email,
    },
  });

  revalidatePath("/settings");
}
