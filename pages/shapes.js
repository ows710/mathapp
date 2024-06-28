import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { SketchPicker } from "react-color";
import styles from "../styles/Shapes.module.css";
import backButtonStyles from "../styles/BacktoMenu.module.css";

const Shapes = () => {
  const [sides, setSides] = useState("");
  const [result, setResult] = useState("");
  const [isError, setIsError] = useState(false);
  const [currentColor, setCurrentColor] = useState("#000");
  const canvasRef = useRef(null);

  const handleSidesChange = (e) => {
    setSides(parseInt(e.target.value));
  };

  const handleColorChange = (color) => {
    setCurrentColor(color.hex);
  };

  const drawCircle = (ctx) => {
    ctx.beginPath();
    ctx.arc(150, 150, 100, 0, 2 * Math.PI);
    ctx.fillStyle = currentColor;
    ctx.fill();
    ctx.stroke();
  };

  const drawPolygon = (ctx) => {
    const centerX = 150;
    const centerY = 150;
    const radius = 100;
    const angleStep = (2 * Math.PI) / sides;

    ctx.beginPath();
    ctx.moveTo(centerX + radius, centerY);

    ctx.fillStyle = currentColor;

    for (let i = 1; i <= sides; i++) {
      const angle = i * angleStep;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      ctx.lineTo(x, y);
    }

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const calculateShape = () => {
    try {
      if (isNaN(sides) || sides < 0) {
        setIsError(true);
        setResult("0보다 큰 수로 입력하세요!");
        clearCanvas();
      } else if (sides === 0) {
        setIsError(false);
        setResult("원");
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        clearCanvas();
        drawCircle(ctx);
      } else if (sides < 3) {
        setIsError(true);
        setResult("다각형의 변의 개수는 3개 이상입니다!");
        clearCanvas();
      } else {
        setIsError(false);
        setResult(`정${sides}각형`);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        clearCanvas();
        drawPolygon(ctx);
      }
    } catch (error) {
      setIsError(true);
      setResult("잘못 계산되었습니다.");
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
  }, []);

  return (
    <div className={styles.shapesContainer}>
      <Head>
        <title>다각형 학습</title>
      </Head>
      <Link href="/" className={backButtonStyles.menuButton}>
        처음으로
      </Link>
      <h1 className={styles.title}>다각형 학습</h1>
      <div className={styles.mainContainer}>
        <div className={styles.controls}>
          <div className={styles.inputContainer}>
            <input
              className={styles.inputField}
              type="number"
              value={sides}
              onChange={handleSidesChange}
              placeholder="변의 수를 입력하세요."
            />
            <SketchPicker
              color={currentColor}
              onChangeComplete={handleColorChange}
              disableAlpha={true}
            />
          </div>
          <button className={styles.button} onClick={calculateShape}>
            Calculate
          </button>
        </div>
        <div className={styles.resultCanvasContainer}>
          <div
            className={`${styles.result} ${
              isError ? styles.error : styles.success
            }`}
          >
            {result && <p>{result}</p>}
          </div>
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className={styles.canvas}
          ></canvas>
        </div>
      </div>
    </div>
  );
};

export default Shapes;
