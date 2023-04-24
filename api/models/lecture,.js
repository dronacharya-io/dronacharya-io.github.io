import mongoose from "mongoose";

const LectureSchema = new mongoose.Schema(
    {
        subjectCode: {
            type: Number,
            required:true,
        },
        subjectName: {
            type: String,
            required: true,
        },
        lectureTitle: {
            type : String,
            required: true,
        },
        lectureNotes: {
            type: String,
            required: false,
        },
        lectureLink: {
            type: String,
            required: true,
        },
        lecturer: {
            type : String,
            required: true,
        }
    },
    {timestamps : true}
);

export default mongoose.model("Lecture", LectureSchema);