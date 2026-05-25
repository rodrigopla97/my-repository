import type { AxiosResponse } from "axios";
import axios from "axios";
import { AboutContentType } from "../containers/entities/entities";

// ── About Content ──────────────────────────────────────────────
export async function getAboutContent(): Promise<AxiosResponse<AboutContentType>> {
  return await axios.get<AboutContentType>(`/portfolio/about/content`);
}