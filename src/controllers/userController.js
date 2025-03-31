import User from "../models/User.js";
import bcrypt from "bcryptjs";
export const updateUserProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update fields if provided
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = await bcrypt.hash(req.body.password, 10);
        }

        const updatedUser = await user.save();
            console.log("Updated User:", updatedUser);
        res.json({
            message: "Profile updated successfully",
            user: { _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email },
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};