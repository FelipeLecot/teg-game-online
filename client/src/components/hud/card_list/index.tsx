import React from 'react';
import { useGameActions, useGameValues } from '../../../pages/Game';
import DiceCard from '../../common/dice_card';
import styles from './styles.module.css'

type Props = {
    list: number[][];
};

const CardList: React.FC<Props> = ({ list }) => {
    if (!list || list.length === 0) return null;

    const { setSelectedCard } = useGameActions();
    const { selectedCard } = useGameValues();

    return (
        <ul className={styles.cardList}>
            {list.map((values, index) => (
                <DiceCard
                    key={index}
                    values={values}
                    index={index}
                    total={list.length}
                    selected={selectedCard?.type === 'dice' && selectedCard.index === index}
                    onClick={() => setSelectedCard({ index, type: 'dice' })}
                />
            ))}
        </ul>
    );
};

export default CardList;
