import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import {
    Stack,
    Box,
    Title,
    Text,
    Image,
    useMantineTheme,
    Button,
    Center,
} from '@mantine/core';
import { mockNews } from '@/data/mockNews';
import { IconArrowLeft } from '@tabler/icons-react';

export default function NewsPage() {
    const { id } = useParams<{ id: string }>();
    const theme = useMantineTheme();
    const navigate = useNavigate();

    const newsItem = mockNews.find(
        (item) => item.id === Number.parseInt(id || '0', 10)
    );

    if (!newsItem) {
        return (
            <Stack h="100vh" gap={0}>
                <Header />
                <Box
                    style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: theme.other.cardBackground,
                    }}
                >
                    <Stack align="center" gap="md">
                        <Title c="white" fw={400} fz={32}>
                            Новость не найдена
                        </Title>
                        <Button
                            onClick={() => navigate('/news')}
                            leftSection={<IconArrowLeft size={16} />}
                        >
                            Вернуться к новостям
                        </Button>
                    </Stack>
                </Box>
                <Footer />
            </Stack>
        );
    }

    return (
        <Stack h="100vh" gap={0}>
            <Header />
            <Center bg={theme.other.cardBackground}>
                <Box
                    w={{ base: '95%', sm: '90%', md: '800px', lg: '900px' }}
                    py="xl"
                >
                    <Button
                        variant="subtle"
                        color="gray"
                        onClick={() => navigate('/news')}
                        leftSection={<IconArrowLeft size={24} />}
                        fz={24}
                        mb="xl"
                        style={{ color: 'white' }}
                    >
                        Вернуться к новостям
                    </Button>

                    <Stack gap="lg">
                        <Image
                            src={newsItem.image}
                            height={400}
                            radius="lg"
                            style={{ objectFit: 'cover' }}
                        />

                        <Text c="white" ta="right" fz={18}>
                            {newsItem.date}
                        </Text>

                        <Title c={theme.other.customYellow} fz={48}>
                            {newsItem.title}
                        </Title>

                        {newsItem.content && (
                            <Text c="white" fz={24}>
                                {newsItem.content}
                            </Text>
                        )}
                    </Stack>
                </Box>
            </Center>
            <Footer />
        </Stack>
    );
}
