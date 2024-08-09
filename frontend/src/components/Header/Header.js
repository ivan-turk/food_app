import React from "react";
import classes from "./header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  const user = {
    name: "Ivan",
  };

  const cart = {
    totalCount: 10,
  };

  const logout = () => {};

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link to="/" className={classes.logo}>
          Čevabdžinica BEHAR
        </Link>
        <nav>
          <ul>
            {user ? (
              <li className={classes.menu_container}>
                <Link to="/profile">{user.name}</Link>
                <div className={classes.menu}>
                  <Link to="/profile">Moj profil</Link>
                  <Link to="/orders">Moje narudžbe</Link>
                  <a onClick={logout}>Odjava korisnika</a>
                </div>
              </li>
            ) : (
              <Link to="/login">Prijava korisnika</Link>
            )}

            <li>
              <Link to="/cart">
                Košarica
                {cart.totalCount > 0 && (
                  <span className={classes.cart_count}>{cart.totalCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
