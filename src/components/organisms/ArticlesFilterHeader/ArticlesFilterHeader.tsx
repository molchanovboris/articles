import { Button, Input } from 'antd';
import styles from "./ArticlesFilterHeader.module.scss";
import { SelectItem } from '../../atoms';
import { Link } from 'react-router-dom';

interface IArticlesFilterHeader {
    onSearch: (value: string) => void;
    handleChangeDate: ((value: string, option: {
        key: number;
        value: string;
        label: string;
    } | {
        key: number;
        value: string;
        label: string;
    }[]) => void) | undefined,
    dateFilterOptions: {
        key: number;
        value: string;
        label: string;
    }[] | undefined,
    handleChangeCategory: ((value: string, option: {
        key: number;
        value: string;
        label: string;
    } | {
        key: number;
        value: string;
        label: string;
    }[]) => void) | undefined,
    categoryFilterOptions: {
        key: number;
        value: string;
        label: string;
    }[] | undefined,
    handleChangeAuthor: ((value: string, option: {
        key: number;
        value: string;
        label: string;
    } | {
        key: number;
        value: string;
        label: string;
    }[]) => void) | undefined,
    authorFilterOptions: {
        key: number;
        value: string;
        label: string;
    }[] | undefined,
}

export const ArticlesFilterHeader = (props: IArticlesFilterHeader) => {
    const {
        onSearch,
        handleChangeDate,
        dateFilterOptions,
        handleChangeCategory,
        categoryFilterOptions,
        handleChangeAuthor,
        authorFilterOptions
    } = props;

    const { Search } = Input;
    return (
        <div className={styles.articleListHeader}>
            <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />

            <SelectItem
                onChange={handleChangeDate}
                options={dateFilterOptions}
            />
            <SelectItem
                onChange={handleChangeCategory}
                options={categoryFilterOptions}
            />
            <SelectItem
                onChange={handleChangeAuthor}
                options={authorFilterOptions}
            />
            <Link to="/add">
                <Button type="primary" size={"large"}>
                    Добавить статью
                </Button>
            </Link>
        </div>
    )
}