import { Character } from '../types';

export const fetchCharacters = async ({
  page,
  status,
  gender,
}: {
  page: number;
  status?: string;
  gender?: string;
}): Promise<{ info: { count: number; pages: number }; results: Character[] }> => {
  const query = new URLSearchParams({
    page: page.toString(),
    ...(status && { status }),
    ...(gender && { gender }),
  }).toString();
  const res = await fetch(`https://rickandmortyapi.com/api/character?${query}`);
  if (!res.ok) throw new Error('Failed to fetch characters');
  return res.json();
};