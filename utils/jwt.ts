import jwt, { JwtPayload } from "jsonwebtoken";

type VerifyResult =
  | { success: true; data: JwtPayload }
  | { success: false; error: string };

export const jwtUtils = {
  verifyToken(token: string, secret: string): VerifyResult {
    try {
      const decoded = jwt.verify(token, secret) as JwtPayload;
      return { success: true, data: decoded };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Invalid token",
      };
    }
  },
};
