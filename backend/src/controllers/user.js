import User from "../models/Users.js";

export const listUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: "Error listando usuarios", error });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, email, password, role = "admin" } = req.body;

    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists)
      return res.status(400).json({ msg: "Username o email ya están registrados" });

    const user = new User({ username, email, password, role });
    await user.save();

    res.status(201).json({ msg: "Usuario creado", user: { id: user._id, username, email, role } });
  } catch (error) {
    res.status(500).json({ msg: "Error creando usuario", error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { email, role, isActive } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { email, role, isActive },
      { new: true }
    ).select("-password");

    res.json(updated);
  } catch (error) {
    res.status(500).json({ msg: "Error actualizando usuario", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Error eliminando usuario", error });
  }
};

export const toggleActiveStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    user.isActive = !user.isActive;
    await user.save();

    res.json({ msg: `Usuario ahora está ${user.isActive ? "activo" : "inactivo"}` });
  } catch (error) {
    res.status(500).json({ msg: "Error cambiando estado", error });
  }
};
