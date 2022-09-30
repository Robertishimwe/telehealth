import getDate from '../utils/date';

const isBeforeToday = (appointmentDate) => {
  return getDate(appointmentDate) < getDate(new Date());
};

export default isBeforeToday