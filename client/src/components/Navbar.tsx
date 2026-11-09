import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Store, Search, Languages, Moon, Heart, Bell, MessageCircle,
  Plus, User, Settings, LogOut, Menu, X
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/browse", label: "Browse" },
  { path: "/requests", label: "Requests" },
  { path: "/about", label: "About" },
];

export const Navbar = () => {
  const { user, loading } = useContext(AuthContext);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsSidebarOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  if (loading) return <div className="loading-state">Loading...</div>;

  return (
    <>
      <div
        className={`sidebar-overlay ${isSidebarOpen ? "active" : ""}`}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      />

      <nav className="navbar">
        <div className="navbar-brand">
          <button
            className="mobile-menu-btn"
            onClick={() => setIsSidebarOpen(true)}
            aria-expanded={isSidebarOpen}
            aria-label="Open menu"
          >
            <Menu size={24} color="white" />
          </button>

          <Link to="/" className="brand-logo-container">
            <div className="logo-icon">
              <Store size={22} color="black" />
            </div>
            <span className="brand-name">UniSwap</span>
          </Link>
        </div>

        <div className="navbar-links">
          {NAV_LINKS.map((link) => (
            <Link key={link.path} to={link.path}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="navbar-search">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search for books, calculators..."
            className="search-input"
          />
        </div>

        <div className="navbar-actions">
          {/* <div className="lang-switcher hide-on-tablet">
            <Languages size={16} className="lang-icon" />
            <button className="lang-btn active">EN</button>
            <button className="lang-btn">ع</button>
          </div> */}

          <button className="action-btn hide-on-mobile" aria-label="Toggle Theme">
            <Moon size={18} />
          </button>

          <button className="action-btn badge-container hide-on-mobile">
            <Heart size={20} />
            <span className="badge">0</span>
          </button>

          <button className="action-btn badge-container hide-on-mobile">
            <Bell size={20} />
            <span className="badge">0</span>
          </button>

          <Link to="/chat">
            <button className="action-btn badge-container">
              <MessageCircle size={20} />
              <span className="badge">0</span>
            </button>
          </Link>

          <Link to="/add-item">
            <button className="add-btn">
              <Plus size={18} />
              <span className="add-text">Add Item</span>
            </button>
          </Link>

          {user && user.name ? (
            <div className="user-menu-container">
              <div 
                className="user-avatar" 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                {user.name.substring(0, 2).toUpperCase()}
              </div>

              {isUserMenuOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <strong>{user.name}</strong>
                  </div>
                  <div className="dropdown-section">
                    <Link to="/profile"><User size={16} /> Profile</Link>
                    <Link to="/settings"><Settings size={16} /> Settings</Link>
                    <Link to="/notifications"><Bell size={16} /> Notifications</Link>
                  </div>
                  <div className="dropdown-section no-border">
                    <button className="logout-btn"><LogOut size={16} /> Log out</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="credentials">
              <Link to="/login"><button className="login">Login</button></Link>
              <Link to="/register"><button className="sign-up">Sign Up</button></Link>
            </div>
          )}
        </div>
      </nav>

      <aside className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="logo-icon">
              <Store size={22} color="black" />
            </div>
            <span className="brand-name">UniSwap</span>
          </div>
          <button
            className="close-sidebar-btn"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} color="white" />
          </button>
        </div>

        <div className="sidebar-content">
          <div className="sidebar-links">
            {NAV_LINKS.map((link) => (
              <Link key={link.path} to={link.path}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="sidebar-mobile-search">
            <Search className="search-icon" size={18} />
            <input type="text" placeholder="Search..." className="search-input" />
          </div>

          {/* <div className="sidebar-lang">
            <Languages size={16} className="lang-icon" />
            <button className="lang-btn active">EN</button>
            <button className="lang-btn">ع</button>
          </div> */}
        </div>
      </aside>
    </>
  );
};