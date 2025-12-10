import { useState } from 'react';
import { Box, Container, Stack, useMantineTheme } from '@mantine/core';
import {
    RecipeTitleCards,
    RecipeFeaturesBanner,
    RecipeBannerBackground,
} from './components';
import { recipes } from './data/recipes';

export default function Recipe() {
    const theme = useMantineTheme();
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentRecipe = recipes[currentIndex];

    const handlePrevious = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? recipes.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev === recipes.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <Box
            bg={theme.other.cardBackground}
            style={{
                position: 'relative',
                overflow: 'hidden',
                paddingTop: 'clamp(1rem, 3vh, 2rem)',
                paddingBottom: 'clamp(1rem, 3vh, 2rem)',
            }}
        >
            <Container
                size="xl"
                px={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }}
                py={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }}
                style={{ position: 'relative', zIndex: 1 }}
            >
                <Stack 
                    gap="md"
                    align="center" 
                    justify="center" 
                >
                    <RecipeTitleCards
                        mainTitle={currentRecipe.mainTitle}
                        subTitle={currentRecipe.subTitle}
                    />
                    <RecipeFeaturesBanner
                        description={currentRecipe.description}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                        backgroundComponent={
                            (currentRecipe.subTitle.toLowerCase().includes('мёд') || currentRecipe.subTitle.toLowerCase().includes('мед')) 
                                ? <RecipeBannerBackground imageUrl={`${import.meta.env.BASE_URL}/images/honey-bg.png`} />
                                : undefined
                        }
                        features={currentRecipe.features}
                    />
                </Stack>
            </Container>
        </Box>
    );
}
