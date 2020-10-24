export interface Category {
  id: number;
  name: string;
}

export interface Author {
  id: number;
  name: string;
}

export interface VideoBasic {
  id: number;
  name: string;
  releaseDate: string;
  catIds: number[];
}

export interface Video extends VideoBasic {
  authorId: number;
  formats: Format[];
}

export interface Format {
  res: string;
  size: number;
}



