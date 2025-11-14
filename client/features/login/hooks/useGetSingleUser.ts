import { useQuery } from '@tanstack/react-query';
import { getSingleUser } from '../api/apis';

export const useGetSingleUser = () => {
    return useQuery({
        queryKey: ['singleUser'],
        queryFn: getSingleUser,
    });
};