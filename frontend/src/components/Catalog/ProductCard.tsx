import { Stack, Image, Text, Card, Button, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Product } from "@/types/product";
import ProductInfo from "./ProductInfo";

function ProductCard({ product }: { product: Product }) {
    const theme = useMantineTheme();
    const [opened, { open, close }] = useDisclosure(false);
    
    const handleClick = () => {
        open();
    };

    return (
        <>
            <ProductInfo product={product} opened={opened} onClose={close} />
            
            <Card
                shadow="sm"
                padding="lg"
                radius="xl"
                withBorder
                style={{
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onClick={handleClick}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '';
                }}
                bg={theme.other.darkBackground}
            >
                <Card.Section>
                    <Image
                        src={product.images?.[0] ?? ''}
                        alt={product.name}
                        height={200}
                        fit="cover"
                        radius="xl"
                    />
                </Card.Section>

                <Stack gap="xs" mt="md" ta="center" justify='center' h='100%'>
                    <Text fw={500} fz={34} c='white'>{product.name}</Text>
                    <Button
                        c='black'
                        color={theme.other.customOrange}
                        radius={theme.other.buttonRadius}
                        fz={theme.other.buttonSize}
                        fw={500}
                        px="xl"
                        style={{ pointerEvents: 'none' }}
                    >
                        ₽{product.price}
                    </Button>
                </Stack>
            </Card>
        </>
    )
}

export default ProductCard; 