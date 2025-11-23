export const requireSuperAdmin = (req, res, next) => {
  if (req.userRole !== "superadmin") {
    return res.status(403).json({ msg: "Insufficient permissions" });
  }
  next();
};
