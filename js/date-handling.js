/**
 * Formats a date to ISO String
 * @param {*} date the date to format
 * @return {*} formatted date (e.g. 2019-11-08)
 */
function formatDateToIsoString(date) {
  const dateDay = date.getUTCDate();
  const dateMonth = date.getUTCMonth() + 1;
  const dateYear = date.getUTCFullYear();
  return `${dateYear}-${dateMonth.toString().padStart(2, '0')}-${dateDay.toString().padStart(2, '0')}`;
}
