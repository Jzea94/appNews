export const formatDate = (isoString) => {
  const date = new Date(isoString);

  return date.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  })
}