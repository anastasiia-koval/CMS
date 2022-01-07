export const convertDate = (data) => {
  const dataNew = new Date(data);
  const year = dataNew.getFullYear();
  const month = dataNew.getMonth() + 1;
  const day = dataNew.getDate();
  let monthNumber = "";

  if (month < 10) {
    monthNumber = `0${month}`;
    return day + "." + monthNumber + "." + year;
  } else {
    return day + "." + month + "." + year;
  }
};
