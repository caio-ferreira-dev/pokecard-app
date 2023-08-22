/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/PokeCard.module.css"

interface PokeCardProps {
    name: string | undefined
    type: string | undefined
    gifUrl: string | undefined
    bgUrl: string | undefined
    cardColor : string | undefined
    weakness: string[] | undefined
    effective: string[] | undefined
}

export default function PokeCard(props: PokeCardProps) {
    return(
        <div className={styles.pokeCardContainer} style={{backgroundColor: `${props.cardColor}`}}>
            <img className={styles.bg} src={props.bgUrl} alt={`${props.type} background}`}/>
            <div className={styles.gifContainer}>
                <img className={styles.gif} src={props.gifUrl} alt={`${props.name} gif`}/>
            </div>
            <h2>{props.name}</h2>
            <h3>{`Pokémon do tipo ${props.type}`}.</h3>
            <div className={styles.effectiveness}>
                <div>
                    <h4>Pode ser forte contra:</h4>
                    <p>{props.effective?.toString()}.</p>
                </div>
                <div>
                    <h4>Pode ser fraco contra:</h4>
                    <p>{props.weakness?.toString()}.</p>
                </div>
            </div>
        </div>
    )
}
