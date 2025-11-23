import User from "../models/Users.js";

export const listUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: "Error listing users", error });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists)
      return res.status(400).json({ msg: "Username or email is already registered" });

    const user = new User({ username, email, password, role });
    await user.save();

    res.status(201).json({ msg: "User created", user: { id: user._id, username, email, role } });
  } catch (error) {
    res.status(500).json({ msg: "Error creating user", error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, email, role, isActive } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, role, isActive },
      { new: true,
        runValidators: true,
        context: "query"
      }
    ).select("-password");

    res.json(updated);
  } catch (error) {
    res.status(500).json({ msg: "Error updating user", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "user deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting user", error });
  }
};

export const toggleActiveStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    user.isActive = !user.isActive;
    await user.save();

    res.json({ msg: `User is now ${user.isActive ? "active" : "inactive"}` });
  } catch (error) {
    res.status(500).json({ msg: "Error changing state", error });
  }
};
