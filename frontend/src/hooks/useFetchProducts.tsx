import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';
import { Product } from '../types/product';

export function useFetchProducts() {
    return useQuery<Product[], Error>({
        queryKey: ['products'],
        queryFn: fetchProducts,
        retry: 1,
    });
}
