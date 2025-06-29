import { useGameActions, useGameValues } from '../../../pages/Game'
import styles from './styles.module.css'


export default function DiceCard ({values, index}: {values: number[], index: number}) {
  const { setSelectedCard } = useGameActions()
  const { selectedCard } = useGameValues()
  const cardIsSelected = selectedCard && selectedCard.type === 'dice' && selectedCard.index === index
    return <div
        key={Math.random()}
        className={[styles.card, cardIsSelected ? styles.selected : ''].join(' ')}
        onClick={()=>{setSelectedCard({index: index, type: 'dice'})}}
    >
        <div>{values.map(val=>
            <div key={Math.random()}>{val}</div>
        )}</div>
    </div>
}