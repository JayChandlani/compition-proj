import Complaint from "../model/Complaint.js";

export const register = async (req, res) => {

    try {
        const {
            fullName,
            email,
            picturePath,
            phoneNumber,
            aadhar,
            message,
            fraud
        } = req.body;

        const newUser = new Complaint({
            name: fullName,
            email,
            picturePath,
            phone: phoneNumber,
            aadhar,
            message,
            fraud
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

