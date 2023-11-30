import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const name = localStorage.getItem("nickname");
  const handleLogout = () => {
    const isLogoutConfirmed = window.confirm("로그아웃 하시겠습니까?");

    if (isLogoutConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("id");
      localStorage.removeItem("is_admin");
      localStorage.removeItem("name");
      localStorage.removeItem("userName");
      localStorage.removeItem("profile_image");

      navigate("/");
    }
    return (
      <>
        <div className="nav">
          <div className="wrapper">
            <div>
              <img
                className="logo link"
                alt="logoimg"
                src="/img/gitcat.png"
                onClick={() => navigate("/")}
              />
            </div>

            <ul className="headerText">
              {isLoggedIn ? (
                <>
                  <li>
                    <p>{name} 님</p>
                  </li>
                  <li>
                    <button className="link" onClick={handleLogout}>
                      로그아웃
                    </button>
                  </li>
                  <li>
                    <button
                      className="link"
                      onClick={() => navigate("/mypage")}
                    >
                      마이페이지
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/signup">
                      <button>회원가입</button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/login">
                      <button>로그인</button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </>
    );
  };
}
