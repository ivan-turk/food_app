import { useParams } from "react-router-dom";
import classes from "./foodEdit.module.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { add, getById, update } from "../../services/foodService";
import Title from "../../components/Title/Title";
import InputContainer from "../../components/InputContainer/InputContainer";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { uploadImage } from "../../services/uploadService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function FoodEditPage() {
  const { foodId } = useParams();
  const [imageUrl, setImageUrl] = useState();
  const isEditMode = !!foodId;

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!isEditMode) return;

    getById(foodId).then((food) => {
      if (!food) return;
      reset(food);
      setImageUrl(food.imageUrl);
    });
  }, [foodId]);

  const submit = async (foodData) => {
    const food = { ...foodData, imageUrl };

    if (isEditMode) {
      await update(food);
      toast.success(`Artikl "${food.name}" uspješno ažuriran!`);
      return;
    }

    const newFood = await add(food);
    toast.success(`Artikl "${food.name}" uspješno dodan!`);
    navigate("/admin/editFood/" + newFood.id, { replace: true });
  };

  const upload = async (event) => {
    setImageUrl(null);
    const imageUrl = await uploadImage(event);
    setImageUrl(imageUrl);
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Title title={isEditMode ? "Uredi artikl" : "Dodaj artikl"} />
        <form
          className={classes.form}
          onSubmit={handleSubmit(submit)}
          noValidate
        >
          <InputContainer label="Odabir fotografije">
            <input type="file" onChange={upload} accept="image/jpeg" />
          </InputContainer>

          {imageUrl && (
            <a href={imageUrl} className={classes.image_link} target="blank">
              <img src={imageUrl} alt="Uploaded" />
            </a>
          )}

          <Input
            type="text"
            label="Ime artikla"
            {...register("name", { required: true, minLength: 5 })}
            error={errors.name}
          />

          <Input
            type="number"
            label="Cijena"
            {...register("price", { required: true })}
            error={errors.price}
          />

          <Input
            type="text"
            label="Kategorija"
            {...register("tags")}
            error={errors.tags}
          />

          <Input
            type="text"
            label="Sastojci"
            {...register("origins", { required: true })}
            error={errors.origins}
          />

          <Input
            type="text"
            label="Vrijeme pripreme"
            {...register("cookTime", { required: true })}
            error={errors.cookTime}
          />

          <Button type="submit" text={isEditMode ? "Ažuriraj" : "Dodaj"} />
        </form>
      </div>
    </div>
  );
}
