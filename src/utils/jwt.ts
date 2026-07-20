import Jwt from "jsonwebtoken";

const verifyToken = (token: string, secret: string) => {
  try {
    const verified = Jwt.verify(token, secret);
    return {
      success: true,
      data: verified,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    } else {
      console.log("Unknown Error Occurred at jwt verification");
    }
  }
};

export const jwtUtils = {
  verifyToken,
};
