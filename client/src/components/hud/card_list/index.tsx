import React from 'react';
import { useGameActions, useGameValues } from '../../../pages/Game';

type Props = {
    list: number[][];
};

const CardList: React.FC<Props> = ({ list }) => {
    if (!list || list.length === 0) return null;

    const totalCards = list.length;

    const generateStyles = () => {
        let css = `
            html, body {
                height: 100%;
            }

            body {
                background: radial-gradient(#333, #111);
                overflow: hidden;
            }

            .card-dice-list {
                bottom: 0;
                display: flex;
                height: 150px;
                padding: 0 50px;
                justify-content: center;
                position: fixed;
                left: 0;
                right: 0;
            }

            .card-in-hand {
                height: 150px;
                margin: 0 -25px;
                position: relative;
                width: 100px;
            }

            .card-in-hand:after {
                bottom: 0;
                content: '';
                left: -60px;
                position: absolute;
                right: -60px;
                top: 0;
                z-index: 10;
            }

            .card-face {
                bottom: 0;
                left: 0;
                pointer-events: none;
                position: absolute;
                right: 0;
                top: 0;
                transition: 800ms cubic-bezier(0.19, 1, 0.22, 1) transform;
            }

            .card-face:after {
                animation: none;
                background: #fff;
                bottom: 0;
                content: '';
                left: 0;
                opacity: 0;
                position: absolute;
                right: 0;
                top: 0;
            }

            .card-label {
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                font-size: 24px;
                font-weight: bold;
                letter-spacing: -0.025em;
                padding: 15px 0 0 15px;
            }

            @keyframes fade {
                0% {
                    opacity: 0.9;
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(1.15);
                }
            }
        `;

        for (let i = 0; i < totalCards; i++) {
            const hue = (i / totalCards) * -360;
            const rotationRange = 50;
            const rotation = ((i - (totalCards - 1) / 2) / (totalCards - 2)) * rotationRange;
            const offsetRange = 80;
            const offset = Math.abs(((i - (totalCards - 1) / 2) / (totalCards - 2)) * offsetRange);

            css += `
                .card-in-hand:nth-child(${i + 1}) .card-face {
                    background: linear-gradient(
                        -135deg,
                        hsla(${hue}, 100%, 80%, 1),
                        hsla(${hue}, 90%, 45%, 1)
                    );
                    box-shadow:
                        -5px 5px 5px hsla(0, 0%, 0%, 0.15),
                        inset 0 0 0 2px hsla(${hue}, 100%, 80%, 0.75);
                    transform: translateY(${offset}px) rotate(${rotation}deg);
                }

                .card-in-hand:nth-child(${i + 1}) .card-label {
                    color: hsla(${hue}, 100%, 43%, 1);
                    text-shadow: -0.025em 0.025em 0 hsla(${hue}, 100%, 75%, 1);
                }

                .card-in-hand:nth-child(${i + 1}):hover .card-face {
                    box-shadow:
                        0 10px 20px hsla(0, 0%, 0%, 0.4),
                        inset 0 0 0 2px hsla(${hue}, 100%, 80%, 0.75);
                    transform: translateY(-100px) rotate(0deg) scale(2);
                    transition-duration: 0ms;
                    z-index: 5;
                }

                .card-in-hand:nth-child(${i + 1}):hover .card-face:after {
                    animation: fade 250ms ease-out forwards;
                }

                .card-in-hand:nth-child(${i + 1}):hover:after {
                    top: -175px;
                }
            `;
        }

        return css;
    };

    const { setSelectedCard } = useGameActions();
    const { selectedCard } = useGameValues();
    const cardIsSelected = selectedCard && selectedCard.type === 'dice';

    return (
        <>
            <style>{generateStyles()}</style>
            <ul className="card-dice-list">
                {list.map((values, index) => (
                    <li key={index} className={`card-in-hand ${cardIsSelected && selectedCard.index === index ? 'selected' : ''}`} onClick={() => setSelectedCard({ index, type: 'dice' })}>
                        <div className="card-face">
                            <div className="card-label">{values.join(', ')}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default CardList;
