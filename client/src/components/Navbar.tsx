import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { toggleLang } = useLanguage();
  const { toggleTheme } = useTheme();

  return (
    <nav>
      <Link to="/">UniSwap</Link>
      <Link to="/browse">Browse</Link>
      <Link to="/requests">Requests</Link>
      {user ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
      <button onClick={toggleLang}>AR/EN</button>
      <button onClick={toggleTheme}>🌓</button>
    </nav>
  );
};

export default Navbar;
