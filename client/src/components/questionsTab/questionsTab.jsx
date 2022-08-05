import React, { useState } from "react";

const QuestionsTab = (props) => {
  return (
    <>
      {props.questions.map((question, i) => {
        const { id } = question;
        return (
          <>
            <button
              className="questionLocator"
              onClick={() => props.getQuestion(i, id)}
              id={id}
            >
              {i}
            </button>
          </>
        );
      })}
    </>
  );
};

export default QuestionsTab;
