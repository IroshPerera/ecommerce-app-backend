import jwt from "jsonwebtoken";
import { CustomError } from "../common/errors/CustomError";

class TokenService {

  public generateAccessToken(userId: string): string {
    return jwt.sign(
      { userId , type: "acc"},
      process.env.JWT_SECRET as string,
      { expiresIn: "1m" }
    );
  }

  public generateRefreshToken(userId: string): string {
    return jwt.sign(
      { userId, type: "ref" },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );
  }

  public extractToken(token: string): {userId: string, type: string} {
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {userId: string, type: string};
    return decoded;
    } catch (error) {
      throw new CustomError("Access Denied", 401);
    }
  }

}



export default new TokenService();
