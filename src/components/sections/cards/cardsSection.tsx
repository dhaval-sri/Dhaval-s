import MediaCard from "../../../shared-components/mediaCard/mediaCard"
import { ICardsSectionProps } from "./cardsSection.model"

export const CardsSection = ({ mediaCardsList }: ICardsSectionProps) => {
    return <div className="Home-games-row">
        {mediaCardsList.map((game, index) =>
            <MediaCard key={index} {...game} ></MediaCard>
        )}
    </div>
}