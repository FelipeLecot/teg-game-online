import { useGameValues } from "../../../pages/Game";
import type { Player } from "../../../utils/types"
import PlayerIcon from "../../common/player_icon";
import styles from './styles.module.css'

type Props = {
    list: Player[];
}


export default function PlayersList (props: Props) {
    const { turn } = useGameValues()
    const {list} = props
    return <ul className={styles.playersList}>
        {list.map((el, i)=>{
            return <PlayerIcon 
                playerData={el}
                hasTheTurn={i === turn}
            />
        })}
    </ul>
}