const QuestionVisualiserCard = (question) => {
  const { Question, optionA, optionB, optionC, optionD, correctAns } = question;
  return (
    <div className="item">
      <h4>{Question}</h4>
      {!(optionA === undefined) && <p>{optionA}</p>}
      {!(optionB === undefined) && <p>{optionB}</p>}
      {!(optionC === undefined) && <p>{optionC}</p>}
      {!(optionD === undefined) && <p>{optionD}</p>}
      <p>{correctAns}</p>
    </div>
  );
};

export default QuestionVisualiserCard;
