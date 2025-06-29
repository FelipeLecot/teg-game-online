
import DiceCard from '../../common/dice_card'
import styles from './styles.module.css'

type Props = {
    list: number[][]
}

export default function CardList(props: Props) {
    if(!props.list || props.list.length === 0) return 
    return <ul className={styles.cardList}>
        {props.list.map((values, index) => {
            return <DiceCard key={Math.random()} values={values} index={index} />
        })}
    </ul>
}