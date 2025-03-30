import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const newuser = await User.create({ email: email, password: hashPassword, role: role });
        const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_Expiration});
        res.status(201).json({ user: newuser, token: token });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({email})
        if(!user ) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch ) return res.status(400).json({ message: "Invalid passeword" });

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1m" });
        res.json({ user: user, token: token });
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}
