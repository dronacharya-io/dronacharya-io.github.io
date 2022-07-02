const QuestionVisualiserCard = (question) => {
  const { Question, options, correctAns } = question;
  return (
    <div className="item">
      <h4>{Question}</h4>
      {options.map((option) => {
        return (
          <>
            <p>{option}</p>
          </>
        );
      })}
      <p>{correctAns}</p>
    </div>
  );
};

export default QuestionVisualiserCard;
