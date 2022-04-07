import React from "react";
import { TimelineCard } from "./timeline-card/timelineCard";
import './timeline.css';
import { ITimelineProps } from "./timeline.model";

export function Timeline({ timelineItem }: { timelineItem: ITimelineProps[] }) {
    // const dummyProp = [{
    //     title: 'VALORANT',
    //     description: 'Insane game. Do play',
    //     infoList: [{
    //         icon: ['fas', 'trophy'],
    //         text: 'Diamond'
    //     },
    //     {
    //         icon: ['far', 'calendar'],
    //         text: 'Apr 2018 - Aug 2019'
    //     }],
    //     skillsList: ['Shooter', 'FPS']
    // },
    // {
    //     title: 'League of Legends',
    //     description: "I'm so sick of this fkin company. You're TRASH! Fix the game! It sucks playing this shit and fcking addicted so I can't quit.\n- loltyler1",
    //     infoList: [{
    //         icon: ['fas', 'trophy'],
    //         text: 'Gold 1'
    //     },
    //     {
    //         icon: ['far', 'calendar'],
    //         text: 'Apr 2018 - Aug 2019'
    //     }],
    //     skillsList: ['MOBA', 'Action']
    // }];


    let cardIndex = 0;

    return (
        <div className="Timeline-container">
            {timelineItem.map(item => {
                return (
                    <React.Fragment key={cardIndex}>
                        {item.games.map((game, gameIndex) => (
                            <div className="Timeline" key={cardIndex++}>
                                {gameIndex == 0 && cardIndex % 2 != 0 &&
                                    <div className="Timeline-date text-center">
                                        {item.year}
                                    </div>
                                }
                                <TimelineCard {...game} panelDirection={cardIndex % 2 == 0 ? 'left' : 'right'} />
                                {gameIndex == 0 && cardIndex % 2 == 0 &&
                                    <div className="Timeline-date text-center">{item.year}</div>
                                }
                            </div>
                        ))
                        }
                    </React.Fragment>
                )
            })
            }
        </div>
    )
}