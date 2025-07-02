import React from 'react';
import styles from './styles.module.css';

type Props = {
    values: number[];
    index: number;
    total: number;
    selected: boolean;
    onClick: () => void;
};

const DiceCard: React.FC<Props> = ({ values, index, total, selected, onClick }) => {
    const hue = (index / total) * -360;
    const rotationRange = 50;
    const offsetRange = 80;
    const mid = (total - 1) / 2;
    const rotation = ((index - mid) / (total - 2 || 1)) * rotationRange;
    const offset = Math.abs(((index - mid) / (total - 2 || 1)) * offsetRange);

    const faceStyle: React.CSSProperties = {
        background: `linear-gradient(-135deg, hsla(${hue}, 100%, 80%, 1), hsla(${hue}, 90%, 45%, 1))`,
        boxShadow: selected
            ? `0 10px 20px hsla(0, 0%, 0%, 0.4), inset 0 0 0 2px hsla(${hue}, 100%, 80%, 0.75)`
            : `-5px 5px 5px hsla(0, 0%, 0%, 0.15), inset 0 0 0 2px hsla(${hue}, 100%, 80%, 0.75)`,
        transform: selected
            ? 'translateY(-50px) rotate(0deg) scale(1.1)'
            : `translateY(${offset}px) rotate(${rotation}deg)`,
        transition: selected ? 'none' : '800ms cubic-bezier(0.19, 1, 0.22, 1)',
        zIndex: selected ? 5 : 1,
    };

    const labelStyle: React.CSSProperties = {
        color: `hsla(${hue}, 100%, 43%, 1)`,
        textShadow: `-0.025em 0.025em 0 hsla(${hue}, 100%, 75%, 1)`,
    };

    return (
        <li
            className={`${styles.card} ${selected ? styles.selected : ''}`}
            onClick={onClick}
        >
            <div className={styles.face} style={faceStyle}>
                <div className={styles.label} style={labelStyle}>
                    <p>{values[0]}</p>
                    <p>{values[1]}</p>
                    <p>{values[2]}</p>
                </div>
            </div>
        </li>
    );
};

export default DiceCard;
