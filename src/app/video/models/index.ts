export interface Category {
  id: number;
  name: string;
}

export interface Author {
  id: number;
  name: string;
}

export interface Video {
  id: number;
  name: string;
  releaseDate: string;
  catIds: number[];
  formats: Formats[];
}

export interface Formats {
  res: string;
  size: number;
}


