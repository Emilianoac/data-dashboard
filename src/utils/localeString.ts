function localeString(value: number) {
  return value.toLocaleString("cl-CL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default localeString;
