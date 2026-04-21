import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { requireAdminSession } from "@/lib/adminSession";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!requireAdminSession(req, res)) {
    return;
  }

  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid ID" });
  }

  if (req.method === "PUT") {
    try {
      const {
        name,
        handle,
        email,
        status,
        type,
        bio,
        height,
        weight,
        measurements,
        profileData,
        characteristics,
        avatar,
      } = req.body;

      const data: any = {};
      if (name !== undefined) data.name = name;
      if (handle !== undefined) data.handle = handle;
      if (email !== undefined) data.email = email;
      if (status !== undefined) data.status = status;
      if (type !== undefined) data.type = type;
      if (bio !== undefined) data.bio = bio;
      if (avatar !== undefined) data.avatar = avatar;
      if (characteristics !== undefined) data.description = characteristics;
      if (height !== undefined) data.height = Number(height);
      if (weight !== undefined) data.weight = Number(weight);
      if (measurements !== undefined) data.measurements = measurements;
      if (profileData !== undefined) data.profileData = profileData;

      const partner = await prisma.partner.update({
        where: { id },
        data,
      });

      return res.status(200).json(partner);
    } catch (error: any) {
      console.error("Update Partner Error:", error);
      return res.status(400).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.partner.delete({
        where: { id },
      });
      return res.status(200).json({ message: "Partner deleted successfully" });
    } catch (error: any) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
