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
        const articles = await prisma.academyBlogArticle.findMany({
          orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        });
        return res.status(200).json(articles);

      case "POST":
        const newArticle = await prisma.academyBlogArticle.create({
          data: {
            title: req.body.title,
            slug: req.body.slug,
            category: req.body.category,
            tag: req.body.tag,
            excerpt: req.body.excerpt,
            content: req.body.content,
            readTime: req.body.readTime,
            thumbnail: req.body.thumbnail,
            isPublished: req.body.isPublished,
            publishedAt: req.body.isPublished ? new Date() : null,
          },
        });
        return res.status(201).json(newArticle);

      case "PUT":
        if (!id) return res.status(400).json({ error: "Missing article ID" });
        const updatedArticle = await prisma.academyBlogArticle.update({
          where: { id: id as string },
          data: {
            title: req.body.title,
            slug: req.body.slug,
            category: req.body.category,
            tag: req.body.tag,
            excerpt: req.body.excerpt,
            content: req.body.content,
            readTime: req.body.readTime,
            thumbnail: req.body.thumbnail,
            isPublished: req.body.isPublished,
            publishedAt: req.body.isPublished
              ? req.body.publishedAt || new Date()
              : null,
          },
        });
        return res.status(200).json(updatedArticle);

      case "DELETE":
        if (!id) return res.status(400).json({ error: "Missing article ID" });
        await prisma.academyBlogArticle.delete({
          where: { id: id as string },
        });
        return res.status(200).json({ message: "Article deleted" });

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    console.error("Academy Articles API Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
