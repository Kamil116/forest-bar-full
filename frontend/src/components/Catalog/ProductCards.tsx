import {
    SimpleGrid,
    Pagination,
    Stack,
    Center,
    Transition,
    Loader,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import ProductCard from './ProductCard';
import { useState, useEffect } from 'react';
import paginationClasses from '@/styles/pagination.module.css';
import { useFetchProducts } from '@/hooks/useFetchProducts';

function ProductCards() {
    const [activePage, setActivePage] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const { isPending, error, data: products, isError } = useFetchProducts();

    const isMobile = useMediaQuery('(max-width: 575px)');
    const isSmallTablet = useMediaQuery(
        '(min-width: 576px) and (max-width: 767px)'
    );
    const isTablet = useMediaQuery(
        '(min-width: 768px) and (max-width: 991px)'
    );
    const isDesktop = useMediaQuery(
        '(min-width: 992px) and (max-width: 1199px)'
    );

    const columns = isMobile
        ? 1
        : isSmallTablet
          ? 2
          : isTablet
            ? 3
            : isDesktop
              ? 4
              : 5;
    const rows = isMobile ? 2 : isSmallTablet ? 2 : 3;
    const itemsPerPage = rows * columns;
    const totalPages = Math.ceil((products?.length || 0) / itemsPerPage);

    useEffect(() => {
        if (activePage > totalPages && totalPages > 0) {
            setActivePage(1);
        }
    }, [totalPages, activePage]);

    const startIndex = (activePage - 1) * itemsPerPage;
    const visibleProducts = products?.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const handlePageChange = (page: number) => {
        setIsTransitioning(false);
        setTimeout(() => {
            setActivePage(page);
            setIsTransitioning(true);
        }, 200);
    };

    if (isError) {
        return <h1>{error?.message || 'Failed to fetch products'}</h1>;
    }

    return (
        <Stack gap="xl">
            {isPending && <Loader />}
            <Transition
                mounted={isTransitioning}
                transition="fade"
                duration={500}
                timingFunction="ease"
            >
                {(styles) => (
                    <SimpleGrid
                        cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
                        spacing="lg"
                        style={styles}
                    >
                        {visibleProducts?.map((product) => (
                            <ProductCard
                                key={`${product.id}-${activePage}`}
                                product={product}
                            />
                        ))}
                    </SimpleGrid>
                )}
            </Transition>

            {totalPages > 1 && (
                <Center py="xl">
                    <Pagination
                        total={totalPages}
                        value={activePage}
                        onChange={handlePageChange}
                        size="lg"
                        radius="md"
                        classNames={{
                            control: paginationClasses.paginationControl,
                        }}
                    />
                </Center>
            )}
        </Stack>
    );
}

export default ProductCards;
