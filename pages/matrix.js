import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Matrix.module.css";
import backButtonStyles from "../styles/BacktoMenu.module.css";

const Matrix = () => {
  const [matrixSize, setMatrixSize] = useState(2);
  const [matrixA, setMatrixA] = useState([
    [1, 2],
    [3, 4],
  ]);
  const [matrixB, setMatrixB] = useState([
    [5, 6],
    [7, 8],
  ]);
  const [resultMatrix, setResultMatrix] = useState([]);
  const [operation, setOperation] = useState("add");

  const handleMatrixSizeChange = (e) => {
    const size = parseInt(e.target.value);
    if (size < 2 || size > 3) return;
    setMatrixSize(size);
    const defaultMatrix = Array.from({ length: size }, () =>
      Array(size).fill(0)
    );
    setMatrixA(defaultMatrix);
    setMatrixB(defaultMatrix);
    setResultMatrix([]);
  };

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  const handleMatrixChange = (matrix, setMatrix, i, j, value) => {
    const newMatrix = matrix.map((row, rowIndex) =>
      row.map((col, colIndex) =>
        rowIndex === i && colIndex === j ? parseInt(value) : col
      )
    );
    setMatrix(newMatrix);
  };

  const performOperation = () => {
    let result;
    switch (operation) {
      case "add":
        result = matrixA.map((row, i) =>
          row.map((col, j) => col + matrixB[i][j])
        );
        break;
      case "subtract":
        result = matrixA.map((row, i) =>
          row.map((col, j) => col - matrixB[i][j])
        );
        break;
      case "multiply":
        result = matrixA.map((row, i) =>
          row.map((_, j) =>
            row.reduce((sum, _, k) => sum + matrixA[i][k] * matrixB[k][j], 0)
          )
        );
        break;
      default:
        result = [];
        break;
    }
    setResultMatrix(result);
  };

  return (
    <div className={styles.matrixContainer}>
      <Head>
        <title>행렬 학습</title>
      </Head>
      <Link href="/" className={backButtonStyles.menuButton}>
        처음으로
      </Link>
      <h1 className={styles.title}>행렬연산</h1>
      <div className={styles.mainContent}>
        <div className={styles.leftContent}>
          <div className={styles.controls}>
            <label className={styles.item}>행렬 크기: </label>
            <input
              type="number"
              value={matrixSize}
              onChange={handleMatrixSizeChange}
              min="2"
              max="3"
            />
          </div>
          <div className={styles.matrixInput}>
            <div className={styles.matrixSection}>
              <h2>행렬 A</h2>
              <table>
                <tbody>
                  {matrixA.map((row, i) => (
                    <tr key={i}>
                      {row.map((col, j) => (
                        <td key={`${i}-${j}`}>
                          <input
                            type="number"
                            value={matrixA[i][j]}
                            onChange={(e) =>
                              handleMatrixChange(
                                matrixA,
                                setMatrixA,
                                i,
                                j,
                                e.target.value
                              )
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.matrixSection}>
              <h2>행렬 B</h2>
              <table>
                <tbody>
                  {matrixB.map((row, i) => (
                    <tr key={i}>
                      {row.map((col, j) => (
                        <td key={`${i}-${j}`}>
                          <input
                            type="number"
                            value={matrixB[i][j]}
                            onChange={(e) =>
                              handleMatrixChange(
                                matrixB,
                                setMatrixB,
                                i,
                                j,
                                e.target.value
                              )
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.operationSelect}>
            <label className={styles.item}>연산 선택: </label>
            <select value={operation} onChange={handleOperationChange}>
              <option value="add">덧셈</option>
              <option value="subtract">뺄셈</option>
              <option value="multiply">곱셈</option>
            </select>
            <button className={styles.button} onClick={performOperation}>
              실행
            </button>
          </div>
          <div className={styles.result}>
            {resultMatrix.length > 0 && (
              <div>
                <h2>결과 행렬</h2>
                <table>
                  <tbody>
                    {resultMatrix.map((row, i) => (
                      <tr key={i}>
                        {row.map((col, j) => (
                          <td key={`${i}-${j}`}>{col}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matrix;
