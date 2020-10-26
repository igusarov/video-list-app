import { Author, Category, Video } from '../../models';
import { createSelector } from '@ngrx/store';
import { AppState } from '../../../app.state';

export interface TableRow {
  videoName: string;
  authorName: string;
  categoryName: string;
  highestQualityFormat: string;
  releaseDate: string;
}

const getAuthorName = (authors: Author[], authorId: number): string => {
  const foundAuthor = authors.find((author) => author.id === authorId);
  return foundAuthor && foundAuthor.name;
};

const getCategoryName = (categories: Category[], catIds: number[]): string => {
  return catIds.map((id) => {
    const foundCategory = categories.find((category) => category.id === id);
    return foundCategory && foundCategory.name;
  }).join(', ');
};

const parseResolution = (res: string) => parseInt(res.replace(/[^0-9]/g, ''), 10);

const getHighestQualityFormat = (video: Video): string => {
  const entries = Object.entries(video.formats);
  if (!entries.length) {
    return '';
  }
  const [key, val] = entries.sort(([, a], [, b]) => {
    const resA = parseResolution(a.res);
    const resB = parseResolution(b.res);
    if (resA === resB) {
      return a.size < b.size ? 1 : -1;
    } else {
      return resA < resB ? 1 : -1;
    }
  })[0];

  return `${key} ${val.res}`;
};

export const getTableRows = createSelector<AppState, Video[], Author[], Category[], TableRow[]>(
  (state) => state.video.items,
  (state) => state.author.items,
  (state) => state.category.items,
  (videos, authors, categories) => {
    return videos.map((video) => ({
      videoName: video.name,
      authorName: getAuthorName(authors, video.authorId),
      categoryName: getCategoryName(categories, video.catIds),
      highestQualityFormat: getHighestQualityFormat(video),
      releaseDate: video.releaseDate,
    }));
  }
);
