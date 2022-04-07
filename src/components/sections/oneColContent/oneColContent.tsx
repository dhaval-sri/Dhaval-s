import DOMPurify from "dompurify";
import { IOneColContentProps } from "./oneColContent.model";


export function OneColContent({ type, imgUrl, text, redirectUrl, alt }: IOneColContentProps) {

    const sanitizedHTML = text && DOMPurify.sanitize(text, { ADD_ATTR: ['target'] });

    return <>
        {type == 'text' && sanitizedHTML && <p className="Home__description"
            dangerouslySetInnerHTML={{ __html: sanitizedHTML }}>
        </p>}
        {type == 'image' && redirectUrl &&
            <a href={redirectUrl}>
                <img src={imgUrl} className="Home__img" alt={alt} />
            </a>
        }
        {type == 'image' && !redirectUrl &&
            <img src={imgUrl} className="Home__img" alt={alt} />
        }
    </>
}