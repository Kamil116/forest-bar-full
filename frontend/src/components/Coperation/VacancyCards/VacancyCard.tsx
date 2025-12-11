import React from 'react';
import {
    Badge,
    Button,
    Divider,
    Container,
    Stack,
    Text,
    Title,
    useMantineTheme,
    Modal,
    Group,
    Box,
    CloseButton,
    Image,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Vacancy } from '@/types/vacancy';

function VacancyCard({ job }: { job: Vacancy }) {
    const theme = useMantineTheme();
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <Container
            size="sm"
            bg={theme.other.darkBackground}
            py={{ base: 'xs', md: 'md' }}
            px={{ base: 'xs', md: 'md' }}
            style={{ 
                borderRadius: theme.other.cardRadius,
                minWidth: 'clamp(180px, 35vw, 400px)',
                maxWidth: 'clamp(180px, 35vw, 400px)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Stack align="center" gap="md" style={{ flex: 1, justifyContent: 'space-between' }}>
                {/* Заголовок и город */}
                <Stack gap={0} align="center">
                    <Title
                        order={2}
                        fz={{ base: 24, sm: 28, md: 32, lg: 36 }}
                        fw={400}
                        tt="uppercase"
                        c={theme.other.customOrange}
                        ta="center"
                    >
                        {job.title}
                    </Title>
                    <Text 
                        fz={{ base: 14, sm: 18, md: 22, lg: 24 }} 
                        c="rgba(247, 187, 26, 0.6)"
                        ta="center"
                    >
                        {job.city}
                    </Text>
                </Stack>

                {/* Разделитель */}
                <Divider
                    size={2}
                    color={theme.other.customOrange}
                    w="80%"
                    mx="auto"
                />

                {/* Условия */}
                <Stack w="90%" gap="sm" style={{ flex: 1, justifyContent: 'flex-start' }}>
                    {job.additional_conditions?.map((condition, index) => (
                        <Badge
                            key={index}
                            bg={theme.other.cardBackground}
                            py='xs'
                            radius="lg"
                            size="lg"
                            c={theme.other.customOrange}
                            fz={{ base: 12, sm: 14, md: 18, lg: 24 }}
                            fullWidth
                            h='100%'
                            styles={{
                                label: {
                                    wordBreak: 'break-word',
                                    whiteSpace: 'normal',
                                }
                            }}
                        >
                            {condition}
                        </Badge>
                    ))}
                </Stack>

                <Button
                    mt="auto"
                    color={theme.other.customOrange}
                    radius={theme.other.buttonRadius}
                    fz={{ base: 14, sm: 18, md: theme.other.buttonSize }}
                    fw={500}
                    px={{ base: 'md', md: 'xl' }}
                    w="fit-content"
                    size="md"
                    onClick={open}
                >
                    Подробнее
                </Button>

                <Modal
                    opened={opened}
                    onClose={close}
                    centered
                    size="auto"
                    withCloseButton={false}
                    styles={{
                        content: {
                            backgroundColor: 'rgba(212, 167, 59, 1)',
                            borderRadius: '25px',
                        },
                        body: {
                            padding: 0,
                        },
                    }}
                    overlayProps={{
                        backgroundOpacity: 0.55,
                        blur: 3,
                    }}
                >
                    <Box bg="rgba(212, 167, 59, 1)" p={{ base: 'md', md: 'xl' }}>
                        <Group justify="space-between" align="flex-start" wrap="wrap" gap="md">
                            <Group gap="md" wrap="wrap" style={{ flex: 1, minWidth: 0 }}>
                                <Image
                                    src={`/images/beehive.svg`}
                                    alt="Beehive icon"
                                    w={{ base: 40, md: 60 }}
                                    h={{ base: 40, md: 60 }}
                                />
                                <Text 
                                    c="black" 
                                    fz={{ base: 14, sm: 18, md: 24, lg: 32 }} 
                                    fw={700}
                                    style={{ flex: 1, minWidth: 0 }}
                                >
                                    Компания «Forest bar» с радостью объявляет
                                    о наборе энергичных и амбициозных
                                    сотрудников. Мы стремимся создать
                                    уникальную сеть розничных продаж
                                    экологических сладостей без сахара, и
                                    приглашаем вас стать частью этой команды.
                                </Text>
                            </Group>
                            <CloseButton
                                onClick={close}
                                size="lg"
                                c="rgba(92, 61, 46, 1)"
                            />
                        </Group>
                    </Box>

                    <Box
                        bg="rgba(92, 61, 46, 1)"
                        p={{ base: 'md', md: 'xl' }}
                        ml={{ base: 'xs', md: '2rem' }}
                        mr={{ base: 'xs', md: '2rem' }}
                        style={{
                            borderRadius: '14px',
                            maxHeight: '60vh',
                            overflowY: 'auto',
                        }}
                    >
                        <Stack gap="md">
                            <Text 
                                fz={{ base: 16, sm: 20, md: 24, lg: 28 }} 
                                fw={700} 
                                c="white" 
                                ta="center"
                            >
                                Мы ищем активных специалистов, которые готовы к
                                постоянному развитию и самореализации. Наша
                                должность — продавец эко-вкусняшек. Нам нужны
                                сотрудники в такие города, как:
                            </Text>

                            <Text
                                fz={{ base: 14, sm: 18, md: 20, lg: 24 }}
                                fw={700}
                                c="rgba(210, 160, 26, 1)"
                                ta="center"
                                style={{ wordBreak: 'break-word' }}
                            >
                                ОРЕНБУРГ, НИЖНИЙ НОВГОРОД, МАГНИТОГОРСК,
                                ИВАНОВО, ИЖЕВСК, КИРОВ, ТОЛЬЯТТИ, ТОМСК,
                                НОВОСИБИРСК , НОВОРОССИЙСК
                            </Text>

                            <Group gap="xs" wrap="wrap">
                                <Box
                                    w={{ base: 20, md: 24 }}
                                    h={{ base: 20, md: 24 }}
                                    bg="white"
                                    style={{ borderRadius: '4px', flexShrink: 0 }}
                                >
                                    <Text
                                        fz={{ base: 12, md: 16 }}
                                        c="rgba(92, 61, 46, 1)"
                                        ta="center"
                                        fw={700}
                                    >
                                        ✓
                                    </Text>
                                </Box>
                                <Text 
                                    fz={{ base: 14, sm: 18, md: 24, lg: 32 }} 
                                    c="white"
                                    style={{ flex: 1, minWidth: 0 }}
                                >
                                    Заработная плата в нашей компании
                                    составляет от <strong>80 000</strong> до{' '}
                                    <strong>200 000</strong> рублей в месяц.
                                </Text>
                            </Group>

                            <Group gap="xs" wrap="wrap">
                                <Box
                                    w={{ base: 20, md: 24 }}
                                    h={{ base: 20, md: 24 }}
                                    bg="white"
                                    style={{ borderRadius: '4px', flexShrink: 0 }}
                                >
                                    <Text
                                        fz={{ base: 12, md: 16 }}
                                        c="rgba(92, 61, 46, 1)"
                                        ta="center"
                                        fw={700}
                                    >
                                        ✓
                                    </Text>
                                </Box>
                                <Text 
                                    fz={{ base: 14, sm: 18, md: 24, lg: 32 }} 
                                    c="white"
                                    style={{ flex: 1, minWidth: 0 }}
                                >
                                    Доход при графике 5/2{' '}
                                    <strong>45000</strong> и 6/1{' '}
                                    <strong>50000</strong> + % от продаж, в
                                    среднем от <strong>80 000 ₽</strong> и
                                    выше, плюс премии и надбавки за стаж.
                                </Text>
                            </Group>
                        </Stack>
                    </Box>
                    <Stack gap="sm" p={{ base: 'md', md: 'xl' }}>
                        <Text 
                            fz={{ base: 16, sm: 20, md: 24, lg: 32 }} 
                            c="white" 
                            fw={700} 
                            ta="center"
                        >
                            Для записи на собеседование звони по номеру
                            телефона
                        </Text>

                        <Text
                            fz={{ base: 24, sm: 32, md: 40, lg: 48 }}
                            fw={700}
                            c="rgba(65, 44, 40, 1)"
                            ta="center"
                        >
                            +7 902 019 23 91
                        </Text>
                    </Stack>
                </Modal>
            </Stack>
        </Container>
    );
}

export default VacancyCard;
