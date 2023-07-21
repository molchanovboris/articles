import { Button, Card } from "antd";
import { Link, useParams } from "react-router-dom";

import { TArticle } from "../ArticleList/ArticleList";
import ARTICLE_LIST from "../../../../article-list.json";
import styles from "./Article.module.scss";

export const Article = () => {

    const { id } = useParams();

    const data: TArticle[] = ARTICLE_LIST;
    const aticleData: TArticle | undefined = data.find((item) => item.id === id?.toString());

    return (
        <div className={styles.article}>
            <Link to="/">
                <Button>
                    Назад
                </Button>
            </Link>
            {aticleData ? (
                <Card title={aticleData.title} bordered={false}  extra={<Link to={`/`}>Назад</Link>}>
                    <h4>{aticleData.caregory} </h4>
                    <p>{aticleData.text} </p>
                    <p>{aticleData.authorName} </p>
                    <span>{aticleData.date} </span>
                </Card>
            ) : (
                <h2>Not Found</h2>
            )}
        </div>
    );
}