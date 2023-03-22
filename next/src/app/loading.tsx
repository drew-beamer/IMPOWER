import BaseLogo from "@/components/logos/base";
import styles from "../styles/loading.module.css"

export default function Loading() {
    return <div className="w-full h-[calc(100vh-55px)] flex items-center justify-center">
        <div className={`w-[150px] h-[150px] absolute ${styles.loadingIcon}`}>
            <BaseLogo />
        </div>
    </div>

}