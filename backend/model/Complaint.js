import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            max: 50,
        },
        picturePath: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        aadhar: {
            type: Number,
            required: true,
        },
        message: {
            type: String,
        },
        fraud: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
        versionKey: false
    }

);

const Complaint = mongoose.model("Complaint", ComplaintSchema);
export default Complaint;