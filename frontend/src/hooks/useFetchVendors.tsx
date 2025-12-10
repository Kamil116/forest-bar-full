import { useQuery } from '@tanstack/react-query';
import { fetchVendors } from '../api/vendors';

export function useFetchVendors() {
    return useQuery({
        queryKey: ['vendors'],
        queryFn: fetchVendors,
    });
}
