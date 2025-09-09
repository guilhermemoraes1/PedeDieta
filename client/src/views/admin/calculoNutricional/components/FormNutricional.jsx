import { useForm } from "react-hook-form";
import React from "react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button
} from "@chakra-ui/react";

export default function FormNutricional() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.idade}>
        <FormLabel htmlFor="idade">Idade</FormLabel>
        <Input
          id="idade"
          placeholder="idade"
          {...register("idade", {
            required: "This is required",
            minLength: { value: 4, message: "Minimum length should be 4" }
          })}
        />
        <FormErrorMessage>
          {errors.idade && errors.idade.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.peso}>
        <FormLabel htmlFor="idade">Peso</FormLabel>
        <Input
          id="peso"
          placeholder="peso"
          {...register("peso", {
            required: "This is required",
            minLength: { value: 4, message: "Minimum length should be 4" }
          })}
        />
        <FormErrorMessage>
          {errors.idade && errors.idade.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.altura}>
        <FormLabel htmlFor="altura">Altura</FormLabel>
        <Input
          id="altura"
          placeholder="altura"
          {...register("altura", {
            required: "This is required",
            minLength: { value: 4, message: "Minimum length should be 4" }
          })}
        />
        <FormErrorMessage>
          {errors.idade && errors.idade.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}
