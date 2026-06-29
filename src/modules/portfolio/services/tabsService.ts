import type { ActionsTabdataItem } from "@app/modules/portfolio/entities/entities";
import type { AxiosResponse } from "axios";
import axios from "axios";

export type TabApiItem = ActionsTabdataItem & { id: string; order?: string };

export async function getTabs(): Promise<AxiosResponse<TabApiItem[]>> {
  return await axios.get<TabApiItem[]>("/portfolio/home/tabs");
}
