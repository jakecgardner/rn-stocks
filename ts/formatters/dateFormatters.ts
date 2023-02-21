import moment from 'moment';

export const newsQueryFormat = (date: moment.Moment) => {
  return moment(date).format('YYYY-MM-DD');
};

export const localeFormat = (date: moment.Moment) => {
  return moment(date).format('l');
};

