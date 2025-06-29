import type { Player } from "../../../utils/types"
import PlayerIcon from "../../common/player_icon";
import styles from './styles.module.css'

type Props = {
    list: Player[];
    turn: number;
}


export default function PlayersList (props: Props) {
    const {list, turn} = props
    return <ul className={styles.playersList}>
        {list.map((el, i)=>{
            return <PlayerIcon 
                playerData={el}
                hasTheTurn={i === turn}
            />
        })}
    </ul>
}