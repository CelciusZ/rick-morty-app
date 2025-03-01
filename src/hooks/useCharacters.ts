import { useQuery } from '@tanstack/react-query';
import { fetchCharacters } from '../lib/api';

export const useCharacters = ({
  page,
  status,
  gender,
}: {
  page: number;
  status?: string | undefined;
  gender?: string | undefined;
}) => {
  return useQuery({
    queryKey: ['characters', page, status, gender],
    queryFn: () => fetchCharacters({ page, status, gender }),
    placeholderData: undefined,
  });
};