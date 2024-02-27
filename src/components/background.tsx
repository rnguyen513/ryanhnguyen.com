//import styles from "../../styles/background.module.css"
import styles from "../styles/background.module.css";

export default function Background() {
    return(
        //<div className={styles.Backg}></div> background1
        <div className={styles.Backg}>
            <div className={styles.lines}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
        </div>
    )
}