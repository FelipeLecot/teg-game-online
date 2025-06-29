import styles from './styles.module.css'


export default function Card ({values}: {values: number[]}) {
    return <div
        key={Math.random()}
        className={styles.card}
    >
        <div>{values.map(val=>
            <div key={Math.random()}>{val}</div>
        )}</div>
    </div>
}