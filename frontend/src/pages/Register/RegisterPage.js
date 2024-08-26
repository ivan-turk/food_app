import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Title";
import classes from "./registerPage.module.css";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function RegisterPage() {
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {};

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Registracija" />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            type="text"
            label="Ime"
            {...register("name", {
              required: true,
              minLength: 3,
            })}
            error={errors.name}
          />

          <Input
            type="email"
            label="E-mail adresa"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                message: "Email adresa nije ispravna",
              },
            })}
            error={errors.email}
          />

          <Input
            type="password"
            label="Lozinka"
            {...register("password", {
              required: true,
              minLength: 5,
            })}
            error={errors.password}
          />

          <Input
            type="password"
            label="Potvrdi lozinku"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value !== getValues("password") ? "Lozinke nisu iste!" : true,
            })}
            error={errors.confirmPassword}
          />

          <Input
            type="text"
            label="Adresa"
            {...register("address", {
              required: true,
              minLength: 5,
            })}
            error={errors.address}
          />

          <Button type="submit" text="Registriraj se" />

          <div className={classes.login}>
            Postojeći korisnik? &nbsp;
            <Link to={`/login${returnUrl ? "?returnUrl=" + returnUrl : ""}`}>
              Prijavi se ovdje
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
