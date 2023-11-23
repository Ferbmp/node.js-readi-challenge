import jwt from "jsonwebtoken";

const jwtSecret = "123321";

export const generateToken = (user) => {
  return jwt.sign({ id: user.id, profile: user.profile }, jwtSecret, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    return null;
  }
};
