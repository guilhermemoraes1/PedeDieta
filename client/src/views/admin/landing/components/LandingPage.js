import { Box, Container, VStack } from '@chakra-ui/react';
import Hero from './Hero';
import AboutSection from './AboutSection';

export default function LandingPage() {
  return (
      <Container maxW="6xl" px={{ base: 4, md: 6 }}>
        <VStack spacing={12}>
          <Hero />
          <AboutSection />
        </VStack>
      </Container>
  );
}
