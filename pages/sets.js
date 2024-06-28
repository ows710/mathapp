import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import backButtonStyles from "../styles/BacktoMenu.module.css";
import styles from "../styles/Sets.module.css";

const Sets = () => {
  const [sets, setSets] = useState([{ id: 1, elements: ["A", "B", "C"] }]);
  const [newSet, setNewSet] = useState("");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("");
  const [resultStatus, setResultStatus] = useState("");
  const [visualization, setVisualization] = useState([]);
  const [selectedSets, setSelectedSets] = useState([]);

  const handleNewSetChange = (e) => {
    setNewSet(e.target.value);
  };

  const addSet = () => {
    if (newSet.trim() !== "") {
      const newId = sets.length + 1;
      const newSetObj = { id: newId, elements: newSet.split(",") };
      setSets([...sets, newSetObj]);
      setNewSet("");
    }
  };

  const deleteSet = (setId) => {
    const updatedSets = sets.filter((set) => set.id !== setId);
    setSets(updatedSets);
    const updatedSelectedSets = selectedSets.filter((set) => set.id !== setId);
    setSelectedSets(updatedSelectedSets);
    setVisualization(updatedSets);
  };

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
    setSelectedSets([]);
    setVisualization([]);
    setResult("");
    setResultStatus("");
  };

  const performOperation = () => {
    if (selectedSets.length < 2) {
      setResult("최소한 집합 2개는 선택해야 합니다!");
      setResultStatus("error");
      return;
    }

    let operationResult;
    if (operation === "union") {
      operationResult = selectedSets.reduce(
        (acc, curr) => new Set([...acc, ...curr.elements]),
        new Set()
      );
    } else if (operation === "intersection") {
      operationResult = selectedSets.slice(1).reduce((acc, curr) => {
        const set1 = new Set(acc);
        const set2 = new Set(curr.elements);
        return new Set([...set1].filter((elem) => set2.has(elem)));
      }, new Set(selectedSets[0].elements));
    } else if (operation === "difference") {
      operationResult = selectedSets.slice(1).reduce((acc, curr) => {
        const set1 = new Set(acc);
        const set2 = new Set(curr.elements);
        return new Set([...set1].filter((elem) => !set2.has(elem)));
      }, new Set(selectedSets[0].elements));
    }

    const resultArray = Array.from(operationResult);
    setResult(resultArray.join(", "));
    setResultStatus(resultArray.length > 0 ? "success" : "error");
    visualizeOperation(operation, operationResult);
  };

  const visualizeOperation = (op, resultSet) => {
    const visualizedSets = sets.map((set) => {
      const isInResultSet = set.elements.every((elem) => resultSet.has(elem));
      return { ...set, isInResultSet };
    });
    setVisualization(visualizedSets);
  };

  const toggleSetSelection = (setId) => {
    if (selectedSets.some((set) => set.id === setId)) {
      const updatedSelection = selectedSets.filter((set) => set.id !== setId);
      setSelectedSets(updatedSelection);
    } else {
      const selectedSet = sets.find((set) => set.id === setId);
      setSelectedSets([...selectedSets, selectedSet]);
    }
  };

  return (
    <div className={styles.setsContainer}>
      <Head>
        <title>집합 학습</title>
      </Head>
      <Link href="/" className={backButtonStyles.menuButton}>
        처음으로
      </Link>
      <h1 className={styles.title}>집합연산</h1>
      <div className={styles.sets}>
        {sets.map((set) => (
          <div
            key={set.id}
            className={`${styles.set} ${
              selectedSets.some((selected) => selected.id === set.id)
                ? styles.selectedSet
                : ""
            } ${
              visualization.some(
                (vSet) => vSet.id === set.id && vSet.isInResultSet
              )
                ? styles.highlightedSet
                : ""
            }`}
            onClick={() => toggleSetSelection(set.id)}
          >
            <span>{`{ ${set.elements.join(", ")} }`}</span>
            <button
              onClick={() => deleteSet(set.id)}
              className={styles.deleteButton}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className={styles.controls}>
        <input
          type="text"
          value={newSet}
          onChange={handleNewSetChange}
          placeholder="새 집합을 입력하세요. (ex. A,B,C)"
          className={styles.inputField}
        />
        <button onClick={addSet} className={styles.button}>
          추가
        </button>
        <select
          value={operation}
          onChange={handleOperationChange}
          className={styles.selectField}
        >
          <option value="">연산 선택</option>
          <option value="union">합집합</option>
          <option value="intersection">교집합</option>
          <option value="difference">차집합</option>
        </select>
        <button onClick={performOperation} className={styles.button}>
          실행
        </button>
        <button
          onClick={() => {
            setSelectedSets([]);
            setVisualization([]);
            setResult("");
            setResultStatus("");
          }}
          className={styles.button}
        >
          결과 초기화
        </button>
      </div>
      <div className={styles.result}>
        {result && (
          <p
            className={
              resultStatus === "error"
                ? `${styles.resultText} ${styles.error}`
                : `${styles.resultText} ${styles.success}`
            }
          >
            결과: {result}
          </p>
        )}
      </div>
    </div>
  );
};

export default Sets;
