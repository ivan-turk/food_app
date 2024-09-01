import React from "react";
import classes from "./header.module.css";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();

  const { cart } = useCart();

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
                <Link to="/dashboard">{user.name}</Link>
                <div className={classes.menu}>
                  <Link to="/profile">Moj profil</Link>
                  <Link to="/orders">Moje narudžbe</Link>
                  <button onClick={logout} className={classes.logout_button}>
                    Odjava korisnika
                  </button>
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
