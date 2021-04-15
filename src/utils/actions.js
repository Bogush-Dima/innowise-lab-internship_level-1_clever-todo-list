export const changeUserEmail = (user) => user.email.replace('.', '_');

export const formattingDateStrForFirebase = (date = new Date()) => {
  const dateStr = date.toLocaleDateString('en-us');
  const arr = dateStr.split('/');
  const newArr = arr.map((num) => (+num < 10 ? `0${num}` : num));
  const res = `${newArr[2]}-${newArr[0]}-${newArr[1]}`;
  return res;
};
