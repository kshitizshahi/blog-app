const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
    new Date(date)
  );
};

export default formatDate;
