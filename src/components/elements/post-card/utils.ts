export const getInitials = (first_name: string, last_name: string) => {
  if (!first_name) return "";
  const first = first_name[0]?.toUpperCase() || "";
  const last = last_name?.[0]?.toUpperCase() || "";
  return `${first}${last}`;
}; 