import styles from "../../styles/background.module.css"

export default function Background() {
    return(
        //<div className={styles.Backg}></div> background1
        <div className={styles.Backg}>
            <div className={styles.lines}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
            <div className={"absolute bottom-0 right-0 h-15 w-15"}>
                <p className={"font-bold text-white/50 text-sm"}>Background by: kagjkasjg</p>
            </div>
        </div>
    )
}