import React, { useEffect, useState } from "react";
import classes from "./foodPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { getById } from "../../services/foodService";
import StarRating from "../../components/StarRating/StarRating";
import Tags from "../../components/Tags/Tags";
import Price from "../../components/Price/Price";
import { useCart } from "../../hooks/useCart";
import NotFound from "../../components/NotFound/NotFound";

export default function FoodPage() {
  const [food, setFood] = useState({});
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(food);
    navigate("/cart");
  };

  useEffect(() => {
    getById(id).then(setFood);
  }, [id]);
  return (
    <>
      {!food ? (
        <NotFound
          message="Artikl nije raspoloživ!"
          linkText="Povratak na početnu stranicu"
        />
      ) : (
        <div className={classes.container}>
          <img
            className={classes.image}
            src={`/foods/${food.imageUrl}`}
            alt={food.name}
          />

          <div className={classes.details}>
            <div className={classes.header}>
              <span className={classes.name}>{food.name}</span>
              <span
                className={`${classes.favorite} ${
                  food.favorite ? "" : classes.not
                }`}
              >
                ❤️
              </span>
            </div>

            {/*Prikaz ocjene hrane*/}
            <div className={classes.rating}>
              <StarRating stars={food.stars} size={25} />
            </div>

            {/*Prikaz sastojaka pojedine hrane iz data.js*/}
            <div className={classes.ingredients}>
              {food.ingredients?.map((ingredient) => (
                <span key={ingredient}>{ingredient}</span>
              ))}
            </div>

            {/*Obrazložiti -> tagovi su objekti i stringovi...*/}
            <div className={classes.tags}>
              {food.tags && (
                <Tags
                  tags={food.tags.map((tag) => ({ name: tag }))}
                  forFoodPage={true}
                />
              )}
            </div>

            {/*Prikaz vremena pripreme hrane iz data.js*/}
            <div className={classes.cook_time}>
              <span>
                Vrijeme pripreme oko <strong>{food.cookTime}</strong>
              </span>
            </div>

            {/*Prikaz cijene iz komponente*/}
            <div className={classes.price}>
              <Price price={food.price} />
            </div>

            <button onClick={handleAddToCart}>Dodaj u košaricu</button>
          </div>
        </div>
      )}
    </>
  );
}
