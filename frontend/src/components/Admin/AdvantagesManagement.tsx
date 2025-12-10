import { useState } from 'react';
import {
    Container,
    Title,
    Modal,
    TextInput,
    Textarea,
    Button,
    Group,
    Stack,
    useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import DataTable, { Column } from '@/components/Admin/DataTable';
import { Advantage } from '@/types/advantage';
import { mockAdvantages } from '@/data/mockAdvantages';
import classes from './AdvantagesManagement.module.css';

export default function AdvantagesManagement() {
    const theme = useMantineTheme();
    const [advantages, setAdvantages] = useState<Advantage[]>(mockAdvantages); // TODO: replace mock data to database's data
    const [opened, setOpened] = useState(false); // for adding view
    const [editingAdvantage, setEditingAdvantage] = useState<Advantage | null>(null);

    const form = useForm<Omit<Advantage, 'id'>>({
        initialValues: {
            title: '',
            description: '',
        },
        validate: {
            title: (value) => (value.length < 2 ? 'Название должно содержать минимум 2 символа' : null),
            description: (value) =>
                value.length < 10 ? 'Описание должно содержать минимум 10 символов' : null,
        },
    });

    const handleAdd = () => {
        setEditingAdvantage(null);
        form.reset();
        setOpened(true);
    };

    const handleEdit = (advantage: Advantage) => {
        setEditingAdvantage(advantage);
        form.setValues({
            title: advantage.title,
            description: advantage.description,
        });
        setOpened(true);
    };

    const handleDelete = (advantage: Advantage) => {
        modals.openConfirmModal({
            title: 'Удалить преимущество',
            children: `Вы уверены, что хотите удалить "${advantage.title}"?`,
            labels: { confirm: 'Удалить', cancel: 'Отмена' },
            confirmProps: { color: 'red', size: 'lg' },
            cancelProps: { size: 'lg' },
            styles: {
                title: { fontSize: '24px', fontWeight: 700 },
                body: { fontSize: '18px' },
            },
            onConfirm: () => {
                setAdvantages(advantages.filter((a) => a.id !== advantage.id));
                notifications.show({
                    title: 'Преимущество удалено',
                    message: `${advantage.title} было удалено`,
                    color: 'red',
                });
            },
        });
    };

    const handleSubmit = (values: Omit<Advantage, 'id'>) => {
        if (editingAdvantage) {
            // Update existing advantage
            setAdvantages(
                advantages.map((a) =>
                    a.id === editingAdvantage.id ? { ...values, id: editingAdvantage.id } : a
                )
            );
            notifications.show({
                title: 'Преимущество обновлено',
                message: `${values.title} было успешно обновлено`,
                color: 'green',
            });
        } else {
            // Add new advantage
            const newAdvantage: Advantage = {
                ...values,
                id: Math.max(...advantages.map((a) => a.id)) + 1, // Take maximum ID and add 1 for the new one
            };
            setAdvantages([...advantages, newAdvantage]);
            notifications.show({
                title: 'Преимущество добавлено',
                message: `${values.title} было успешно добавлено`,
                color: 'green',
            });
        }
        setOpened(false);
        form.reset();
    };

    const columns: Column<Advantage>[] = [
        {
            key: 'id',
            label: 'ID',
            sortable: true,
        },
        {
            key: 'title',
            label: 'Название',
            sortable: true,
        },
        {
            key: 'description',
            label: 'Описание',
            render: (value) => (
                <span className={classes.descriptionText}>
                    {value}
                </span>
            ),
        },
    ];

    return (
        <Container size="xl" className={classes.container}>
            <Stack gap="xl">
                <Title order={1} className={classes.title}>
                    Управление преимуществами
                </Title>

                <DataTable
                    data={advantages}
                    columns={columns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAdd={handleAdd}
                    searchKeys={['title', 'description']}
                    title="Список преимуществ"
                />

                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title={
                        <Title order={2} c='white'>
                            {editingAdvantage ? 'Редактировать преимущество' : 'Добавить новое преимущество'}
                        </Title>
                    }
                    size="lg"
                    centered
                    overlayProps={{
                        backgroundOpacity: 0.55,
                        blur: 3,
                    }}
                    classNames={{
                        content: classes.modalContent,
                        body: classes.modalBody,
                        header: classes.modalHeader,
                    }}
                >
                    {/* Form of the modal */}
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Stack gap="md">
                            <TextInput
                                label="Название преимущества"
                                placeholder="Введите название преимущества"
                                required
                                {...form.getInputProps('title')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <Textarea
                                label="Описание"
                                placeholder="Введите описание преимущества"
                                required
                                minRows={3}
                                {...form.getInputProps('description')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <Group className={classes.buttonGroup}>
                                <Button variant="outline" onClick={() => setOpened(false)}>
                                    Отмена
                                </Button>
                                <Button type="submit" color={theme.other.customOrange}>
                                    {editingAdvantage ? 'Обновить' : 'Создать'}
                                </Button>
                            </Group>
                        </Stack>
                    </form>
                </Modal>
            </Stack>
        </Container>
    );
}

