import { fetchCharacters } from '../lib/api';
import CharacterList from './CharacterList';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string; gender?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const status = params.status;
  const gender = params.gender;

  const initialData = await fetchCharacters({ page, status, gender });

  return <CharacterList initialData={initialData} page={page} />;
}