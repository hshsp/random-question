import React, { useRef, useState } from "react";
import "./main.css";

interface Props {}

const Main: React.FC<Props> = (props: Props) => {
  const [tab, setTab] = useState<"write" | "question" | "finish">("write");
  const [questions, setQuestions] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [index, setIndex] = useState<number>(0);

  const onClickStart = () => {
    if (!textareaRef.current) return;

    setTab("question");

    const arr = textareaRef.current.value
      .split("\n")
      .filter((item) => item.length > 0);

    for (let index = arr.length - 1; index > 0; index--) {
      // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
      const randomPosition = Math.floor(Math.random() * (index + 1));

      // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
      const temporary = arr[index];
      arr[index] = arr[randomPosition];
      arr[randomPosition] = temporary;
    }

    setQuestions(arr);
  };

  const onClickNext = () => {
    if (index >= questions.length - 1) {
      setTab("finish");
      return;
    }
    setIndex((prev) => prev + 1);
  };

  const onClickRestart = () => {
    setTab("write");
  };

  return (
    <div className="root">
      {tab === "write" && (
        <div className="write-container">
          <textarea className="write" ref={textareaRef} />
          <button onClick={onClickStart}>Start</button>
        </div>
      )}

      {tab === "question" && (
        <div className="question-container">
          <div className="content">{questions.at(index)}</div>
          <div className="button-container">
            <button onClick={onClickNext}>Next</button>
            <div className="current">{`현재 ${index + 1}/${
              questions.length
            }`}</div>
          </div>
        </div>
      )}

      {tab === "finish" && (
        <div className="finish-container">
          <button onClick={onClickRestart}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default Main;
