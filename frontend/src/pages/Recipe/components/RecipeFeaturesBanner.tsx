import { Container, Group, Stack, Text, useMantineTheme } from '@mantine/core';
import { RecipeFeatureCard } from './RecipeFeatureCard';
import { NavigationArrows } from './NavigationArrows';
import { RecipeBannerBackground } from './RecipeBannerBackground';
import classes from './RecipeFeaturesBanner.module.css';

interface RecipeFeature {
    label: string;
    imageSrc: string;
}

interface RecipeFeaturesBannerProps {
    description: string;
    onPrevious?: () => void;
    onNext?: () => void;
    backgroundComponent?: React.ReactNode;
    features?: RecipeFeature[]; // Features показываются только если переданы (не для мёда)
}

export function RecipeFeaturesBanner({ description, onPrevious, onNext, backgroundComponent, features }: RecipeFeaturesBannerProps) {
    const theme = useMantineTheme();

    return (
        <Container
            size="xl"
            mt={{ base: 'md', sm: 'lg', md: 'xl' }}
            fluid
            px={{ base: 'xs', sm: 'sm', md: 'md' }}
            className={classes.bannerContainer}
            style={{
                position: 'relative',
                borderRadius: theme.other.cardRadius,
                background: theme.other.customYellow,
            }}
        >
            <Stack gap="md" className={classes.contentWrapper}>
                {/* Text Content at Top */}
                <Stack gap="md" className={classes.contentStack}>
                <Text
                    c="white"
                    fz={{
                        base: 12,
                        sm: 16,
                        md: 20,
                        lg: 24,
                        xl: 28,
                    }}
                    fw={500}
                    ta="center"
                    px={{ base: 'xs', sm: 'sm', md: 'md' }}
                    style={{ 
                        lineHeight: 1.5,
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.5)',
                        position: 'relative',
                        zIndex: 3,
                    }}
                >
                    {description}
                </Text>

                    {/* Icons Content - показывается только если есть features (не для мёда) */}
                    {features && features.length > 0 && (
                        <Group
                            gap="lg"
                            justify="center"
                            align="center"
                            wrap="wrap"
                            mt="lg"
                            style={{ position: 'relative', zIndex: 3 }}
                        >
                            {features.map((feature, index) => (
                                <RecipeFeatureCard
                                    key={index}
                                    label={feature.label}
                                    imageSrc={feature.imageSrc}
                                />
                            ))}
                        </Group>
                    )}
                </Stack>

                {/* Background component - полноценный элемент в потоке */}
                {backgroundComponent && (
                    <div className={classes.backgroundWrapper}>
                        {backgroundComponent}
                    </div>
                )}
            </Stack>

            {/* Navigation Arrows */}
            <NavigationArrows onPrevious={onPrevious} onNext={onNext} />
        </Container>
    );
}

