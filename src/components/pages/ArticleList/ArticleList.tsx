import { useState } from "react";
import { Button, Input, message } from 'antd';
import { SelectItem } from "../../atoms/SelectItem";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../lib/store/hooks";
import { removeArticle } from "../../../lib/store/articleSlice";
import styles from "./ArticleList.module.scss";
import { ArticleCard } from "../../organisms";
import { ArticlesFilterHeader } from "../../organisms/ArticlesFilterHeader/ArticlesFilterHeader";

export type TArticle = {
    id: string;
    title: string;
    date: string;
    caregory: string;
    authorName: string;
    text: string;
}

export const ArticleList = () => {
    const [dateFilter, setDateFilter] = useState("");
    const [authorFilter, setAuthorFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [searchValue, setSearchValue] = useState<string>("");
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useAppDispatch();

    const data: TArticle[] = useAppSelector(state => state.article.articles);

    const { Search } = Input;

    const handleChangeDate = (value: string) => {
        setDateFilter(value);
    };

    const handleChangeAuthor = (value: string) => {
        setAuthorFilter(value);
    };

    const handleChangeCategory = (value: string) => {
        setCategoryFilter(value);
    };

    const categoryTypes = Array.from(
        new Set(data.map(item => item.caregory)),
    );

    const dateTypes = Array.from(
        new Set(data.map(item => item.date)),
    );

    const authorTypes = Array.from(
        new Set(data.map(item => item.authorName)),
    );

    const dateFilterOptions = dateTypes.map((item, index) => {
        return {
            key: index,
            value: item,
            label: item
        }
    });

    const categoryFilterOptions = categoryTypes.map((item, index) => {
        return {
            key: index,
            value: item,
            label: item
        }
    });

    const authorFilterOptions = authorTypes.map((item, index) => {
        return {
            key: index,
            value: item,
            label: item
        }
    });

    const filterArrayByParams = (
        arr: TArticle[],
        authorFilter: string,
        categoryFilter: string,
        dateFilter: string,
        searchValue: string
    ) => {
        return arr.filter((item) => {
            if (authorFilter && item.authorName !== authorFilter) {
                return false;
            }

            if (categoryFilter && item.caregory !== categoryFilter) {
                return false;
            }

            if (dateFilter && item.date !== dateFilter) {
                return false;
            }

            if (searchValue && !item.title.toLowerCase().includes(searchValue.toLowerCase()) && !item.caregory.toLowerCase().includes(searchValue.toLowerCase())) {
                return false;
            }

            return true;
        });
    };


    const onSearch = (value: string) => {
        setSearchValue(value)
    };

    const filteredData = filterArrayByParams(data, authorFilter, categoryFilter, dateFilter, searchValue);


    const onDelete = (id: string) => {
        dispatch(removeArticle(id));
        messageApi.success('Статья удалена успешно');
    }

    return (
        <>
            {contextHolder}
            <div className={styles.articleListContainer}>
                <ArticlesFilterHeader
                    onSearch={onSearch}
                    handleChangeDate={handleChangeDate}
                    dateFilterOptions={dateFilterOptions}
                    handleChangeCategory={handleChangeCategory}
                    categoryFilterOptions={categoryFilterOptions}
                    handleChangeAuthor={handleChangeAuthor}
                    authorFilterOptions={authorFilterOptions}
                />
                {filteredData.length > 0 ? (
                    <div className={styles.articleList}>

                        {filteredData.map((item) => (
                            <div key={item.id}>
                                <ArticleCard item={item} onDelete={onDelete} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <h2>Ничего не найдено</h2>
                )}
            </div>
        </>
    )
}