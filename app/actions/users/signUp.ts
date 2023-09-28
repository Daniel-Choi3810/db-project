"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const signUp = async (
  fullName: string,
  mobileNumber: string,
  email: string,
  password: string
) => {
  const user = await prisma.candidate.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return "User with that email already exists.";
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  await prisma.candidate.create({
    data: {
      fullName,
      email,
      passwordHash,
      mobileNumbers: {
        create: [
          {
            number: mobileNumber,
          },
        ],
      },
    },
  });

  return "Successfully created new user!";
};
