import type { NextApiRequest, NextApiResponse } from "next";
import { signAdminSession } from "@/lib/adminSession";

function getAdminCredentials() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD environment variables must be set",
    );
  }

  return { email, password };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, password } = req.body;
    const { email: adminEmail, password: adminPassword } =
      getAdminCredentials();

    if (email === adminEmail && password === adminPassword) {
      const token = signAdminSession(adminEmail);

      res.setHeader("Set-Cookie", [
        `adminToken=${token}; HttpOnly; Path=/; Max-Age=28800; SameSite=Strict${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
      ]);

      return res.status(200).json({
        success: true,
        admin: {
          email: adminEmail,
          role: "admin",
        },
        message: "Authentication successful",
      });
    }

    return res.status(401).json({
      success: false,
      error: "Invalid credentials",
    });
  } catch (error: any) {
    console.error("Login API Error:", error);
    return res.status(500).json({ error: "Authentication internal failure" });
  }
}
