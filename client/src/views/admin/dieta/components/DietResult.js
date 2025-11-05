import { Button, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, Text } from "@chakra-ui/react";

export default function DietResult({ isOpen, onClose, resultado }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Dieta gerada por IA</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Box p={2} borderWidth="1px" borderRadius="md" bg="gray.50">
            {resultado ? (
              <>
                <Text whiteSpace="pre-line">{resultado}</Text>
              </>
            ) : (
              <Text color="gray.500">Nenhum resultado disponível.</Text>
            )}
          </Box>
          <Box mt={4}>
            <HStack spacing={210}> 
                <Button 
                    colorScheme="teal"
                    type="submit"
                    >
                Salvar
                </Button>

                <Button 
                    colorScheme="red" 
                    type="button"
                    onClick={onClose}>
                Gerar outra dieta
                </Button>
            </HStack>
        </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
