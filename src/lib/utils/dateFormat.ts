import { format } from 'date-fns';

export const dateFormat = (date: Date) => {
    return format(date, 'yyyy-MM-dd');
}