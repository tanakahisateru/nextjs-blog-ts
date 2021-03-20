import {PropsWithChildren, useState} from "react";
import classnames from "classnames";
import styles from "./alert.module.scss";

type AlertProps = PropsWithChildren<{
    type: "success" | "error",
}>;
export default function Alert({type, children}: AlertProps) {
    const [closed, setClosedState] = useState(false);

    if (closed) {
        return <></>;
    }

    const close = () => {
        setClosedState(true);
    };
    const classes = classnames({
        [styles.success]: type === 'success',
        [styles.error]: type === 'error',
    });
    return <div className={`${classes} px-8 py-2 my-6`}>
        {children}
        <button onClick={close}>CLOSE</button>
    </div>;
}
