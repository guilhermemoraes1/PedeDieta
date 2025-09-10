import React from 'react';
import FormNutricional from './components/FormNutricional';
import { Box, useColorModeValue  } from '@chakra-ui/react';

    //   <Text fontSize="md" color={textColor}>
    //     A plataforma permite cadastrar, listar, editar e remover Dietas e Usuários.
    //   </Text>

export default function Settings() {
    const cardBg = useColorModeValue('white', 'navy.700'); // mesma cor escura usada em Card

    return (
    <>
        {/* <Box 
            bg={cardBg}
            p={6}
            rounded="lg"
            shadow="md"
            w="full"
            pt={{ base: "130px", md: "80px", xl: "80px" }}
        >
            Calcule o seu gasto calórico diário
            
        </Box> */}
        <Box
            pt={{ base: "130px", md: "80px", xl: "80px" }}
        >
            <FormNutricional />
        </Box>
    </>
    );
}


