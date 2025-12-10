import { AppShell, Burger, Group, Stack, Title, NavLink, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    IconShoppingBag,
    IconBriefcase,
    IconBuilding,
    IconLogout,
    IconHome,
    IconStar,
} from '@tabler/icons-react';
import classes from './AdminLayout.module.css';

export default function AdminLayout() {
    const [opened, { toggle }] = useDisclosure();
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { label: 'Товары', icon: IconShoppingBag, path: '/admin/products' },
        { label: 'Поставщики', icon: IconBuilding, path: '/admin/vendors' },
        { label: 'Вакансии', icon: IconBriefcase, path: '/admin/vacancies' },
        { label: 'Преимущества', icon: IconStar, path: '/admin/advantages' },
    ];

    return (
        <AppShell
            header={{ height: 70 }}
            navbar={{ width: 280, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
            classNames={{
                main: classes.main,
                navbar: classes.navbar,
                header: classes.header,
            }}
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    <Group>
                        {/* Menu for mobile view */}
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color="white" />
                        <Title order={1} tt="uppercase" className={classes.title}>
                            Forest Bar Админ
                        </Title>
                    </Group>
                    <Group>
                        <NavLink
                            label="Домой"
                            leftSection={<IconHome size={20} />}
                            onClick={() => navigate('/')}
                            classNames={{ root: classes.headerLink }}
                        />
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <AppShell.Section grow component={ScrollArea}>
                    <Stack gap="xs">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                label={item.label}
                                leftSection={<item.icon size={20} />}
                                active={location.pathname === item.path}
                                onClick={() => navigate(item.path)}
                                classNames={{ root: classes.navLink }}
                            />
                        ))}
                    </Stack>
                </AppShell.Section>

                <AppShell.Section>
                    <NavLink
                        label="Выход"
                        leftSection={<IconLogout size={20} />}
                        onClick={() => {
                            // TODO: Add logout logic
                            navigate('/login');
                        }}
                        classNames={{ root: classes.logoutLink }}
                    />
                </AppShell.Section>
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}

