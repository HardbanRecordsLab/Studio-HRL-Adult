import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export interface AdminSessionPayload {
  email: string;
  role: "admin";
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set");
  }
  return secret;
}

export function signAdminSession(email: string): string {
  return jwt.sign(
    { email, role: "admin" } satisfies AdminSessionPayload,
    getJwtSecret(),
    { expiresIn: "8h" },
  );
}

export function verifyAdminToken(token: string): AdminSessionPayload | null {
  try {
    const payload = jwt.verify(token, getJwtSecret()) as AdminSessionPayload;
    if (payload.role === "admin" && typeof payload.email === "string") {
      return {
        email: payload.email,
        role: "admin",
      };
    }
    return null;
  } catch (error) {
    return null;
  }
}

export function getAdminSession(
  req: NextApiRequest,
): AdminSessionPayload | null {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    return verifyAdminToken(token);
  }

  const tokenFromCookie = req.cookies?.adminToken;
  if (tokenFromCookie) {
    return verifyAdminToken(tokenFromCookie);
  }

  return null;
}

export function requireAdminSession(
  req: NextApiRequest,
  res: NextApiResponse,
): AdminSessionPayload | null {
  const session = getAdminSession(req);

  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }

  return session;
}
