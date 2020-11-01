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
  formats: {[key: string]: Format};
}

export interface Video extends VideoBasic {
  authorId: number;
}

export interface Format {
  res: string;
  size: number;
}

export interface TableRow {
  id: number;
  videoName: string;
  authorName: string;
  categoryName: string;
  highestQualityFormat: string;
  releaseDate: string;
}



