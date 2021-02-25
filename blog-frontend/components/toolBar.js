import {useRouter} from "next/Router"
import styles from "../styles/ToolBar.module.css"

export const ToolBar = () => {
    const router = useRouter()

    return (
        <div className={styles.main}>
            <div onClick={() => router.push('/')}>Home</div>
            <div onClick={() => window.location.href = "https://www.linkedin.com/in/miguel-chiau-b328b6ba/"}>LinkedIn</div>
            <div onClick={() => window.location.href = "https://github.com/MiguelChiau"}>Github</div>
        </div>
    )
}

export default ToolBar