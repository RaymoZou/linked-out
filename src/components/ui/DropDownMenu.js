import styles from '../../styles/DropDownMenu.module.css';

export default function DropDownMenu(props) {
    return <>
        {props.isOpen ?
            <div className={styles.dropDownContainer}>
                <div className={`${styles.dropDownMenu} ${styles.outline}`}>
                    {props.children}
                </div>
            </div>
            :
            null}
    </>
}