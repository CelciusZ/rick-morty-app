'use client';

import { useCharacters } from '../hooks/useCharacters';
import { parseAsString, useQueryState } from 'nuqs';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import { Character } from '../types';
import { useFilterStore } from '../store/useFilterStore';

export default function CharacterList({
  initialData,
  page: initialPage,
}: {
  initialData: { info: { count: number; pages: number }; results: Character[] };
  page: number;
}) {
  const { status, gender, page, setStatus, setGender, setPage } = useFilterStore();

  // URL senkronizasyonu için nuqs
  const [queryPage, setQueryPage] = useQueryState(
    'page',
    parseAsString.withDefault(initialPage.toString()).withOptions({ shallow: false })
  );
  const [queryStatus, setQueryStatus] = useQueryState(
    'status',
    parseAsString.withDefault('all').withOptions({ shallow: false })
  );
  const [queryGender, setQueryGender] = useQueryState(
    'gender',
    parseAsString.withDefault('all').withOptions({ shallow: false })
  );

  // State ile URL senkronizasyonu
  const currentPage = page || parseInt(queryPage || '1', 10);
  const currentStatus = status || queryStatus || 'all';
  const currentGender = gender || queryGender || 'all';

  // useCharacters’a filtreleri geçir
  const { data, isLoading } = useCharacters({
    page: currentPage,
    status: currentStatus === 'all' ? undefined : currentStatus,
    gender: currentGender === 'all' ? undefined : currentGender,
  });

  const characters = data || initialData;
  const totalPages = characters.info.pages;

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      setQueryPage(newPage.toString());
      console.log('Page updated to:', newPage);
    }
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setQueryStatus(newStatus);
    console.log('Status updated to:', newStatus);
  };

  const handleGenderChange = (newGender: string) => {
    setGender(newGender);
    setQueryGender(newGender);
    console.log('Gender updated to:', newGender);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Rick and Morty Characters</h1>
      <div className="flex gap-4 mb-6">
        <Select
          value={currentStatus}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="alive">Alive</SelectItem>
            <SelectItem value="dead">Dead</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={currentGender}
          onValueChange={handleGenderChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Gender</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="genderless">Genderless</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {characters.results.map((char: Character) => (
              <li key={char.id} className="border rounded-lg p-4 shadow-sm">
                <Image
                  src={char.image}
                  alt={char.name}
                  width={192}
                  height={288}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold">{char.name}</h3>
                <p>Status: {char.status}</p>
                <p>Gender: {char.gender}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-center gap-2">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}