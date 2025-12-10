import { Title, useMantineTheme, Box, Stack } from "@mantine/core";
import Header from "@/components/shared/Header";
import ProductCards from "@/components/Catalog/ProductCards";

function Catalog() {
    const theme = useMantineTheme();
    return (
        <Box mih="100vh" bg={theme.other.cardBackground}>
            <Stack align="center" pb="xl">
                <Header />
                <Title fw={700} fz={64} tt="uppercase" c="white" py={40}>
                    Каталог
                </Title>
                <ProductCards />
            </Stack>
        </Box>
    );
}

export default Catalog;