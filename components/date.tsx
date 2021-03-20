import {format, parseISO} from 'date-fns';

type DateProps = {
    dateString: string,
};
export default function Date({dateString}: DateProps) {
    return <time dateTime={dateString}>
        {format(parseISO(dateString), 'LLLL d, yyyy')}
    </time>;
}
