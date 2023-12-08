"use client";
import Image from "next/image";
import { useState, useEffect, ChangeEvent } from "react";
import "./main.scss";
import { URL_HISTORY } from "/Users/boikun/Desktop/ims_internship_wecode50/src/app/data/index";
import Header from "../../components/Header/header";
import { useRouter } from "next/navigation";
import { useQRCode } from "next-qrcode";

interface UrlHistoryItem {
  id: number;
  before: string;
  after: string;
}

const Home: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const { SVG } = useQRCode();

  const [originalUrl, setoriginalUrl] = useState("");
  const [qrCodeImage, setQrCodeImage] = useState("");

  const router = useRouter();
  const result = localStorage.getItem("shortened_url") || "";
  const points = localStorage.getItem("remainingpoints") || "";

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
    const qrCode = localStorage.getItem("shortened_url");

    if (qrCode) {
      setQrCodeImage(qrCode);
    }
  }, [counter]);

  const launch = () => {
    fetch("http://192.168.1.29:8000/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        original_url: originalUrl,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.message === "POST_SUCCESS") {
          localStorage.setItem("id", user.url.id);
          localStorage.setItem("original_url", user.url.original_url);
          localStorage.setItem("shortened_url", user.url.shortened_url);
          localStorage.setItem("created_at", user.url.created_at);
          localStorage.setItem("remainingpoints", user.remainingPoints);
        } else if (
          user.message === "invalid token" ||
          user.message === "Too many traffics"
        ) {
          alert("실패했습니다 다시 시도해 주세요");
          router.push("/login");
        }
      });
    setCounter((prevCounter) => prevCounter + 1);
    console.log(counter);
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
            <p className="form2">생성된 랜덤 난수 @</p>
          </div>
          <p>Result: </p>
          <div className="resultline">
            <p className="mainResult">
              결과 : <p className="result">{result}</p>
            </p>
          </div>
          <p>
            QR 이미지 :
            <div className="qrcode">
              {qrCodeImage && <SVG text={qrCodeImage} />}
            </div>
          </p>
          <div>
            <p>남은 횟수 : {points} </p>
            <button onClick={copyToClipboard}>클립 보드에 주소 복사 </button>
          </div>
        </div>

        <div className="mainHistory">
          <p>URL 변경 HISTORY</p>
          <ol>
            {URL_HISTORY.map((list: UrlHistoryItem) => (
              <li className="urlLists" key={list.id}>
                {list.before} to {list.after}
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
