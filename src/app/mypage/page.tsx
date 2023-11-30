"use client";
import React, { useState } from "react";
import "./mypage.scss";
import Header from "../../../components/Header/header";
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

const Mypage: React.FC = () => {
  const [showAdjustInfo, setShowAdjustInfo] = useState(false);

  const handleButtonClick = () => {
    setShowAdjustInfo(!showAdjustInfo);
  };

  return (
    <>
      <Header />
      <div className="mypageContainer">
        <p className="headerText">MY PAGE</p>
        <div className="mypageMain">
          <div className="tabSelector">
            <button className="tabButton">유저 정보</button>
            <p> | </p>
            <button className="tabButton">URL HISTORY</button>
          </div>

          <div className="userInfoWrapper">
            {USER_INFO.map((user: UserInfo) => (
              <div className="userLists" key={user.id}>
                <p> 이메일 : {user.Email}</p>
                <p> 닉네임 : {user.Nickname}</p>
                <p> 비밀번호 : {user.Password} </p>
              </div>
            ))}

            <button onClick={handleButtonClick}>정보 수정하기</button>
          </div>
          {showAdjustInfo && (
            <div className="adjustInfo">
              <p> 새로운 Email 입력 : </p>
              <input
                className="mainInput"
                type="text"
                placeholder="새로운 email 을 입력하세요"
              />

              <p> 새로운 비밀번호 입력: </p>
              <input
                className="mainInput"
                type="password"
                placeholder="새로운 비밀번호 를 입력하세요"
              />
              <button>수정 하기</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Mypage;
