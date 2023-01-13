import styles from '../styles/Navbar.module.css';

export default function DropDownMenu(props) {
    return (
        <div className={styles.dropDownContainer}>
            <div className={`${styles.dropDownMenu} ${styles.outline}`}>
                {props.children}
            </div>
        </div>
    )
}