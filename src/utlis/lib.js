
export const getSlug = (email) => {
  return email.split(".").toString().replace(/,/gi, "_");
};

export const urlify = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank">${url}</a>`;
  });
};
