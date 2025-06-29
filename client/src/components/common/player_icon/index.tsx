import type { Player } from '../../../utils/types'
import styles from './styles.module.css'
type Props = {
    playerData: Player
    hasTheTurn: boolean
}

export default function PlayerIcon(props: Props) {
    return <div
        className={styles.playerIcon_container}
        title={props.playerData.name}
    >
        <div className={[styles.icon, props.hasTheTurn ? styles.hasTurn : ''].join(' ')}
            style={{ background: props.playerData.color }}></div>
        {/* <p className={styles.name}>
            {props.playerData.name}
        </p> */}
    </div>
}