import dayjs from 'dayjs';

export const formatDate = (date: Date, format?: string) => dayjs(date).format(format);
