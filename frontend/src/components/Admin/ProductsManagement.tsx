import { useState } from 'react';
import {
    Container,
    Title,
    Modal,
    TextInput,
    NumberInput,
    Textarea,
    Button,
    Group,
    Stack,
    Image,
    Badge,
    useMantineTheme,
    Select,
    TagsInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import DataTable, { Column } from '@/components/Admin/DataTable';
import { Product } from '@/types/product';
import { mockProducts } from '@/data/mockProducts';
import classes from './ProductsManagement.module.css';

export default function ProductsManagement() {
    const theme = useMantineTheme();
    const [products, setProducts] = useState<Product[]>(mockProducts); // TODO: replace mock data to database's data
    const [opened, setOpened] = useState(false); // for adding view
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const form = useForm<Omit<Product, 'id'>>({
        initialValues: {
            name: '',
            price: 0,
            product_type: 'ягода',
            long_description: '',
            images: [],
            seller_id: 1,
            vitamins: [],
            minerals: [],
            antioxidants: [],
            energy_value: '',
            shelf_life: '',
        },
        validate: {
            name: (value) =>
                value.length < 2
                    ? 'Название должно содержать минимум 2 символа'
                    : null,
            price: (value) =>
                value <= 0 ? 'Цена должна быть больше 0' : null,
            product_type: (value) =>
                value.length < 2
                    ? 'Тип товара должен содержать минимум 2 символа'
                    : null,
            long_description: (value) =>
                value.length < 20
                    ? 'Полное описание должно содержать минимум 20 символов'
                    : null,
        },
    });

    const handleAdd = () => {
        setEditingProduct(null);
        form.reset();
        setOpened(true);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        form.setValues({
            name: product.name,
            price: product.price,
            product_type: product.product_type,
            long_description: product.long_description,
            images: product.images || [],
            seller_id: product.seller_id,
            vitamins: product.vitamins || [],
            minerals: product.minerals || [],
            antioxidants: product.antioxidants || [],
            energy_value: product.energy_value || '',
            shelf_life: product.shelf_life || '',
        });
        setOpened(true);
    };

    const handleDelete = (product: Product) => {
        modals.openConfirmModal({
            title: 'Удалить товар',
            children: `Вы уверены, что хотите удалить "${product.name}"?`,
            labels: { confirm: 'Удалить', cancel: 'Отмена' },
            confirmProps: { color: 'red', size: 'lg' },
            cancelProps: { size: 'lg' },
            styles: {
                title: { fontSize: '24px', fontWeight: 700 },
                body: { fontSize: '18px' },
            },
            onConfirm: () => {
                setProducts(products.filter((p) => p.id !== product.id));
                notifications.show({
                    title: 'Товар удален',
                    message: `${product.name} был удален`,
                    color: 'red',
                });
            },
        });
    };

    const handleSubmit = (values: Omit<Product, 'id'>) => {
        if (editingProduct) {
            // Update existing product
            setProducts(
                products.map((p) =>
                    p.id === editingProduct.id
                        ? { ...values, id: editingProduct.id }
                        : p
                )
            );
            notifications.show({
                title: 'Товар обновлен',
                message: `${values.name} был успешно обновлен`,
                color: 'green',
            });
        } else {
            // Add new product
            const newProduct: Product = {
                ...values,
                id: Math.max(...products.map((p) => p.id)) + 1, // Take maximum ID and add 1 for the new one
            };
            setProducts([...products, newProduct]);
            notifications.show({
                title: 'Товар добавлен',
                message: `${values.name} был успешно добавлен`,
                color: 'green',
            });
        }
        setOpened(false);
        form.reset();
    };

    const columns: Column<Product>[] = [
        {
            key: 'id',
            label: 'ID',
            sortable: true,
        },
        {
            key: 'images',
            label: 'Изображение',
            render: (value) => (
                <Image
                    src={value && value.length > 0 ? value[0] : ''}
                    alt="Product"
                    h={50}
                    w={50}
                    radius="md"
                    fit="cover"
                />
            ),
        },
        {
            key: 'name',
            label: 'Название',
            sortable: true,
        },
        {
            key: 'product_type',
            label: 'Тип',
            sortable: true,
            render: (value) => (
                <Badge color={theme.other.customOrange}>{value}</Badge>
            ),
        },
        {
            key: 'price',
            label: 'Цена',
            sortable: true,
            render: (value) => `₽${value}`,
        },
        {
            key: 'seller_id',
            label: 'ID продавца',
            sortable: true,
            render: (value) => (
                <Badge color={theme.other.customYellow}>{value}</Badge>
            ),
        },
    ];

    return (
        <Container size="xl" className={classes.container}>
            <Stack gap="xl">
                <Title order={1} className={classes.title}>
                    Управление товарами
                </Title>

                <DataTable
                    data={products}
                    columns={columns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAdd={handleAdd}
                    searchKeys={[
                        'name',
                        'product_type',
                        'long_description',
                    ]}
                    title="Каталог товаров"
                />

                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title={
                        <Title order={2} c="white">
                            {editingProduct
                                ? 'Редактировать товар'
                                : 'Добавить новый товар'}
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
                                label="Название товара"
                                placeholder="Введите название товара"
                                required
                                {...form.getInputProps('name')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <NumberInput
                                label="Цена (₽)"
                                placeholder="Введите цену"
                                required
                                min={0}
                                {...form.getInputProps('price')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <Select
                                label="Тип товара"
                                placeholder="Выберите тип товара"
                                required
                                data={['ягода', 'мёд', 'чай', 'ягодный сбор', 'варенье', 'другое']}
                                {...form.getInputProps('product_type')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <Textarea
                                label="Полное описание"
                                placeholder="Введите подробное описание"
                                required
                                minRows={3}
                                {...form.getInputProps('long_description')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <TagsInput
                                label="URL изображений"
                                placeholder="Введите URL изображения и нажмите Enter"
                                description="Можно добавить несколько изображений"
                                {...form.getInputProps('images')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <TagsInput
                                label="Витамины (необязательно)"
                                placeholder="Введите витамины (например: C, A, E)"
                                {...form.getInputProps('vitamins')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <TagsInput
                                label="Минералы (необязательно)"
                                placeholder="Введите минералы (например: калий, железо)"
                                {...form.getInputProps('minerals')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <TagsInput
                                label="Антиоксиданты (необязательно)"
                                placeholder="Введите антиоксиданты (например: антоцианы)"
                                {...form.getInputProps('antioxidants')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <TextInput
                                label="Энергетическая ценность (необязательно)"
                                placeholder="Например: 43 ккал/100г"
                                {...form.getInputProps('energy_value')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <TextInput
                                label="Срок хранения (необязательно)"
                                placeholder="Например: 7 дней"
                                {...form.getInputProps('shelf_life')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <NumberInput
                                label="ID продавца"
                                placeholder="Введите ID продавца"
                                required
                                min={1}
                                {...form.getInputProps('seller_id')}
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
                                    {editingProduct ? 'Обновить' : 'Создать'}
                                </Button>
                            </Group>
                        </Stack>
                    </form>
                </Modal>
            </Stack>
        </Container>
    );
}

