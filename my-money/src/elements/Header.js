import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const Header = () => {
  const [logado, setLogado] = useState(false);
  const logout = () => {
    localStorage.removeItem("token");
    setLogado(false);
    window.location.reload();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogado(true);
    } else {
      setLogado(false);
    }
  });

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <a href="/" className="navbar-brand">
          MyMoney
        </a>
        {logado && (
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <button type="button" onClick={logout} className="btn nav-link">
                Sair
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
