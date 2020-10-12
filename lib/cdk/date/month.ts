/**
 * get a 35 day list of current month
 *
 * @export
 * @param {Date} time
 * @returns
 */
export default function (time: Date) {
  const year = time.getFullYear();
  const month = time.getMonth();
  const lastDay = new Date(year, month + 1, 0);
  const firstDay = new Date(year, month, 1, 1);
  const lastAfterNum = 7 - lastDay.getDay();
  const firstBeforeNum = firstDay.getDay() - 1;
  const monthNum = lastDay.getDate() - firstDay.getDate() + 1;
  const dayList = [];
  for (let i = firstBeforeNum; i > 0; i--) {
    dayList.push({ time: new Date(year, month, 1 - i), in: false });
  }
  for (let i = 1; i <= monthNum; i++) {
    dayList.push({ time: new Date(year, month, i), in: true });
  }
  for (let i = 1; i <= lastAfterNum; i++) {
    dayList.push({ time: new Date(year, month, monthNum + i), in: false });
  }
  return dayList;
}
