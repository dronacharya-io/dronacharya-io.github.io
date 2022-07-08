const QuestionVisualiserCard = (props) => {
  const { Question, options, correctAns } = props.question;
  return (
    <>
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
      <button id="removeQuestion">-</button>
    </>
  );
};

export default QuestionVisualiserCard;
