import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema(
  {
    quizname: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    questions: {
      type: Array,
      required: true,
    },
    isMcq: {
      type: Boolean,
      default: false,
    },
    timePerQuestion: {
      type: Number,
      default: 15,
    },
    isNegative: {
      type: Boolean,
      default: false,
    },
    positiveMarking: {
      type: Number,
      default: 1,
    },
    negativeMarking: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: String,
      required: true,
    },
    startTime: {
      type: Number,
      required: true,
    },
    runTime: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", QuizSchema);
