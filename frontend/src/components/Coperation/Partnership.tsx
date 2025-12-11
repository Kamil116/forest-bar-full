import {
    Box,
    Text,
    Stack,
    TextInput,
    Textarea,
    Button,
    Group,
    Image,
    useMantineTheme,
} from '@mantine/core';
import styles from './Partnership.module.css';

function Partnership() {
    const theme = useMantineTheme();
    return (
        <Box px={{ base: 'xs', md: 'md' }} py={{ base: 'md', md: 'xl' }}>
            <Box className={styles.container}>
                <Box className={styles.formContainer}>
                    <Text
                        ta="center"
                        fw={700}
                        c="white"
                        mb={{ base: 'md', md: 'xl' }}
                        tt="uppercase"
                        fz={{ base: 18, sm: 24, md: 28, lg: 32 }}
                        px={{ base: 'xs', md: 0 }}
                    >
                        Заполни анкету на партнерство и стань частью коллектива
                    </Text>

                    <Group 
                        align="flex-start" 
                        gap="md" 
                        grow
                        wrap="wrap"
                    >
                        <Stack gap="lg" align="center" style={{ flex: 1, minWidth: '280px' }}>
                            <TextInput
                                placeholder="Имя и фамилия"
                                tt="uppercase"
                                size="lg"
                                radius={theme.other.buttonRadius}
                                w="100%"
                                classNames={{ input: styles.input }}
                            />
                            <TextInput
                                placeholder="Email"
                                tt="uppercase"
                                size="lg"
                                w="100%"
                                radius={theme.other.buttonRadius}
                                classNames={{ input: styles.input }}
                            />
                            <TextInput
                                placeholder="Телефон"
                                tt="uppercase"
                                size="lg"
                                radius={theme.other.buttonRadius}
                                w="100%"
                                classNames={{ input: styles.input }}
                            />
                            <Button
                                size="xl"
                                radius={theme.other.buttonRadius}
                                fz={{ base: 16, md: theme.other.buttonSize }}
                                fw={600}
                                mt="lg"
                                w={{ base: '100%', md: '80%' }}
                                bg={theme.other.successGreen}
                                c="black"
                            >
                                Отправить
                            </Button>
                        </Stack>

                        <Textarea
                            placeholder="Сопроводительное письмо/Анкета"
                            autosize
                            minRows={8}
                            maxRows={12}
                            tt="uppercase"
                            size="lg"
                            radius={theme.other.buttonRadius}
                            classNames={{ input: styles.input }}
                            style={{ flex: 1, minWidth: '280px' }}
                        />
                    </Group>
                </Box>

                <Image
                    src={`/images/dawd.png`}
                    alt="Partnership"
                    className={styles.image}
                    fit="cover"
                />
            </Box>
        </Box>
    );
}

export default Partnership;
