import User from "../models/User.js";

export const updateUserProfile = async (req, res) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // Handle profile image URL
    if (req.body.profileImage) {
      user.profileImage = req.body.profileImage; // Store the URL as a string
    }

    // Handle password update
    if (req.body.currentPassword && req.body.newPassword) {
      const isMatch = await user.matchPassword(req.body.currentPassword);
      if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }
      user.password = req.body.newPassword; // Let Mongoose pre('save') hook hash it
    } else if (req.body.currentPassword && !req.body.newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        profileImage: updatedUser.profileImage,
      },
    });
  } catch (error) {
    console.error("Error updating user profile:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
