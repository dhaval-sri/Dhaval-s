import DOMPurify from "dompurify";
import { ITwoColContentProps } from "./twoColContent.model";

export function TwoColContent({ description, image, alt }: ITwoColContentProps) {

    const sanitizedHTML = DOMPurify.sanitize(description, { ADD_ATTR: ['target'] });

    return <>
        <p className="Home__description"
            dangerouslySetInnerHTML={{ __html: sanitizedHTML }}>
        </p>
        <img src={image} className="Home__img" alt={alt} />
    </>
}