import {format, parseISO} from 'date-fns';
import {Component, ReactNode} from "react";

// export default function Date({ dateString }) {
//     const date = parseISO(dateString)
//     return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
// }

type DateProps = {
    dateString: string,
};
export default class Date extends Component<DateProps> {
    render() {
        return <time dateTime={this.props.dateString}>
            {format(parseISO(this.props.dateString), 'LLLL d, yyyy')}
        </time>;
    }
}