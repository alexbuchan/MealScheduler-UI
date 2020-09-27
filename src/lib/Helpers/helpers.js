export const modulo = (x, m) => {
  return (x % m + m) % m;
};

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}