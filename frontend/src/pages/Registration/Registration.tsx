import Header from "@/components/shared/Header";
import { Box, Button, Container, Stack, TextInput, Badge, useMantineTheme, Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import classes from "./Registration.module.css";

interface FormValues {
    phone: string;
    password: string;
    email: string;
    city: string;
}


function Registration() {
    const theme = useMantineTheme();
    const { login } = useAuth();
    const navigate = useNavigate();

    const form = useForm<FormValues>({
        initialValues: {
            phone: '',
            password: '',
            email: '',
            city: '',
        },
        validate: {
            phone: (value: string) => {
                if (!value) { return 'Номер телефона обязателен' };
                if (!/^[+]?[1-9]\d{0,15}$/.test(value.replace(/\s/g, ''))) {
                    return 'Введите корректный номер телефона';
                }

                return null;
            },
            password: (value: string) => {
                if (!value) { return 'Пароль обязателен' };
                if (value.length < 6) { return 'Пароль должен содержать минимум 6 символов' };
                return null;
            },
            email: (value: string) => {
                if (!value) { return 'Email обязателен' };
                if (!/^\S+@\S+\.\S+$/.test(value)) {
                    return 'Введите корректный email';
                }
                return null;
            },
            city: (value: string) => {
                if (!value) { return 'Город обязателен' };
                return null;
            },
        },
    });

    return (
        <Box
            h="100vh"
            bg={`url(${import.meta.env.BASE_URL}/images/auth-bg.jpg) center/cover no-repeat`}
        >
            <Stack
                h="100%"
            >
                <Header />
                <Stack
                    align="center"
                    h="100%"
                    justify="center"
                    pb={50}
                >
                    <Badge
                        size="xl"
                        bg={theme.other.cardBackground}
                        c="white"
                        tt="uppercase"
                        fz={40}
                        fw={500}
                        radius={theme.other.cardRadius}
                        p='xl'
                        px='5rem'
                    >
                        Регистрация
                    </Badge>
                    <Container size="md" px='5rem' bg={theme.other.cardBackground} py='xl' styles={{ root: { borderRadius: theme.other.cardRadius } }}>
                        <form onSubmit={form.onSubmit((values: FormValues) => {
                            // TODO: Add actual registration logic here
                            login();
                            navigate('/');
                        })}>
                            <Stack>
                                {[
                                    { name: 'phone', placeholder: 'Номер телефона' },
                                    { name: 'password', placeholder: 'Пароль', type: 'password' },
                                    { name: 'email', placeholder: 'Почта', type: 'email' },
                                    { name: 'city', placeholder: 'Город' }
                                ].map(({ name, placeholder, type }) => (
                                    <TextInput
                                        key={name}
                                        placeholder={placeholder}
                                        tt="uppercase"
                                        size="lg"
                                        radius={theme.other.buttonRadius}
                                        w="100%"
                                        type={type}
                                        {...form.getInputProps(name as keyof FormValues)}
                                        classNames={{ input: classes.textInput }}
                                    />
                                ))}
                                <Group>
                                    <Button
                                        type="submit"
                                        radius={theme.other.buttonRadius}
                                        mt={40}
                                        size='xl'
                                        fz={32}
                                        fw={700}
                                        w="100%"
                                        bg={theme.other.customYellow}
                                        c="white"
                                    >
                                        Создать
                                    </Button>
                                    <Button
                                        radius={theme.other.buttonRadius}
                                        mt={20}
                                        size='xl'
                                        fz={32}
                                        fw={700}
                                        w="100%"
                                        bg="#0077FF"
                                        c="white"
                                        onClick={() => {
                                            // TODO: VK OAuth logic here
                                        }}
                                    >
                                        Создать через VK
                                    </Button>
                                </Group>
                                <Text
                                    ta="center"
                                    mt="md"
                                    fz="md"
                                    c="white"
                                >
                                    Уже зарегестрированы?{' '}
                                    <Text
                                        component={Link}
                                        to="/login"
                                        c={theme.other.customYellow}
                                        fw={600}
                                        style={{ textDecoration: 'none' }}
                                        td="underline"
                                    >
                                        Войти
                                    </Text>
                                </Text>
                            </Stack>
                        </form>
                    </Container>
                </Stack>
            </Stack>

        </Box>
    );
}


export default Registration;