import { Box, Button, Stack, Title, useMantineTheme } from "@mantine/core";
import Header from "@/components/shared/Header";
import { useNavigate } from "react-router-dom";


export function HomePage() {
    const theme = useMantineTheme();
    const navigate = useNavigate();
    return (
        <Box
            h="100vh"
            bg={`url(/images/home-bg.jpg) center/cover no-repeat`}
        >
            <Stack
                h="100%"
                align="center"
                justify="space-between"
                pb={{ base: 20, md: 50 }}
            >
                <Header />
                <Stack align="center" gap="md">
                    <Title 
                        fw={400} 
                        order={1} 
                        fz={{ base: 56, sm: 56, md: 80, lg: 120 }} 
                        tt="uppercase" 
                        c="white"
                        ta="center"
                    >
                        богатства природы
                    </Title>
                    <Title 
                        fw={400} 
                        order={2} 
                        fz={{ base: 28, sm: 44, md: 64, lg: 96 }} 
                        tt="uppercase" 
                        c="rgb(255, 255, 255, 0.74)"
                        ta="center"
                    >
                        как часть жизни
                    </Title>
                </Stack>

                <Button
                    size="xl"
                    fz={{ base: 20, sm: 28, md: 36, lg: 40 }}
                    fw={400}
                    color="rgba(56, 52, 52, 0.53)"
                    radius={theme.other.buttonRadius}
                    style={{ width: 'clamp(200px, 25%, 300px)' }}
                    onClick={() => navigate('/catalog')}
                >
                    Каталог
                </Button>
            </Stack>

        </Box>
    );
}
