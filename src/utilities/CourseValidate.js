export const isProperTimeFormat = (timeString) => /^[0-9:]+$/.test(timeString);

export const isWithoutLeadingZero = (timeString) => !timeString.startsWith("0");
