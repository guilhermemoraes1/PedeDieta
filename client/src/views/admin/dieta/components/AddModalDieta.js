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

const schemaDieta = Yup.object().shape({
    calorias_diarias: Yup.string()
        .trim()
        .min(3)
        .max(6)
        .required("Campo obrigatório"),
});

export default function AddModal({  isOpen, onClose, handleSubmit }) {
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
            initialValues={{ 
                calorias_diarias: '', 
            }}
            validationSchema={schemaDieta}
            onSubmit={(values, actions) => {
                handleSubmit(values,actions)
                onClose()     
            }}
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
