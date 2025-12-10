import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';

import {MantineProvider} from '@mantine/core';
import {Notifications} from '@mantine/notifications';
import {ModalsProvider} from '@mantine/modals';
import {Router} from './Router';
import {theme} from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import './fonts.css';

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <MantineProvider theme={theme}>
                <AuthProvider>
                    <ModalsProvider>
                        <Notifications position="top-right" />
                        <Router/>
                    </ModalsProvider>
                </AuthProvider>
            </MantineProvider>
        </QueryClientProvider>
    );
}
