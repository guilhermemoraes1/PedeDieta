import { Box, Button, FormControl, 
    FormErrorMessage,  
    FormLabel,  
    HStack,  
    Input,  
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalHeader, 
    ModalOverlay, 
    } from "@chakra-ui/react";
import { Form, Field, Formik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import toast from 'react-hot-toast';

const schemaDieta = Yup.object().shape({
    calorias_diarias: Yup.string()
        .trim()
        .min(3)
        .max(6)
        .required("Campo obrigatório"),
});

export default function AddModal({  isOpen, onClose }) {
    const handleSubmit = async (values, actions) => {
        try {
            const newDieta = { caloria: values.calorias_diarias };
            const res = await axios.post('http://127.0.0.1:5000/gemini', newDieta);
            if (res.status === 201 || res.status === 200) {
            toast.success('Dieta cadastrada!');
            onClose(); // fechar modal só se sucesso
            }
        } catch (err) {
            toast.error('Erro ao cadastrar dieta.');
        } finally {
            actions.setSubmitting(false);
        }
    };


  return (
    <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        size="lg"
        scrollBehavior ={'inside'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Gerar Dieta</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>

            <Formik
            initialValues={{ calorias_diarias: '' }}
            validationSchema={schemaDieta}
            onSubmit={handleSubmit}
            >
            {(props) => (
                <Form>
                <Field name='calorias_diarias'>
                    {({ field, form }) => (
                    <FormControl isInvalid={form.errors.calorias_diarias && form.touched.calorias_diarias}>
                        <FormLabel>Calorias Diárias</FormLabel>
                        <Input {...field} placeholder='Ex: 2000' type="text"/>
                        <FormErrorMessage>{form.errors.calorias_diarias}</FormErrorMessage>
                    </FormControl>
                    )}
                </Field>
                <Box mt={4}>
                    <HStack spacing={10}> 
                        <Button 
                            colorScheme="teal"
                            type="submit"
                            isLoading={props.isSubmitting}
                            >
                        Gerar
                        </Button>

                        <Button 
                            colorScheme="red" 
                            type="button"
                            onClick={onClose}>
                        Cancelar
                        </Button>
                    </HStack>
                </Box>
                
                </Form>
            )}
            </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
