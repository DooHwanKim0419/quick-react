import { useNavigate } from "react-router-dom";
import {
  signInWithGoogle,
  googleSignOut,
  useAuthState,
} from "../utilities/Firebase";
import "../App.css";

const NavigationBar = () => {
  const navigate = useNavigate();
  const user = useAuthState();

  const handleSignOut = () => {
    googleSignOut();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark custom-navbar">
      <a className="navbar-brand" onClick={() => navigate("/")}>
        Navbar
      </a>
      <div className="navbar-nav">
        {user ? (
          <a className="nav-item nav-link" onClick={() => handleSignOut()}>
            SignOut
          </a>
        ) : (
          <a className="nav-item nav-link" onClick={signInWithGoogle}>
            SignIn
          </a>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
