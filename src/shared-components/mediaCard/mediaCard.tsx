import { Button, Card, CardBody, CardFooter, CardImg } from "reactstrap";
import { IMediaCardProps } from "./mediaCard.model";
import './mediaCard.css';
import { logUserEvent } from "../../services/analytics.service";

const MediaCard = ({ img, alt, title, description, url, buttonText }: IMediaCardProps) => (
    <Card color="dark" className="text-white">
        <CardImg src={img} alt={alt} />
        <CardBody>
            <h5 className="card-title card-header">
                {title}
            </h5>
            <p className="card-text">
                {description}
            </p>
        </CardBody>
        <CardFooter>
            {buttonText&& url  && <Button onClick={() => openUrl(title, url)} block>
                {buttonText ?? 'Go to game page &rsaquo;'}
            </Button>}
        </CardFooter>
    </Card>
)

const openUrl = (title: string, url?: string) => {
    if (!url) return;
    window.open(url, '_blank');
    logUserEvent({
        content_type: 'Card item',
        content_id: title
    })
}

export default MediaCard;