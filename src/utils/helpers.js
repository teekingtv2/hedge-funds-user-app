import { toast } from 'react-toastify';

export const successNotification = (message) => toast.success(message);
export const errorNotification = (message) => toast.error(message);
export const infoNotification = (message) => toast.info(message);

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const dateFormatter = (date) => {
  var dateString = new Date(date).toString();
  var splittedDateString = dateString.split(' ');
  var day = splittedDateString[0];
  var day2 = splittedDateString[1];
  var month = splittedDateString[2];
  var year = splittedDateString[3];
  var formatttedDate = `${day}, ${day2} ${month}, ${year}`;
  return formatttedDate;
};
