import classnames from "classnames"
import styles from "./alert.module.scss"

export default function Alert({children, type}) {
    const classes = classnames({
        [styles.success]: type === 'success',
        [styles.error]: type === 'error',
    });
    return <div className={classes}>{children}</div>
}