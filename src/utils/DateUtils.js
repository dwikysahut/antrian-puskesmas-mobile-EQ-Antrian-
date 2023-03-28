const months = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];
const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu', 'Minggu'];

export const getMonthName = month => {
  return months[month];
};
export const getDayName = day => {
  return days[day];
};
export const dateListGenerate = () => {
  const dateList = [];

  for (let i = 0; i <= 7; i++) {
    const date = new Date();
    date.setDate(new Date().getDate() + i);
    //if minggu skip
    if (date.getDay() === 0) {
      continue;
    }
    dateList.push({
      key: date,
      date: date.getDate(),
      day: date.getDay(),
      dayName: getDayName(date.getDay() - 1),
      month: date.getMonth() + 1,
      monthName: getMonthName(date.getMonth()),
      year: date.getFullYear(),
    });
  }
  return dateList;
};
