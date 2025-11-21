import User from "../models/Users.js";

export const createInitialSuperAdmin = async () => {
  try {
    const exists = await User.findOne({ role: "superadmin" });

    if (exists) {
      console.log("Superadmin ya existe. Omitiendo creación inicial.");
      return;
    }

    const superadmin = new User({
      username: "superadmin",
      email: "superadmin@fucknews.com",
      password: process.env.SUPERADMIN_PASSWORD,
      role: "superadmin",
      isActive: true
    });

    await superadmin.save();

    console.log("🚀 Superadmin inicial creado correctamente:");
    console.log("   username: superadmin");
    console.log("   email: superadmin@fucknews.com");
  } catch (err) {
    console.error("Error creando superadmin inicial:", err);
  }
};
