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
        const documents = await prisma.academyDocument.findMany({
          orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        });
        return res.status(200).json(documents);

      case "POST":
        const newDoc = await prisma.academyDocument.create({
          data: {
            title: req.body.title,
            description: req.body.description,
            type: req.body.type || "PDF",
            category: req.body.category || "Operacyjny",
            size: req.body.size ? String(req.body.size) : "0 MB",
            icon: req.body.icon || "📄",
            cloudinaryId: req.body.cloudinaryId,
            url: req.body.url,
            isActive: req.body.isActive ?? true,
          },
        });
        return res.status(201).json(newDoc);

      case "PUT":
        if (!id) return res.status(400).json({ error: "Missing document ID" });
        const updatedDoc = await prisma.academyDocument.update({
          where: { id: id as string },
          data: {
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            category: req.body.category,
            size: req.body.size ? String(req.body.size) : undefined,
            icon: req.body.icon,
            cloudinaryId: req.body.cloudinaryId,
            url: req.body.url,
            isActive: req.body.isActive,
          },
        });
        return res.status(200).json(updatedDoc);

      case "DELETE":
        if (!id) return res.status(400).json({ error: "Missing document ID" });
        await prisma.academyDocument.delete({
          where: { id: id as string },
        });
        return res.status(200).json({ message: "Document deleted" });

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    console.error("Academy Documents API Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
