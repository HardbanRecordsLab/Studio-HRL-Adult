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

  const { method } = req;
  const { id } = req.query;

  try {
    switch (method) {
      case "GET":
        const videos = await prisma.academyVideo.findMany({
          orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        });
        return res.status(200).json(videos);

      case "POST":
        const newVideo = await prisma.academyVideo.create({
          data: {
            title: req.body.title,
            description: req.body.description,
            duration: req.body.duration,
            level: req.body.level || "Początkujący",
            cloudinaryId: req.body.cloudinaryId || "manual",
            url: req.body.url,
            thumbnail: req.body.thumbnail,
            format: req.body.format,
            bytes: req.body.bytes,
            width: req.body.width,
            height: req.body.height,
            isActive: req.body.isActive ?? true,
          },
        });
        return res.status(201).json(newVideo);

      case "PUT":
        if (!id) return res.status(400).json({ error: "Missing video ID" });
        const updatedVideo = await prisma.academyVideo.update({
          where: { id: id as string },
          data: {
            title: req.body.title,
            description: req.body.description,
            duration: req.body.duration,
            level: req.body.level,
            cloudinaryId: req.body.cloudinaryId,
            url: req.body.url,
            thumbnail: req.body.thumbnail,
            format: req.body.format,
            bytes: req.body.bytes,
            width: req.body.width,
            height: req.body.height,
            isActive: req.body.isActive,
          },
        });
        return res.status(200).json(updatedVideo);

      case "DELETE":
        if (!id) return res.status(400).json({ error: "Missing video ID" });
        await prisma.academyVideo.delete({
          where: { id: id as string },
        });
        return res.status(200).json({ message: "Video deleted" });

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    console.error("Academy Videos API Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
