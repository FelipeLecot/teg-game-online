import Card from "../../common/card"
import styles from './styles.module.css'

type Props = {
    list: number[][]
}

export default function CardList(props: Props) {
    if(!props.list || props.list.length === 0) return 
    return <ul className={styles.cardList}>
        {props.list.map(values => {
            return <Card key={Math.random()} values={values} />
        })}
    </ul>
}