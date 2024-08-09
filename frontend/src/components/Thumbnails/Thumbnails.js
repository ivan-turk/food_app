import React from "react";
import classes from "./thumbnails.module.css";
import { Link } from "react-router-dom";
import StarRating from "../StarRating/StarRating";
export default function Thumbnails({ foods }) {
  return (
    <ul className={classes.list}>
      {foods.map((food) => (
        <li key={food.id}>
          <Link to={`/food/${food.id}`}>
            <img
              className={classes.image}
              src={`/foods/${food.imageUrl}`}
              alt={food.name}
            />
          </Link>
          <div className={classes.content}>
            <div className={classes.name}>{food.name}</div>
            <span
              className={`${classes.favorite} ${
                food.favorite ? "" : classes.not
              }`}
            >
              ❤
            </span>
            <div className={classes.stars}>
              <StarRating stars={food.stars} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
