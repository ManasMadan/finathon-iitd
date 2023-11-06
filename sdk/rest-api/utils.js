export const sendErrorResponse = (err, result, fields) => {
  if (err)
    return res
      .status(400)
      .json({ error: true, message: "Something Went Wrong" });
};

export const getTodayDateAsYYYYMMDD = () => {
  const date = new Date();
  const formattedDate = formatDateToYYYYMMDD(date);
  return formattedDate;
};

export const formatDateToYYYYMMDD = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
