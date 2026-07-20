export interface StickerParams {
  page: number;
  per_page?: number;
  format_filter?: string;
  content_filter?: string;
  query?: string;
}

export interface StickerResponse {
  result: boolean;
  data: Stickers;
}

export interface Stickers {
  current_page: number;
  data: StickerData[];
  has_next: boolean;
  meta: {
    ad_max_resize_percent: number;
    item_min_width: number;
  };
  per_page: number;
}

export interface StickerData {
  id: string | number;
  blur_preview: string;
  slug: string;
  tags: string[];
  title: string;
  type: string;
  file: StickerFile;
}

export type StickerFile = Record<string, StickerFileSize | undefined> & {
  "240"?: StickerFileSize;
  "320"?: StickerFileSize;
  "400"?: StickerFileSize;
  hd?: StickerFileSize;
  md?: StickerFileSize;
  sm?: StickerFileSize;
  xs?: StickerFileSize;
};

export interface StickerFileSize {
  gif?: StickerAsset;
  png?: StickerAsset;
  webm?: StickerAsset;
  webp?: StickerAsset;
}

export interface StickerAsset {
  url: string;
  width: number;
  height: number;
  size: number;
}

export type StickerSelected = {
  id: string;
  url: string;
  title: string;
};

export type PreviewImage = {
  id: string;
  file: File;
  url: string;
};
