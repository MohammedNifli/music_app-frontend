import { useQuery } from '@tanstack/react-query';
import { fetchSongData } from '../api/songs.api';
import { Song } from '../types/song.types';

export const useSong = () => {
  return useQuery<Song>({
    queryKey: ['song'],
    queryFn: fetchSongData,
  });
};