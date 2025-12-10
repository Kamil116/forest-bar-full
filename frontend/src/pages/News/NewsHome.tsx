import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import {
    Box,
    Flex,
    Stack,
    Title,
    useMantineTheme,
    Image,
    Text,
    Card,
    ScrollArea,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { mockNews } from '@/data/mockNews';

export default function NewsHome() {
    const theme = useMantineTheme();
    const navigate = useNavigate();
    const latestNews = mockNews[0];

    return (
        <Stack h="100vh" gap={0}>
            <Header />
            <Flex
                bg={theme.other.cardBackground}
                h="100%"
                justify="center"
                align="stretch"
                p="md"
                gap="md"
                style={{ flex: 1, minHeight: 0 }}
            >
                <Box w="60%" h="100%">
                    <Stack h="100%" gap="md">
                        <Title c="white" fw={400} fz={36}>
                            Последняя новость
                        </Title>
                        <Image
                            src={latestNews.image}
                            height={300}
                            radius="md"
                            fit="cover"
                        />
                        <ScrollArea style={{ flex: 1, minHeight: 0 }}>
                            <Stack pr="md">
                                <Text c="white" ta="right" fz={24}>
                                    {latestNews.date}
                                </Text>
                                <Title c={theme.other.customYellow} fz={48}>
                                    {latestNews.title}
                                </Title>
                                {latestNews.content && (
                                    <Text c="white" fz={24} lh={1.6}>
                                        {latestNews.content}
                                    </Text>
                                )}
                            </Stack>
                        </ScrollArea>
                    </Stack>
                </Box>
                <Box w="35%" h="100%">
                    <Stack gap="md" h="100%">
                        <Title c="white" fw={400} fz={32}>
                            Все новости
                        </Title>
                        <ScrollArea style={{ flex: 1, minHeight: 0 }}>
                            <Stack gap="sm">
                                {mockNews.map((item) => (
                                    <Card
                                        key={item.id}
                                        p={0}
                                        radius="md"
                                        style={{
                                            cursor: 'pointer',
                                            overflow: 'hidden',
                                        }}
                                        onClick={() =>
                                            navigate(`/news/${item.id}`)
                                        }
                                        bg={theme.other.darkBackground}
                                    >
                                        <Box pos="relative">
                                            <Image
                                                src={item.image}
                                                height={120}
                                                fit="cover"
                                            />
                                            <Text
                                                c="white"
                                                fz={24}
                                                pos="absolute"
                                                top={8}
                                                right={8}
                                            >
                                                {item.date}
                                            </Text>
                                            <Box
                                                pos="absolute"
                                                bottom={0}
                                                left={0}
                                                right={0}
                                                p="xs"
                                                style={{
                                                    background:
                                                        'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                                                }}
                                            >
                                                <Text c="white" fz={24}>
                                                    {item.title}
                                                </Text>
                                            </Box>
                                        </Box>
                                    </Card>
                                ))}
                            </Stack>
                        </ScrollArea>
                    </Stack>
                </Box>
            </Flex>
            <Footer />
        </Stack>
    );
}
