import {
    Modal,
    Stack,
    Image,
    Text,
    Title,
    Box,
    Flex,
    Divider,
    useMantineTheme,
} from '@mantine/core';
import { Product } from '@/types/product';

interface ProductInfoProps {
    product: Product;
    opened: boolean;
    onClose: () => void;
}

function ProductInfo({ product, opened, onClose }: ProductInfoProps) {
    const theme = useMantineTheme();
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            centered
            size="auto"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            transitionProps={{
                transition: 'fade',
                duration: 400,
                timingFunction: 'linear',
            }}
            styles={{
                body: {
                    backgroundColor: theme.other.cardBackground,
                },
                header: {
                    backgroundColor: theme.other.cardBackground,
                },
            }}
        >
            <Flex
                gap="xl"
                direction={{ base: 'column', md: 'row' }}
                align={{ base: 'stretch', md: 'flex-start' }}
            >
                <Stack gap="md" style={{ flex: '1 1 300px' }}>
                    {product.video_url ? (
                        <Box>
                            <video
                                src={product.video_url}
                                controls
                                aria-label={`Видео товара: ${product.name}`}
                                style={{
                                    width: '100%',
                                    maxHeight: 300,
                                    borderRadius: 8,
                                }}
                            >
                                <track kind="captions" />
                            </video>
                        </Box>
                    ) : product.images && product.images.length > 0 ? (
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            height={300}
                            fit="cover"
                            radius="md"
                            styles={{
                                root: {
                                    boxShadow: `10px 10px 20px 0px ${theme.other.darkBackground}`,
                                },
                            }}
                        />
                    ) : (
                        <Box
                            h={300}
                            bg={theme.other.darkBackground}
                            style={{
                                borderRadius: theme.other.cardRadius,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text c="white" opacity={0.5}>
                                Нет изображения
                            </Text>
                        </Box>
                    )}

                    {product.product_type && (
                        <>
                            <Text
                                fw={600}
                                c={theme.other.customYellow}
                                ta="center"
                                fz={{ base: 16, sm: 18, md: 20 }}
                            >
                                {product.product_type}
                            </Text>
                            <Divider
                                color="white"
                                size="sm"
                                w="50%"
                                mx="auto"
                            />
                        </>
                    )}

                    <Stack justify="center" align="center">
                        <Text
                            fw={700}
                            c="white"
                            ta="center"
                            fz={{ base: 24, sm: 30, md: 36 }}
                        >
                            {product.price} рублей
                        </Text>
                        <Text c="white" fz={{ base: 14, sm: 16, md: 18 }}>
                            ID продавца (тут будет его номер):{' '}
                            {product.seller_id}
                        </Text>
                    </Stack>
                </Stack>

                <Stack justify="flex-start" style={{ flex: '1 1 300px' }}>
                    <Title
                        ta="center"
                        c="white"
                        fz={{ base: 32, sm: 40, md: 48 }}
                    >
                        {product.name}
                    </Title>
                    <Divider color="white" size="sm" w="50%" mx="auto" />
                    <Text
                        c="rgba(255, 255, 255, 0.73)"
                        fz={{ base: 18, sm: 20, md: 24 }}
                        style={{ lineHeight: 1.6 }}
                    >
                        {product.long_description}
                    </Text>
                    <Divider color="white" size="sm" w="50%" mx="auto" />
                </Stack>
            </Flex>
        </Modal>
    );
}

export default ProductInfo;
