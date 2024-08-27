import React from "react";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createOrder } from "../../services/orderService";
import classes from "./checkoutPage.module.css";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import OrderItemsList from "../../components/OrderItemsList/OrderItemsList";

export default function CheckoutPage() {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState({ ...cart });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = async (data) => {
    if (!order.addressLatLng) {
      toast.warning("Molimo odaberite vašu lokaciju na karti!");
      return;
    }

    await createOrder({ ...order, name: data.name, address: data.address });
    navigate("/payment");
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className={classes.container}>
        <div className={classes.content}>
          <Title title="Narudžba odabranih artikala" fontSize="1.6rem" />
          <div className={classes.inputs}>
            <Input
              defaultValue={user.name}
              label="Ime"
              {...register("name")}
              error={errors.name}
            />
            <Input
              defaultValue={user.address}
              label="Adresa"
              {...register("address")}
              error={errors.address}
            />
          </div>
          <OrderItemsList order={order} />
        </div>

        <div>
          <Title title="Izaberite vašu lokaciju za dostavu" fontSize="1.6rem" />
        </div>

        <div className={classes.buttons_container}>
          <div className={classes.buttons}>
            <Button
              type="submit"
              text="Idi na naplatu"
              width="100%"
              height="3rem"
            />
          </div>
        </div>
      </form>
    </>
  );
}
