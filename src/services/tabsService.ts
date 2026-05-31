import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ActionsTabdataItem } from '../containers/entities/entities';

export type TabApiItem = ActionsTabdataItem & { id: string; order?: string };

export async function getTabs(): Promise<AxiosResponse<TabApiItem[]>> {
  return await axios.get<TabApiItem[]>('/portfolio/home/tabs');
}
