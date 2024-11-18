const calculateNights = (
  startDate: string | Date | null,
  endDate: string | Date | null
): number => {
  if (!startDate || !endDate) return 0;

  // Ensure that both startDate and endDate are Date objects
  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;

  // Calculate the number of nights
  const nights = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 3600 * 24)
  );

  return nights > 0 ? nights : 0; // Ensure no negative values
};

export default calculateNights;
