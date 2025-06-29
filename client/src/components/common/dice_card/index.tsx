import { useGameActions, useGameValues } from '../../../pages/Game';

type DiceCardProps = {
    values: number[];
    index: number;
};

export default function DiceCard({ values, index }: DiceCardProps) {
    const { setSelectedCard } = useGameActions();
    const { selectedCard } = useGameValues();
    const cardIsSelected = selectedCard && selectedCard.type === 'dice' && selectedCard.index === index;

    return (
        <div
            className={`card-in-hand ${cardIsSelected ? 'selected' : ''}`} // Add a class if selected
            onClick={() => setSelectedCard({ index, type: 'dice' })}
        >
            <div className="card-face">
                <div className="card-label">{values.join(', ')}</div>
            </div>
        </div>
    );
}
