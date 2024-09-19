import { useQuery } from '@tanstack/react-query';
import { Agent } from '../types/agent';

const getAgents = async (): Promise<Agent[]> => {
  const response = await fetch(
    `https://api.real-estate-manager.redberryinternship.ge/api/agents`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer 9cfee65c-3590-420c-8e46-7914f73113b5`,
      },
    }
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useAgentsData = () => {
  return useQuery({ queryKey: ['agents'], queryFn: getAgents });
};
