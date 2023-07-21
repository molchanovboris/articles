/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { TArticle } from '../../components/pages/ArticleList/ArticleList';
import ARTICLE_LIST from "../../../article-list.json";
import { act } from 'react-dom/test-utils';

interface ArticleState {
    articles: TArticle[];
    // newArticle: TArticle | null;
}

const initialState: ArticleState = {
    articles: ARTICLE_LIST,
    // newArticle: null,
}
export const ARTICLE_SLICE_KEY = "article";

export const articleSlice = createSlice({
    name: ARTICLE_SLICE_KEY,
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addArticle: (state, action) => {
            const {
                title,
                date,
                caregory,
                authorName,
                text,
            } = action.payload;

            const article = {
                id: (Math.random() * 100).toString(),
                title,
                date,
                caregory,
                authorName,
                text
            };
            state.articles.push(article);
        },
        updateArticle: (state, action) => {
            const { articles } = state;
            state.articles = articles.map((item) => {
                const article: TArticle = action.payload;
                return item.id === article.id ? article : item
            });

        },
        removeArticle: (state, action) => {
            state.articles = state.articles.filter((article) => article.id !== action.payload);
        },
    },
})
export const { addArticle, updateArticle, removeArticle } = articleSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.article;

export default articleSlice.reducer