import React from "react";
import { useAuth } from "../../hooks/useAuth";
import classes from "./dashboard.module.css";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className={classes.container}>
      <div className={classes.menu}>
        {allItems
          .filter((item) => user.isAdmin || !item.forAdmin)
          .map((item) => (
            <Link
              key={item.title}
              to={item.url}
              style={{
                backgroundColor: item.bgColor,
                color: item.color,
              }}
              //disablane funkcionalnosti koje nisu još napravljene!!!!
              className={
                item.title === "Narudžbe - u izradi..." ||
                item.title === "Moj profil - u izradi..."
                  ? classes.disabled
                  : ""
              }
            >
              <img src={item.imageUrl} alt={item.title} />
              <h2>{item.title}</h2>
            </Link>
          ))}
      </div>
    </div>
  );
}

const allItems = [
  {
    title: "Narudžbe - u izradi...",
    imageUrl: "/icons/orders.svg",
    url: "/orders",
    bgColor: "#ec407a",
    color: "white",
  },
  {
    title: "Moj profil - u izradi...",
    imageUrl: "/icons/profile.svg",
    url: "/profile",
    bgColor: "#1565c0",
    color: "white",
  },
  {
    title: "Korisnici",
    imageUrl: "/icons/users.svg",
    url: "/admin/users",
    forAdmin: true,
    bgColor: "#00bfa5",
    color: "white",
  },
  {
    title: "Artikli",
    imageUrl: "/icons/foods.svg",
    url: "/admin/foods",
    forAdmin: true,
    bgColor: "#e040fb",
    color: "white",
  },
];
