import Header from "@/components/shared/Header";
import { Box, Button, Container, Stack, TextInput, Badge, useMantineTheme, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";

interface FormValues {
    email: string;
    password: string;
}

function Login() {
    const theme = useMantineTheme();
    const { login } = useAuth();
    const navigate = useNavigate();

    const form = useForm<FormValues>({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value: string) => {
                if (!value) { return 'Email обязателен' };
                if (!/^\S+@\S+\.\S+$/.test(value)) {
                    return 'Введите корректный email';
                }
                return null;
            },
            password: (value: string) => {
                if (!value) { return 'Пароль обязателен' };
                return null;
            },
        },
    });

    return (
        <Box
            h="100vh"
            bg={`url(/images/auth-bg.jpg) center/cover no-repeat`}
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
                        Вход
                    </Badge>
                    <Container size="md" px='5rem' bg={theme.other.cardBackground} py='xl' styles={{ root: { borderRadius: theme.other.cardRadius } }}>
                        <form onSubmit={form.onSubmit((values: FormValues) => {
                            // TODO: Add actual authentication logic here
                            login();
                            navigate('/');
                        })}>
                            <Stack>
                                {[
                                    { name: 'email', placeholder: 'Почта', type: 'email' },
                                    { name: 'password', placeholder: 'Пароль', type: 'password' }
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
                                        Войти
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
                                        Войти через VK
                                    </Button>
                                </Group>

                            </Stack>
                        </form>
                    </Container>
                </Stack>
            </Stack>

        </Box>
    );
}

export default Login;
