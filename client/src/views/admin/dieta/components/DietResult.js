import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, Text } from "@chakra-ui/react";

export default function DietResult({ isOpen, onClose, resultado }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Dieta gerada por IA</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Box p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
            {resultado ? (
              <>
                <Text fontWeight="bold" mb={2}>Sugestão de dieta:</Text>
                <Text whiteSpace="pre-line">{resultado}</Text>
              </>
            ) : (
              <Text color="gray.500">Nenhum resultado disponível.</Text>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
