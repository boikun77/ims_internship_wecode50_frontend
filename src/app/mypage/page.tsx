"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import "./mypage.scss";
import Header from "../../../components/Header/header";
import { useRouter } from "next/navigation";
import { USER_INFO } from "/Users/boikun/Desktop/ims_internship_wecode50/src/app/data/userinfo";
import { URL_HISTORY } from "/Users/boikun/Desktop/ims_internship_wecode50/src/app/data/index";

interface UserInfo {
  id: number;
  Email: string;
  Nickname: string;
  Password: string;
}

interface UrlHistoryItem {
  id: number;
  before: string;
  after: string;
}

interface UrlRecord {
  id: number;
  original_url: string;
  shortened_url: string;
  created_at: string; // 또는 날짜/시간 형식에 맞는 타입으로 변경
}

const Mypage: React.FC = () => {
  const router = useRouter();
  const [showAdjustInfo, setShowAdjustInfo] = useState(false);
  const [showUrlHistory, setShowUrlHistory] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(true);
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [id, setId] = useState("");
  const [token, setToken] = useState("");

  // 기타 상태 변수...

  console.log(token, id, email, nickname);

  const handleButtonClick = () => {
    setShowAdjustInfo(!showAdjustInfo);
  };

  const handleUserButtonClick = () => {
    setShowUserInfo(true);
    setShowUrlHistory(false);
  };

  const handleUrlHistoryButtonClick = () => {
    setShowUrlHistory(true);
    setShowUserInfo(false);
    setShowAdjustInfo(false);
  };

  const [newNickname, setNewnickname] = useState("");
  const [newPassword, setNewpassword] = useState("");
  const [urlRecord, setUrlRecord] = useState<UrlRecord[]>([]);

  const changeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNewnickname(e.target.value);
  };
  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setNewpassword(e.target.value);
  };

  const change = () => {
    fetch(`https://relative-ray-national.ngrok-free.app/user/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nickname: newNickname,
        password: newPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "User information updated successfully") {
          localStorage.clear();
          router.push("/login");
        }
      });
  };

  const quit = () => {
    const isQuitConfirmed = window.confirm("정말로 탈퇴 하시겠습니까?");

    if (isQuitConfirmed) {
      fetch(`https://relative-ray-national.ngrok-free.app/user/delete/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "User information deleted successfully") {
            localStorage.clear();
            alert("정상적으로 탈퇴 되었습니다.");
            router.push("/");
          }
        });
    }
  };

  useEffect(() => {
    // 클라이언트 사이드에서만 localStorage를 사용하도록 조건문 추가
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("email") || "";
      const storedNickname = localStorage.getItem("nickname") || "";
      const storedId = localStorage.getItem("id") || "";
      const storedToken = localStorage.getItem("token") || "";

      setEmail(storedEmail);
      setNickname(storedNickname);
      setId(storedId);
      setToken(storedToken);
    }

    // 기타 작업 수행...
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://relative-ray-national.ngrok-free.app/url",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              "ngrok-skip-browser-warning": "69420",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUrlRecord(data.urls);
          console.log(data);
        } else {
          throw new Error("Network response was not ok.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
      <Header />
      <div className="mypageContainer">
        <p className="headerText">MY PAGE</p>
        <div className="mypageMain">
          <div className="tabSelector">
            <button className="tabButton" onClick={handleUserButtonClick}>
              유저 정보
            </button>
            <p> | </p>
            <button className="tabButton" onClick={handleUrlHistoryButtonClick}>
              URL HISTORY
            </button>
          </div>

          {showUserInfo && (
            <div className="userInfoWrapper">
              <div className="userLists">
                <p> 이메일 : {email}</p>
                <p> 닉네임 : {nickname}</p>
              </div>

              <button onClick={handleButtonClick}>정보 수정하기</button>
            </div>
          )}

          {showUrlHistory && (
            <div className="urlHistoryWrapper">
              {urlRecord.map((record) => (
                <div className="urlHistoryItem" key={record.id}>
                  <p>변경 전 : {record.original_url}</p>
                  <p>변경 후: {record.shortened_url}</p>
                  <p>일시 : {record.created_at}</p>
                </div>
              ))}
            </div>
          )}

          {showAdjustInfo && (
            <div className="adjustInfo">
              <p> 새로운 닉네임 입력 : </p>
              <input
                className="mainInput"
                type="text"
                placeholder="새로운 닉네임 을 입력하세요"
                onChange={changeNickname}
              />

              <p> 새로운 비밀번호 입력: </p>
              <input
                className="mainInput"
                type="password"
                placeholder="새로운 비밀번호 를 입력하세요"
                onChange={changePassword}
              />
              <button onClick={change}>수정 하기</button>
              <button onClick={quit}>회원 탈퇴</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Mypage;
