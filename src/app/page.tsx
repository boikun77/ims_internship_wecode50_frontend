import Image from "next/image";
import "./main.scss";
import { URL_HISTORY } from "/Users/boikun/Desktop/ims_internship_wecode50/src/app/data/index";
import Header from "../../components/header/header";

interface UrlHistoryItem {
  id: number;
  before: string;
  after: string;
}

const Home: React.FC = () => {
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
          />
          <button type="button">생성</button>
          <p> Output:</p>
          <div className="mainFomula">
            <p className="form1">ims.we</p>
            <p className="form1">+</p>
            <p className="form2">생성된 랜덤 난수 @</p>
          </div>
          <p>Result: </p>
          <p className="mainResult">결과 : </p>
          <p>QR 이미지 :</p>

          <div>
            <p>남은 횟수 : 10 </p>
            <button>클립 보드에 주소 복사 </button>
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
            <button className="signup">회원가입 또는 </button>
            <button className="login">로그인</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
