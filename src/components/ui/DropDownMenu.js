import styles from '../../styles/DropDownMenu.module.css';

export default function DropDownMenu(props) {
    return <>
        {props.isOpen ?
            <div className={styles.container}>
                <div className={`${styles.menu} ${styles.outline}`}>
                    {props.children}
                </div>
            </div>
            :
            null}
    </>
}