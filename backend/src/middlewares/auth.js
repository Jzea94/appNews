import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token)
    return res.status(401).json({ msg: "Token requerido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded.id, decoded.role)
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    res.status(403).json({ msg: "Token inválido" });
  }
};
