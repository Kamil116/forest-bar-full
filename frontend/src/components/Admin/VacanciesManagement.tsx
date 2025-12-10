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
    Badge,
    useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import DataTable, { Column } from '@/components/Admin/DataTable';
import { Vacancy } from '@/types/vacancy';
import { mockVacancies } from '@/data/mockVacancies';
import classes from './VacanciesManagement.module.css';

export default function VacanciesManagement() {
    const theme = useMantineTheme();
    const [vacancies, setVacancies] = useState<Vacancy[]>(mockVacancies);
    const [opened, setOpened] = useState(false);
    const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);

    const form = useForm<Omit<Vacancy, 'id'>>({
        initialValues: {
            title: '',
            city: '',
            schedule: '',
            salary: '',
            long_description: '',
            additional_conditions: [],
        },
        validate: {
            title: (value) =>
                value.length < 3
                    ? 'Название должно содержать минимум 3 символа'
                    : null,
            city: (value) => (value.length < 2 ? 'Город обязателен' : null),
            schedule: (value) =>
                value.length < 2 ? 'График работы обязателен' : null,
            salary: (value) => (value.length < 1 ? 'Зарплата обязательна' : null),
            long_description: (value) =>
                value.length < 20
                    ? 'Описание должно содержать минимум 20 символов'
                    : null,
        },
    });

    const [newCondition, setNewCondition] = useState('');

    const handleAdd = () => {
        setEditingVacancy(null);
        form.reset();
        setOpened(true);
    };

    const handleEdit = (vacancy: Vacancy) => {
        setEditingVacancy(vacancy);
        form.setValues({
            title: vacancy.title,
            city: vacancy.city,
            schedule: vacancy.schedule,
            salary: vacancy.salary,
            long_description: vacancy.long_description,
            additional_conditions: vacancy.additional_conditions || [],
        });
        setOpened(true);
    };

    const handleDelete = (vacancy: Vacancy) => {
        modals.openConfirmModal({
            title: 'Удалить вакансию',
            children: `Вы уверены, что хотите удалить вакансию "${vacancy.title}"?`,
            labels: { confirm: 'Удалить', cancel: 'Отмена' },
            confirmProps: { color: 'red', size: 'lg' },
            cancelProps: { size: 'lg' },
            styles: {
                title: { fontSize: '24px', fontWeight: 700 },
                body: { fontSize: '18px' },
            },
            onConfirm: () => {
                setVacancies(vacancies.filter((v) => v.id !== vacancy.id));
                notifications.show({
                    title: 'Вакансия удалена',
                    message: `${vacancy.title} была удалена`,
                    color: 'red',
                });
            },
        });
    };

    const handleSubmit = (values: Omit<Vacancy, 'id'>) => {
        if (editingVacancy) {
            setVacancies(
                vacancies.map((v) =>
                    v.id === editingVacancy.id
                        ? { ...values, id: editingVacancy.id }
                        : v
                )
            );
            notifications.show({
                title: 'Вакансия обновлена',
                message: `${values.title} была успешно обновлена`,
                color: 'green',
            });
        } else {
            const newVacancy: Vacancy = {
                ...values,
                id: vacancies.length > 0 
                    ? Math.max(...vacancies.map((v) => v.id)) + 1 
                    : 1,
            };
            setVacancies([...vacancies, newVacancy]);
            notifications.show({
                title: 'Вакансия добавлена',
                message: `${values.title} была успешно добавлена`,
                color: 'green',
            });
        }
        setOpened(false);
        form.reset();
    };


    const columns: Column<Vacancy>[] = [
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
            key: 'city',
            label: 'Город',
            sortable: true,
        },
        {
            key: 'schedule',
            label: 'График работы',
            sortable: true,
        },
        {
            key: 'salary',
            label: 'Зарплата',
            sortable: true,
        },
    ];

    return (
        <Container size="xl" p="xl">
            <Stack gap="xl">
                <Title order={1} c="white" fw={700} size="42px">
                    Управление вакансиями
                </Title>

                <DataTable
                    data={vacancies}
                    columns={columns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAdd={handleAdd}
                    searchKeys={['title', 'city', 'long_description']}
                    title="Вакансии"
                />

                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title={
                        <Title order={2} c="white">
                            {editingVacancy
                                ? 'Редактировать вакансию'
                                : 'Добавить новую вакансию'}
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
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Stack gap="md">
                            <TextInput
                                label="Название вакансии"
                                placeholder="например, Менеджер по продажам"
                                required
                                {...form.getInputProps('title')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <TextInput
                                label="Город"
                                placeholder="Москва"
                                required
                                {...form.getInputProps('city')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <TextInput
                                label="График работы"
                                placeholder="например, 5/2, полный день"
                                required
                                {...form.getInputProps('schedule')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <TextInput
                                label="Зарплата"
                                placeholder="например, от 80 000 руб или по договоренности"
                                required
                                {...form.getInputProps('salary')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <Textarea
                                label="Описание"
                                placeholder="Подробное описание вакансии"
                                required
                                minRows={3}
                                {...form.getInputProps('long_description')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <Stack gap="xs">
                                <TextInput
                                    label="Дополнительные условия (необязательно)"
                                    placeholder="Добавить дополнительное условие"
                                    value={newCondition}
                                    onChange={(e) =>
                                        setNewCondition(
                                            e.currentTarget.value
                                        )
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            if (newCondition.trim()) {
                                                form.setFieldValue(
                                                    'additional_conditions',
                                                    [
                                                        ...(form.values
                                                            .additional_conditions ||
                                                            []),
                                                        newCondition.trim(),
                                                    ]
                                                );
                                                setNewCondition('');
                                            }
                                        }
                                    }}
                                    classNames={{
                                        label: classes.inputLabel,
                                        input: classes.inputField,
                                    }}
                                    rightSection={
                                        <Button
                                            onClick={() => {
                                                if (newCondition.trim()) {
                                                    form.setFieldValue(
                                                        'additional_conditions',
                                                        [
                                                            ...(form.values
                                                                .additional_conditions ||
                                                                []),
                                                            newCondition.trim(),
                                                        ]
                                                    );
                                                    setNewCondition('');
                                                }
                                            }}
                                            color={theme.other.customOrange}
                                            size="xs"
                                        >
                                            Добавить
                                        </Button>
                                    }
                                />
                                <Stack gap={4}>
                                    {(form.values.additional_conditions || []).map(
                                        (condition, index) => (
                                            <Badge
                                                key={index}
                                                color={
                                                    theme.other.customYellow
                                                }
                                                rightSection={
                                                    <span
                                                        role="button"
                                                        tabIndex={0}
                                                        style={{
                                                            cursor: 'pointer',
                                                            marginLeft: '8px',
                                                        }}
                                                        onClick={() => {
                                                            form.setFieldValue(
                                                                'additional_conditions',
                                                                (form.values.additional_conditions || []).filter(
                                                                    (_, i) =>
                                                                        i !==
                                                                        index
                                                                )
                                                            );
                                                        }}
                                                        onKeyDown={(e) => {
                                                            if (
                                                                e.key ===
                                                                    'Enter' ||
                                                                e.key === ' '
                                                            ) {
                                                                form.setFieldValue(
                                                                    'additional_conditions',
                                                                    (form.values.additional_conditions || []).filter(
                                                                        (
                                                                            _,
                                                                            i
                                                                        ) =>
                                                                            i !==
                                                                            index
                                                                    )
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        ×
                                                    </span>
                                                }
                                            >
                                                {condition}
                                            </Badge>
                                        )
                                    )}
                                </Stack>
                            </Stack>

                            <Group className={classes.buttonGroup}>
                                <Button
                                    variant="outline"
                                    onClick={() => setOpened(false)}
                                >
                                    Отмена
                                </Button>
                                <Button
                                    type="submit"
                                    color={theme.other.customOrange}
                                >
                                    {editingVacancy ? 'Обновить' : 'Создать'}
                                </Button>
                            </Group>
                        </Stack>
                    </form>
                </Modal>
            </Stack>
        </Container>
    );
}
