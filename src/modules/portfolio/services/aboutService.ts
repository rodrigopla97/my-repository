import type { AxiosResponse } from "axios";
import axios from "axios";
import type { AboutContentType } from '@app/modules/portfolio/entities/entities';

// ── About Content ──────────────────────────────────────────────
export async function getAboutContent(): Promise<AxiosResponse<AboutContentType>> {
  return await axios.get<AboutContentType>(`/portfolio/about/content`);
}