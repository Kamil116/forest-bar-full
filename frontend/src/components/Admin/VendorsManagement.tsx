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
    NumberInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import DataTable, { Column } from '@/components/Admin/DataTable';
import { Vendor } from '@/types/vendor';
import { mockVendors } from '@/data/mockVendors';
import classes from './VendorsManagement.module.css';

export default function VendorsManagement() {
    const theme = useMantineTheme();
    const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
    const [opened, setOpened] = useState(false);
    const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);

    const form = useForm<Omit<Vendor, 'id'>>({
        initialValues: {
            first_name: '',
            last_name: '',
            middle_name: '',
            city: '',
            region: '',
            address: '',
            phone: '',
            email: '',
            work_hours: '',
            coords: [0, 0],
            referral_link: undefined,
            photo_url: undefined,
        },
        validate: {
            first_name: (value) =>
                value.length < 2
                    ? 'Имя должно содержать минимум 2 символа'
                    : null,
            last_name: (value) =>
                value.length < 2
                    ? 'Фамилия должна содержать минимум 2 символа'
                    : null,
            city: (value) =>
                value.length < 2
                    ? 'Город должен содержать минимум 2 символа'
                    : null,
            region: (value) =>
                value.length < 2
                    ? 'Регион должен содержать минимум 2 символа'
                    : null,
            address: (value) =>
                value.length < 10
                    ? 'Адрес должен содержать минимум 10 символов'
                    : null,
            phone: (value) =>
                value.length < 10
                    ? 'Телефон должен быть действительным'
                    : null,
            email: (value) =>
                /^\S+@\S+$/.test(value || '') || !value
                    ? null
                    : 'Неверный email',
            work_hours: (value) =>
                value.length < 3 ? 'Рабочие часы должны быть указаны' : null,
        },
    });

    const handleAdd = () => {
        setEditingVendor(null);
        form.reset();
        setOpened(true);
    };

    const handleEdit = (vendor: Vendor) => {
        setEditingVendor(vendor);
        form.setValues({
            first_name: vendor.first_name,
            last_name: vendor.last_name,
            middle_name: vendor.middle_name || '',
            city: vendor.city,
            region: vendor.region,
            address: vendor.address,
            phone: vendor.phone,
            email: vendor.email || '',
            work_hours: vendor.work_hours,
            coords: vendor.coords || [0, 0],
            referral_link: vendor.referral_link || undefined,
            photo_url: vendor.photo_url || undefined,
        });
        setOpened(true);
    };

    const handleDelete = (vendor: Vendor) => {
        modals.openConfirmModal({
            title: 'Удалить поставщика',
            children: `Вы уверены, что хотите удалить "${vendor.region}"?`,
            labels: { confirm: 'Удалить', cancel: 'Отмена' },
            confirmProps: { color: 'red', size: 'lg' },
            cancelProps: { size: 'lg' },
            styles: {
                title: { fontSize: '24px', fontWeight: 700 },
                body: { fontSize: '18px' },
            },
            onConfirm: () => {
                setVendors(vendors.filter((v) => v.id !== vendor.id));
                notifications.show({
                    title: 'Поставщик удален',
                    message: `${vendor.region} был удален`,
                    color: 'red',
                });
            },
        });
    };

    const handleSubmit = (values: Omit<Vendor, 'id'>) => {
        if (editingVendor) {
            setVendors(
                vendors.map((v) =>
                    v.id === editingVendor.id
                        ? { ...values, id: editingVendor.id }
                        : v
                )
            );
            notifications.show({
                title: 'Поставщик обновлен',
                message: `${values.middle_name + values.first_name + values.last_name} был успешно обновлен`,
                color: 'green',
            });
        } else {
            const newVendor: Vendor = {
                ...values,
                id: Math.max(...vendors.map((v) => v.id)) + 1,
            };
            setVendors([...vendors, newVendor]);
            notifications.show({
                title: 'Поставщик добавлен',
                message: `${values.middle_name + values.first_name + values.last_name}} был успешно добавлен`,
                color: 'green',
            });
        }
        setOpened(false);
        form.reset();
    };

    const columns: Column<Vendor>[] = [
        {
            key: 'id',
            label: 'ID',
            sortable: true,
        },
        {
            key: 'region',
            label: 'Регион',
            sortable: true,
        },
        {
            key: 'city',
            label: 'Город',
            sortable: true,
        },
        {
            key: 'last_name',
            label: 'Представитель',
            sortable: true,
            render: (_value, row) =>
                `${row.last_name} ${row.first_name} ${row.middle_name || ''}`,
        },
        {
            key: 'address',
            label: 'Адрес',
            render: (value) => (
                <span className={classes.descriptionText}>{value}</span>
            ),
        },
        {
            key: 'phone',
            label: 'Телефон',
        },
        {
            key: 'email',
            label: 'Email',
            render: (value) => value || <Badge color="gray">Н/Д</Badge>,
        },
        {
            key: 'work_hours',
            label: 'Рабочие часы',
        },
        {
            key: 'coords',
            label: 'Местоположение',
            render: (value) =>
                value ? (
                    <Badge color={theme.other.customYellow}>
                        {value[0].toFixed(2)}, {value[1].toFixed(2)}
                    </Badge>
                ) : (
                    <Badge color="gray">Н/Д</Badge>
                ),
        },
    ];

    return (
        <Container size="xl" className={classes.container}>
            <Stack gap="xl">
                <Title order={1} className={classes.title}>
                    Управление поставщиками
                </Title>

                <DataTable
                    data={vendors}
                    columns={columns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAdd={handleAdd}
                    searchKeys={[
                        'first_name',
                        'last_name',
                        'middle_name',
                        'city',
                        'region',
                        'address',
                        'phone',
                        'email',
                    ]}
                    title="Партнеры-поставщики"
                />

                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title={
                        <Title order={2} c="white">
                            {editingVendor
                                ? 'Редактировать поставщика'
                                : 'Добавить нового поставщика'}
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
                                label="Имя представителя"
                                placeholder="Введите имя"
                                required
                                {...form.getInputProps('first_name')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <TextInput
                                label="Фамилия представителя"
                                placeholder="Введите фамилию"
                                required
                                {...form.getInputProps('last_name')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <TextInput
                                label="Отчество представителя (необязательно)"
                                placeholder="Введите отчество"
                                {...form.getInputProps('middle_name')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <TextInput
                                label="Город"
                                placeholder="Введите город"
                                required
                                {...form.getInputProps('city')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <TextInput
                                label="Регион"
                                placeholder="Введите регион"
                                required
                                {...form.getInputProps('region')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <Textarea
                                label="Адрес"
                                placeholder="Введите полный адрес"
                                required
                                minRows={2}
                                {...form.getInputProps('address')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <TextInput
                                label="Телефон"
                                placeholder="+7 (XXX) XXX-XXXX"
                                required
                                {...form.getInputProps('phone')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <TextInput
                                label="Email (необязательно)"
                                placeholder="vendor@example.com"
                                {...form.getInputProps('email')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <TextInput
                                label="Рабочие часы"
                                placeholder="9:00 - 18:00"
                                required
                                {...form.getInputProps('work_hours')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <Group grow>
                                <NumberInput
                                    label="Широта (необязательно)"
                                    placeholder="55.7558"
                                    decimalScale={4}
                                    step={0.0001}
                                    value={form.values.coords?.[0] ?? 0}
                                    onChange={(value) => {
                                        const lat = Number(value);
                                        const lng =
                                            form.values.coords?.[1] ?? 0;
                                        form.setFieldValue('coords', [
                                            lat,
                                            lng,
                                        ]);
                                    }}
                                    classNames={{
                                        label: classes.inputLabel,
                                        input: classes.inputField,
                                    }}
                                />
                                <NumberInput
                                    label="Долгота (необязательно)"
                                    placeholder="37.6176"
                                    decimalScale={4}
                                    step={0.0001}
                                    value={form.values.coords?.[1] ?? 0}
                                    onChange={(value) => {
                                        const lat =
                                            form.values.coords?.[0] ?? 0;
                                        const lng = Number(value);
                                        form.setFieldValue('coords', [
                                            lat,
                                            lng,
                                        ]);
                                    }}
                                    classNames={{
                                        label: classes.inputLabel,
                                        input: classes.inputField,
                                    }}
                                />
                            </Group>

                            <TextInput
                                label="Реферальная ссылка (необязательно)"
                                placeholder="https://example.com"
                                {...form.getInputProps('referral_link')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <TextInput
                                label="URL фото (необязательно)"
                                placeholder="https://example.com/photo.jpg"
                                {...form.getInputProps('photo_url')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

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
                                    {editingVendor ? 'Обновить' : 'Создать'}
                                </Button>
                            </Group>
                        </Stack>
                    </form>
                </Modal>
            </Stack>
        </Container>
    );
}
