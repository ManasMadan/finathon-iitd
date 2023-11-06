import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import Timer from "../components/Timer";
import Trivia from "../components/Trivia";
import Styles from "../styles/Home.module.css";
import Start from "../components/Start";
import data from "../components/data";
export default function Home() {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("₹ 0");

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "₹ 1000" },
        { id: 2, amount: "₹ 2000" },
        { id: 3, amount: "₹ 3000" },
        { id: 4, amount: "₹ 5000" },
        { id: 5, amount: "₹ 10,000" },
        { id: 6, amount: "₹ 20,000" },
        { id: 7, amount: "₹ 40,000" },
        { id: 8, amount: "₹ 80,000" },
        { id: 9, amount: "₹ 1,00,000" },
        { id: 10, amount: "₹ 3,20,000" },
        { id: 11, amount: "₹ 6,40,000" },
        { id: 12, amount: "₹ 12,50,000" },
        { id: 13, amount: "₹ 25,00,000" },
        { id: 14, amount: "₹ 50,00,000" },
        { id: 15, amount: "₹ 1,00,00,000" },
      ].reverse(),
    []
  );
  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber]);

  return (
    <div className={Styles.app}>
      <Head>
        <title>Quiz</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {username ? (
        <>
          <div className={Styles.main}>
            {stop ? (
              <h1 className={Styles.endtext}>You Earned:{earned}</h1>
            ) : (
              <>
                <div className={Styles.top}>
                  <div className={Styles.timer}>
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </div>
                <div className={Styles.bottom}>
          
                  <Trivia
                    data={data}
                    setStop={setStop}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                  />
                </div>
              </>
            )}
          </div>
          <div className={Styles.pyramid}>
          <Image src="/logo.png" alt="logo" width={240} height={160} />
            <div className={Styles.avatar}>
              <h1>Welcome {username} </h1>
            </div>

            <ul className={Styles.moneyList}>
              {moneyPyramid.map((m) => (
                <li
                  className={
                    questionNumber === m.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                  key={m.id}
                >
                  <span className={Styles.moneyListItemNumber}>{m.id}</span>
                  <span className={Styles.moneyListItemAmount}>{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <>
          <Start setUsername={setUsername} />
        </>
      )}
    </div>
  );
}
