"use client";
import Image from "next/image";
import { useState, useEffect, ChangeEvent, useRef } from "react";
import "./main.scss";
import Header from "../../components/Header/header";
import { useRouter } from "next/navigation";
import { useQRCode } from "next-qrcode";

interface UrlHistoryItem {
  id: number;
  before: string;
  after: string;
}

const Home: React.FC = () => {
  // const [counter, setCounter] = useState(0);
  const { SVG } = useQRCode();

  const [originalUrl, setoriginalUrl] = useState("");
  const [qrCodeImage, setQrCodeImage] = useState("");

  const router = useRouter();
  const result = localStorage.getItem("shortened_url") || "";
  const points = localStorage.getItem("remainingpoints") || "";
  const [Result, setResult] = useState<string>("");

  const handleurl = (e: ChangeEvent<HTMLInputElement>) => {
    setoriginalUrl(e.target.value);
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard
        .writeText(result)
        .then(() => {
          alert("주소가 클립보드에 복사되었습니다!");
        })
        .catch((err) => {
          console.error("복사 실패: ", err);

          alert("주소 복사에 실패했습니다.");
        });
    } else {
      alert("결과가 없습니다.");
    }
  };

  useEffect(() => {
    const qrCode =
      "https://relative-ray-national.ngrok-free.app/" +
      localStorage.getItem("shortened_url");

    if (qrCode) {
      setQrCodeImage(qrCode);
    }
  }, [Result]);

  const launch = () => {
    const token = localStorage.getItem("token"); // localStorage에서 토큰 가져오기

    const headers: { [key: string]: string } = {
      "Content-Type": "application/json;charset=utf-8",
    };

    const newRandomString = generateRandomString(10);
    setAnimateMatrix(true);

    // 토큰이 존재하는 경우, 헤더에 추가
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    fetch("https://relative-ray-national.ngrok-free.app/url", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        original_url: originalUrl,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.message === "POST_SUCCESS") {
          localStorage.setItem("original_url", user.url.original_url);
          localStorage.setItem("shortened_url", user.url.shortened_url);
          localStorage.setItem("created_at", user.url.created_at);
          localStorage.setItem("remainingpoints", user.remainingPoints);
          setResult(user.url.shortened_url || "");
        } else if (
          user.message === "invalid token" ||
          user.message === "Too many traffics"
        ) {
          alert("실패했습니다 다시 시도해 주세요");
          router.push("/");
        }
      });
  };

  const getHistoryFromLocalStorage = (): UrlHistoryItem[] => {
    const historyString = localStorage.getItem("urlHistory");
    return historyString ? JSON.parse(historyString) : [];
  };

  // 로컬 스토리지에 히스토리를 저장하는 함수
  const saveHistoryToLocalStorage = (history: UrlHistoryItem[]) => {
    localStorage.setItem("urlHistory", JSON.stringify(history));
  };

  // 새 URL 히스토리를 업데이트하는 함수
  const updateUrlHistory = (newItem: UrlHistoryItem) => {
    const history = getHistoryFromLocalStorage();
    history.unshift(newItem); // 새 항목을 맨 앞에 추가
    const trimmedHistory = history.slice(0, 5); // 세 개의 아이템으로 제한
    saveHistoryToLocalStorage(trimmedHistory); // 로컬 스토리지에 저장
  };

  useEffect(() => {
    // QR 코드를 설정한 후 URL 히스토리를 업데이트
    if (qrCodeImage) {
      updateUrlHistory({
        id: parseInt(localStorage.getItem("id") || "0"),
        before: localStorage.getItem("original_url") || "",
        after: localStorage.getItem("shortened_url") || "",
      });
    }
  }, [qrCodeImage]);

  // 렌더링을 위해 로컬 스토리지에서 URL 히스토리를 가져옴
  const urlHistory = getHistoryFromLocalStorage();

  const historyRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("slideIn");
        } else {
          entry.target.classList.remove("slideIn");
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (historyRef.current) {
      observer.observe(historyRef.current);
    }

    return () => {
      if (historyRef.current) {
        observer.unobserve(historyRef.current);
      }
    };
  }, []);
  const random = result.startsWith("ims.we")
    ? result.substring("ims.we".length)
    : result;

  const [animateMatrix, setAnimateMatrix] = useState(false);

  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="intro">
          <h1 className="introHeader">
            당신의 복잡한 URL을
            <span className="introHeaderSpan"> 쉽고 간결하게 </span>
            바꾸어 드립니다.
          </h1>
          <h2 className="introText">
            이제 더 이상 지저분한 URL 을 공유하실 필요 없습니다. 1분 안에 당신의
            URL 을 단정하게 꾸며 드립니다.
            <br></br> 지금 회원 가입 하시고 무제한 URL 변경 권한을 획득하세요!
          </h2>
        </div>

        <div className="main">
          <p> URL 입력: </p>
          <input
            className="mainInput"
            type="text"
            placeholder="당신의 URL 을 입력하세요"
            onChange={handleurl}
          />
          <button type="button" onClick={launch}>
            생성
          </button>
          <p> Output:</p>
          <div className="mainFomula">
            <p className="form1">ims.we</p>
            <p className="form1">+</p>
            <p
              className={`form2 ${animateMatrix ? "matrix-animation" : ""}`}
              key={result}
            >
              <p className="randomString"> {random} </p>
            </p>
          </div>
          <p>Result: </p>
          <div className="resultLine">
            <p
              className={`mainResult ${result ? "resultBoxAnimation" : ""}`}
              key={result}
            >
              결과 : <p className="result">{result}</p>
            </p>
          </div>
          <p>
            QR 이미지 :
            <div className="qrcode fadeIn" key={qrCodeImage}>
              {qrCodeImage && <SVG text={qrCodeImage} />}
            </div>
          </p>
          <p className="notice">
            QR 코드는 한번만 생성되니 이미지를 저장해주시기 바랍니다.
          </p>
          <div>
            <p>남은 횟수 : {points} </p>
            <button className="clipBoard" onClick={copyToClipboard}>
              클립 보드에 주소 복사{" "}
            </button>
          </div>
        </div>

        <div className="mainHistory" ref={historyRef}>
          <p>URL 변경 HISTORY</p>
          <ol>
            {urlHistory.map((item: UrlHistoryItem, index: number) => (
              <li className="urlLists" key={index}>
                {item.before}에서 {item.after}로 변경됨
              </li>
            ))}
          </ol>
        </div>

        <div className="mainBottom">
          <p className="mainBottomText">
            횟수 제한 없이 URL 을 생성 하고 싶다면??
          </p>
          <div className="mainBottomButtons">
            <button className="signup" onClick={() => router.push("/signup")}>
              회원가입 또는{" "}
            </button>
            <button className="login" onClick={() => router.push("login")}>
              로그인
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
