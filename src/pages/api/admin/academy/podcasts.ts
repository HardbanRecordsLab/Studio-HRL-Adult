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
        const podcasts = await prisma.academyPodcast.findMany({
          orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        });
        return res.status(200).json(podcasts);

      case "POST":
        const newPodcast = await prisma.academyPodcast.create({
          data: {
            title: req.body.title,
            description: req.body.description,
            episodeNumber: req.body.episodeNumber,
            duration: req.body.duration,
            cloudinaryId: req.body.cloudinaryId || "manual",
            url: req.body.url,
            format: req.body.format,
            bytes: req.body.bytes,
            isActive: req.body.isActive ?? true,
          },
        });
        return res.status(201).json(newPodcast);

      case "PUT":
        if (!id) return res.status(400).json({ error: "Missing podcast ID" });
        const updatedPodcast = await prisma.academyPodcast.update({
          where: { id: id as string },
          data: {
            title: req.body.title,
            description: req.body.description,
            episodeNumber: req.body.episodeNumber,
            duration: req.body.duration,
            cloudinaryId: req.body.cloudinaryId,
            url: req.body.url,
            format: req.body.format,
            bytes: req.body.bytes,
            isActive: req.body.isActive,
          },
        });
        return res.status(200).json(updatedPodcast);

      case "DELETE":
        if (!id) return res.status(400).json({ error: "Missing podcast ID" });
        await prisma.academyPodcast.delete({
          where: { id: id as string },
        });
        return res.status(200).json({ message: "Podcast deleted" });

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    console.error("Academy Podcasts API Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
