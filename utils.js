import dayjs from "dayjs";

export const formatDate = (date) => {
  return dayjs(date).format("D/MM/YYYY");
};

export const filterData = (data, filters) => {
  let filteredData = [...data];

  if (filters.age) {
    filteredData = filteredData.filter((item) => {
      return item.Age === filters.age;
    });
  }

  if (filters.gender) {
    filteredData = filteredData.filter((item) =>
      filters.gender?.split(",")?.includes(item.Gender)
    );
  }

  if (filters.startDate && filters.endDate) {
    const formattedStartDate = formatDate(filters.startDate);
    const formattedEndDate = formatDate(filters.endDate);
    filteredData = filteredData.filter((item) => {
      return item.Day >= formattedStartDate && item.Day <= formattedEndDate;
    });
  }

  return filteredData;
};
