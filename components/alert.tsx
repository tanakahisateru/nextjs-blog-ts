import classnames from "classnames";
import styles from "./alert.module.scss";
import {Component} from "react";

type AlertProps = {
    type: string,
};
type AlertState = {
    closed?: boolean,
};
export default class Alert extends Component<AlertProps, AlertState> {
    render() {
        if (this.state?.closed) {
            return <></>;
        }

        const {type, children} = this.props;
        const classes = classnames({
            [styles.success]: type === 'success',
            [styles.error]: type === 'error',
        });
        return <div className={`${classes} px-8 py-2 my-6`}>
            {children}
            <button
                onClick={() => {
                    this.close();
                }}
            >CLOSE</button>
            {/* or this.close.bind(this). this.close is simple function */}
        </div>;
    }

    private close() {
        this.setState({closed: true});
    }
}
