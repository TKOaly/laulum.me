import { basePath } from "@/next.config";

export const publicUrl = (path: string) =>
  basePath ? `${basePath}/${path}` : path;
