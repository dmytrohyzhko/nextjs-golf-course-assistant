import { GolfAvailability } from '@/app/types/golfAvailability';

export const searchAvailability = async (date: string): Promise<GolfAvailability[]> => {

  const response = await fetch(`/api/availabilities?date=${date}`);
  if (response.ok) {
    const data: GolfAvailability[] = await response.json();
    return data;
  } else {
    throw new Error('Error fetching availability');
  }
  
};
