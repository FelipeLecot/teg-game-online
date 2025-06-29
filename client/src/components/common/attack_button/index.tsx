import type { selectedCardType } from "../../../utils/clientTypes";
import styles from './styles.module.css'

type Props = {
    attack: Function;
    selectedCard: selectedCardType | undefined;
    targetCountry: string | undefined
}

export default function AttackButton({selectedCard, targetCountry, attack}: Props) {
    const handleAttack = ()=>{
        if(!selectedCard || !targetCountry) return 
        
        attack()
    }
  return (
    <button
        className={styles.button}
      onClick={()=>{handleAttack()}}
      style={{
        padding: "0.5rem 1rem",
        backgroundColor: targetCountry && selectedCard ? "crimson" : "gray",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: 'pointer',
      }}
    >
      ATTACK
    </button>
  )
}