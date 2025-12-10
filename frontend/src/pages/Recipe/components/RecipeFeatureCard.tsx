import { Image, Stack, Text } from '@mantine/core';

interface RecipeFeatureCardProps {
    label: string;
    imageSrc: string;
}

export function RecipeFeatureCard({ label, imageSrc }: RecipeFeatureCardProps) {
    return (
        <Stack gap="sm" align="center">
            <Image
                src={imageSrc}
                alt={label}
                style={{
                    width: 'clamp(60px, 10vw, 160px)',
                    height: 'clamp(60px, 10vw, 160px)',
                    maxWidth: '100%',
                    objectFit: 'contain',
                }}
            />
            <Text c="rgba(139, 69, 19, 1)" fw={700} ta="center" fz={{ base: 14, sm: 18, md: 22, lg: 28, xl: 32 }}>
                {label}
            </Text>
        </Stack>
    );
}

