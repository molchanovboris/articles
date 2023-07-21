/* eslint-disable @typescript-eslint/no-floating-promises */
import { Button, message, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { addArticle, updateArticle } from '../../../lib/store/articleSlice';
import { dateFormat } from '../../../lib/utils/dateFormat';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../lib/store/hooks';
import { TArticle } from '../ArticleList/ArticleList';
import styles from "./AddArticleForm.module.scss";

interface INewArticle {
    id: string | undefined;
    title: string;
    date: string;
    caregory: string;
    authorName: string;
    text: string;
}

export const AddArticleForm = () => {
    const { id } = useParams();
    const data: TArticle[] = useAppSelector(state => state.article.articles);
    const aticleData: TArticle | undefined = data.find((item) => item.id === id?.toString());

    const [messageApi, contextHolder] = message.useMessage();
    const currentDate = new Date();
    const formatDate = dateFormat(currentDate);

    const dispatch = useDispatch();

    const onFinish = (values: INewArticle) => {
        if (id) {
            values.date = formatDate;
            values.id = id
            dispatch(updateArticle(values));
            messageApi.success('Статья изменена успешно');
        } else {
            values.date = formatDate;
            dispatch(addArticle(values));
            messageApi.success('Статья создана успешно');
        }
    };

    const onFinishFailed = () => {
        messageApi.error('Что-то пошло не так');
    };

    return (
        <>
            {contextHolder}

            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 900, backgroundColor: 'white' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className={styles.articleForm}
            >
                <Link to="/">
                    <Button type='link'>
                        Назад
                    </Button>
                </Link>
                <h2>{aticleData ? "Редактировать статью" : "Новая статья"}</h2>
                <Form.Item
                    label="Заголовок"
                    name="title"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    initialValue={aticleData?.title}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Текст"
                    name="text"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    initialValue={aticleData?.text}
                >
                    <Input.TextArea rows={10} />
                </Form.Item>

                <Form.Item
                    label="Имя автора"
                    name="authorName"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    initialValue={aticleData?.authorName}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Категория"
                    name="caregory"
                    rules={[{ required: true, message: 'Please input your!' }]}
                    initialValue={aticleData?.caregory}
                >
                    <Input />
                </Form.Item>

                
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}