import { IContentTitleProps } from './contentTitle.model';
import './contentTitle.css';


export const ContentTitle = ({ title, hasTwoCol, children }: IContentTitleProps) => {
    return <div className={`${!hasTwoCol ? 'ContentTitle--one' : ''} ${!title?'Content-Title--noTitle':'Content-Title'}`}>
        {title && <h1 className={`ContentTitle__heading ${!hasTwoCol ? 'ContentTitle__heading--one' : ''}`}>{title}</h1>}
        <div className={`${!hasTwoCol ? 'ContentTitle-container--one' : 'ContentTitle-container--two'}`}>
            {children}
        </div>
    </div>
}
