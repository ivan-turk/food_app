import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Title";
import classes from "./registerPage.module.css";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function RegisterPage() {
  const auth = useAuth();
  const { user } = auth;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");

  //redictering korisnika ako je već logiran u sustav na homepage
  useEffect(() => {
    if (!user) return;
    returnUrl ? navigate(returnUrl) : navigate("/");
  }, [user]);

  //________________________________________________________________

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    await auth.register(data);
  };

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
