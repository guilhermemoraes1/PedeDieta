import React from "react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  useColorModeValue,
  Text,
  Stack,
  Radio,
  RadioGroup,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import { Form, Field, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";

export default function FormNutricional() {
  const cardBg = useColorModeValue('white', 'navy.700'); // mesma cor escura usada em Card

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [resultado, setResultado] = useState(null);

  const validationSchema = Yup.object({
    idade: Yup.number()
      .typeError("Idade deve ser um número")
      .required("Idade é obrigatória"),
    peso: Yup.number()
      .typeError("Peso deve ser um número")
      .required("Peso é obrigatório"),
    altura: Yup.number()
      .typeError("Altura deve ser um número")
      .required("Altura é obrigatória"),
    sexo: Yup.string()
      .oneOf(["masculino", "feminino"], "Selecione um sexo válido")
      .required("Sexo é obrigatório"),
    atividadeFisica: Yup.string()
      .oneOf(["sedentario", "leve", "moderada", "intensa"], "Selecione um nível de atividade válido")
      .required("Atividade física é obrigatória"),
    objetivo: Yup.string()
      .oneOf(["perder", "manter", "ganhar"], "Selecione um objetivo válido")
      .required("Objetivo é obrigatório")
  });


  const initialValues = {
    idade: "",
    peso: "",
    altura: "",
    sexo: "",
    atividadeFisica: "",
    objetivo: ""
  };

  const onSubmit = async (values, actions) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/calculo", values);

      setResultado(response.data);   // <-- guarda os dados
      onOpen();                       // <-- abre o modal

      actions.resetForm();
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      alert("Ocorreu um erro ao enviar o formulário.");
    } finally {
      actions.setSubmitting(false);
    }
  };



  return (

    <Box bg={cardBg} p={6} rounded="lg" shadow="md" w="full">
      <Text fontSize="xl" mb={4}>
        Calcular gasto calórico diário
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <Field name="sexo">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.sexo && form.touched.sexo} mt={4}>
                  <FormLabel htmlFor="sexo">Sexo</FormLabel>
                  <RadioGroup
                    id="sexo"
                    onChange={(value) => form.setFieldValue("sexo", value)}
                    value={field.value}
                  >
                    <Stack direction="row">
                      <Radio value="masculino">Masculino</Radio>
                      <Radio value="feminino">Feminino</Radio>
                    </Stack>
                  </RadioGroup>
                  <FormErrorMessage>{form.errors.sexo}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <br></br>

            <Field name="idade">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.idade && form.touched.idade}>
                  <FormLabel htmlFor="idade">Idade</FormLabel>
                  <Input {...field} id="idade" placeholder="Idade" />
                  <FormErrorMessage>{form.errors.idade}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="peso">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.peso && form.touched.peso} mt={4}>
                  <FormLabel htmlFor="peso">Peso</FormLabel>
                  <Input {...field} id="peso" placeholder="Peso" />
                  <FormErrorMessage>{form.errors.peso}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="altura">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.altura && form.touched.altura} mt={4}>
                  <FormLabel htmlFor="altura">Altura</FormLabel>
                  <Input {...field} id="altura" placeholder="Altura" />
                  <FormErrorMessage>{form.errors.altura}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="atividadeFisica">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.atividadeFisica && form.touched.atividadeFisica} mt={4}>
                  <FormLabel htmlFor="atividadeFisica">Atividade Física</FormLabel>
                  <Select
                    id="atividadeFisica"
                    placeholder="Selecione uma opção"
                    {...field}
                    onChange={(e) => form.setFieldValue("atividadeFisica", e.target.value)}
                  >
                    <option value="sedentario">Sedentário (nenhuma atividade)</option>
                    <option value="leve">Atividade Leve (1-2 dias/semana)</option>
                    <option value="moderada">Atividade Moderada (3-5 dias/semana)</option>
                    <option value="intensa">Atividade Intensa (6-7 dias/semana)</option>
                  </Select>
                  <FormErrorMessage>{form.errors.atividadeFisica}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="objetivo">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.objetivo && form.touched.objetivo} mt={4}>
                  <FormLabel htmlFor="objetivo">Objetivo</FormLabel>
                  <RadioGroup
                    id="objetivo"
                    onChange={(value) => form.setFieldValue("objetivo", value)}
                    value={field.value}
                  >
                    <Stack direction="row">
                      <Radio value="perder">Perder peso</Radio>
                      <Radio value="manter">Manter peso</Radio>
                      <Radio value="ganhar">Ganhar peso</Radio>
                    </Stack>
                  </RadioGroup>
                  <FormErrorMessage>{form.errors.objetivo}</FormErrorMessage>
                </FormControl>
              )}
            </Field>



            <Button
              mt={6}
              colorScheme="teal"
              isLoading={formik.isSubmitting}
              type="submit"
            >
              Calcular
            </Button>
          </Form>
        )}
      </Formik>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Resultado do Cálculo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {resultado && (
              <Box>
                <Text><strong>Gasto Calórico Diário:</strong> {resultado.gasto_calorico} kcal</Text>
                <Text><strong>TMB (Taxa Metabólica Basal):</strong> {resultado.tmb} kcal</Text>
                <Text><strong>Objetivo:</strong> {resultado.objetivo}</Text>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

    </Box>
  );
}
