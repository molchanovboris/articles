import { Button, Card } from 'antd';
import { Link } from "react-router-dom";
import { TArticle } from '../../pages';

interface IArticleCard {
    item: TArticle,
    onDelete: (id: string) => void
}

export const ArticleCard = (props: IArticleCard) => {
    const { item, onDelete } = props;
    return (
        <Card
            title={item.title}
            extra={<Link to={`/article/${item.id}`}>More</Link>}
            style={{ width: 300, marginBottom: 10 }}
            actions={[
                <Button type="link" danger onClick={() => onDelete(item.id)}>
                    Удалить
                </Button>,
                <Link to={`/edit/${item.id}`}>
                    <Button type="link">
                        Редактировать
                    </Button>
                </Link>,
            ]}
        >
            <p>{item.authorName}</p>
            <p>{item.caregory}</p>
            <p>{item.date}</p>
        </Card>
    )
}