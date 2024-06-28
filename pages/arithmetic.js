import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Arithmetic.module.css";
import backButtonStyles from "../styles/BacktoMenu.module.css";

const Arithmetic = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [practiceProblem, setPracticeProblem] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    setPracticeProblem(generateProblem());
  }, []);

  const generateProblem = () => {
    const operations = ["+", "-", "*", "/"];
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const operation = operations[Math.floor(Math.random() * operations.length)];
    return `${num1} ${operation} ${num2}`;
  };

  const handleButtonClick = (value) => {
    if (value === "=") {
      try {
        setResult(eval(input));
      } catch {
        setResult("오류");
      }
    } else if (value === "C") {
      setInput("");
      setResult(null);
    } else {
      setInput(input + value);
    }
  };

  const checkAnswer = () => {
    try {
      const correctAnswer = eval(practiceProblem);
      if (parseFloat(userAnswer) === correctAnswer) {
        setFeedback("정답!");
      } else {
        setFeedback(`오답! 정답은 ${correctAnswer}입니다.`);
      }
    } catch {
      setFeedback("문제에 오류가 있습니다.");
    }
  };

  const handleAnswerChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleNewProblem = () => {
    setPracticeProblem(generateProblem());
    setUserAnswer("");
    setFeedback("");
  };

  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
    "C",
  ];

  return (
    <div className={styles.arithmeticContainer}>
      <div className={styles.arithmetic}>
        <Head>
          <title>사칙연산 학습</title>
        </Head>
        <Link href="/" className={backButtonStyles.menuButton}>
          처음으로
        </Link>
        <h1 className={styles.title}>사칙연산 학습</h1>
        <div className={styles.display}>
          {input || "0"}
          {result !== null && <div className={styles.result}>= {result}</div>}
        </div>
        <div className={styles.buttons}>
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              className={styles.button}
              onClick={() => handleButtonClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
      <div className={styles["math-practice"]}>
        <div className={styles.problem}>{practiceProblem}</div>
        <input
          className={styles["input-answer"]}
          type="text"
          value={userAnswer}
          onChange={handleAnswerChange}
          placeholder="숫자"
        />
        <button className={styles["check-button"]} onClick={checkAnswer}>
          확인
        </button>
        <div
          className={
            styles.feedback +
            " " +
            (feedback.startsWith("정답!") ? styles.correct : styles.incorrect)
          }
        >
          {feedback}
        </div>
        <button className={styles["check-button"]} onClick={handleNewProblem}>
          다른 문제
        </button>
      </div>
    </div>
  );
};

export default Arithmetic;
