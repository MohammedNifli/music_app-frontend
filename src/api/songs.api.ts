import { Song } from '../types/song.types';
import { songData } from '../data/songs.data';

export const fetchSongData = async (): Promise<Song> => {
    return songData;
  };