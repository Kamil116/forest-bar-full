import { useState } from 'react';
import {
    Table,
    ScrollArea,
    TextInput,
    Button,
    Group,
    ActionIcon,
    Pagination,
    Select,
    Paper,
    Text,
    Stack,
    useMantineTheme,
    Badge,
    Title,
} from '@mantine/core';
import { IconSearch, IconEdit, IconTrash, IconPlus, IconArrowUp, IconArrowDown, IconSelector, IconFilterOff } from '@tabler/icons-react';
import classes from './DataTable.module.css';
import paginationClasses from '@/styles/pagination.module.css';

export interface Column<T> {
    key: keyof T | string;
    label: string;
    sortable?: boolean;
    render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    onEdit: (row: T) => void;
    onDelete: (row: T) => void;
    onAdd: () => void;
    searchKeys?: (keyof T)[];
    title: string;
    itemsPerPageOptions?: number[];
}

export default function DataTable<T extends { id: number }>({
    data,
    columns,
    onEdit,
    onDelete,
    onAdd,
    searchKeys = [],
    title,
    itemsPerPageOptions = [10, 25, 50, 100],
}: DataTableProps<T>) {
    const theme = useMantineTheme();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
    const [sortBy, setSortBy] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // Filter data based on search
    const filteredData = data.filter((item) => {
        if (!search) {
            return true;
        }
        return searchKeys.some((key) => {
            const value = item[key];
            if (value === null || value === undefined) {
                return false;
            }
            return String(value).toLowerCase().includes(search.toLowerCase());
        });
    });

    // Sort data
    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortBy) {
            return 0;
        }
        
        const aValue = a[sortBy as keyof T];
        const bValue = b[sortBy as keyof T];
        
        if (aValue === null || aValue === undefined) {
            return 1;
        }
        if (bValue === null || bValue === undefined) {
            return -1;
        }
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortOrder === 'asc' 
                ? aValue.localeCompare(bValue) 
                : bValue.localeCompare(aValue);
        }
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        return 0;
    });

    // Paginate data
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = sortedData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const handleSort = (columnKey: string) => {
        if (sortBy === columnKey) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(columnKey);
            setSortOrder('asc');
        }
    };

    return (
        <Stack gap="md">
            <Paper p="lg" radius={theme.other.cardRadius} bg={theme.other.darkBackground}>
                <Group gap="md" justify="space-between">
                    <TextInput
                        placeholder="Поиск..."
                        leftSection={<IconSearch size={16} />}
                        value={search}
                        onChange={(e) => {
                            setSearch(e.currentTarget.value);
                            setPage(1);
                        }}
                        classNames={{
                            root: classes.searchWrapper,
                            input: classes.searchInput,
                        }}
                    />
                    <Group gap="sm">
                        <Select
                            value={String(itemsPerPage)}
                            onChange={(value) => {
                                setItemsPerPage(Number(value));
                                setPage(1);
                            }}
                            data={itemsPerPageOptions.map(option => ({
                                value: String(option),
                                label: `${option} на странице`,
                            }))}
                            classNames={{
                                input: classes.selectInput,
                            }}
                        />
                        <Button
                            leftSection={<IconPlus size={16} />}
                            color={theme.other.customOrange}
                            onClick={onAdd}
                        >
                            Добавить
                        </Button>
                    </Group>
                </Group>
            </Paper>

            <Paper p="lg" radius={theme.other.cardRadius} bg={theme.other.darkBackground}>
                <Stack gap="md">
                    <Group justify="space-between" wrap="wrap">
                        <Title order={2} className={classes.tableTitle}>
                            {title}
                        </Title>
                        <Group gap="sm">
                            {sortBy && (
                                <Button
                                    leftSection={<IconFilterOff size={16} />}
                                    onClick={() => {
                                        setSortBy(null);
                                        setSortOrder('asc');
                                        setPage(1);
                                    }}
                                    color={theme.other.customYellow}
                                >
                                    Сбросить сортировку
                                </Button>
                            )}
                            <Badge color={theme.other.customYellow} size="lg">
                                Всего: {filteredData.length}
                            </Badge>
                        </Group>
                    </Group>

                    <ScrollArea>
                        <Table
                            highlightOnHover
                            classNames={{
                                th: classes.tableHeader,
                                td: classes.tableCell,
                                tr: classes.tableRow,
                            }}
                        >
                            <Table.Thead>
                                <Table.Tr>
                                    {columns.map((column) => (
                                        <Table.Th key={String(column.key)}>
                                            <Group gap={8} wrap="nowrap">
                                                {column.label}
                                                {column.sortable && (
                                                    <ActionIcon
                                                        variant="subtle"
                                                        size="sm"
                                                        color={sortBy === column.key ? theme.other.customYellow : 'gray'}
                                                        onClick={() => handleSort(String(column.key))}
                                                    >
                                                        {sortBy === column.key ? (
                                                            sortOrder === 'asc' ? (
                                                                <IconArrowUp size={16} />
                                                            ) : (
                                                                <IconArrowDown size={16} />
                                                            )
                                                        ) : (
                                                            <IconSelector size={16} />
                                                        )}
                                                    </ActionIcon>
                                                )}
                                            </Group>
                                        </Table.Th>
                                    ))}
                                    <Table.Th className={classes.actionsColumn}>Действия</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {paginatedData.length === 0 ? (
                                    <Table.Tr>
                                        <Table.Td colSpan={columns.length + 1}>
                                            <Text className={classes.emptyState} c="dimmed">
                                                Данные не найдены
                                            </Text>
                                        </Table.Td>
                                    </Table.Tr>
                                ) : (
                                    paginatedData.map((row) => (
                                        <Table.Tr key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.key as keyof T];
                                                return (
                                                    <Table.Td key={String(column.key)}>
                                                        {column.render 
                                                            ? column.render(value, row) 
                                                            : String(value ?? '')}
                                                    </Table.Td>
                                                );
                                            })}
                                            <Table.Td>
                                                <Group gap={4}>
                                                    <ActionIcon
                                                        variant="subtle"
                                                        color={theme.other.customYellow}
                                                        onClick={() => onEdit(row)}
                                                    >
                                                        <IconEdit size={18} />
                                                    </ActionIcon>
                                                    <ActionIcon
                                                        variant="subtle"
                                                        color="red"
                                                        onClick={() => onDelete(row)}
                                                    >
                                                        <IconTrash size={18} />
                                                    </ActionIcon>
                                                </Group>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))
                                )}
                            </Table.Tbody>
                        </Table>
                    </ScrollArea>

                    {totalPages > 1 && (
                        <Group justify="center" mt="md">
                            <Pagination
                                value={page}
                                onChange={setPage}
                                total={totalPages}
                                color={theme.other.customYellow}
                                classNames={{
                                    control: paginationClasses.paginationControl,
                                }}
                            />
                        </Group>
                    )}
                </Stack>
            </Paper>
        </Stack>
    );
}

