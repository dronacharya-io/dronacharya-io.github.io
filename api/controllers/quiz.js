import Quiz from "../models/quiz.js";

export const updateQuiz = async (req, res, next) => {
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedQuiz);
  } catch (err) {
    next(err);
  }
};
export const deleteQuiz = async (req, res, next) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    res.status(200).json("Quiz has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    res.status(200).json(quiz);
  } catch (err) {
    next(err);
  }
};
export const getQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (err) {
    next(err);
  }
};
export const createQuiz = async (req, res, next) => {
  try {
    const newQuiz = new Quiz(req.body);

    await newQuiz.save();
    const { ...otherDetails } = newQuiz._doc;
    res.status(200).json({ details: { ...otherDetails } });
  } catch (err) {
    next(err);
  }
};
// export const countBySubject = async (req, res, next) => {
//   const subjects = req.query.subjects.split(",");
//   try {
//     const list = await Promise.all(
//       subjects.map((subject) => {
//         return Quiz.countDocuments({ subject: subject });
//       })
//     );
//     res.status(200).json(list);
//   } catch (err) {
//     next(err);
//   }
// };
// export const countByType = async (req, res, next) => {
//   try {
//     const optionCount = await Quiz.countDocuments({ type: "Option-Based" });
//     const writtenCount = await Quiz.countDocuments({ type: "Written" });
//     const mixedCount = await Quiz.countDocuments({ type: "Mixed" });

//     res.status(200).json([
//       { type: "Option-Based", count: optionCount },
//       { type: "Written", count: writtenCount },
//       { type: "Mixed", count: mixedCount },
//     ]);
//   } catch (err) {
//     next(err);
//   }
// };
