export const stringToArray = str => [].concat(str && str.match(/,/) ? str.split(/,\s?/) : str).filter(Boolean);

export const find = (str, markWord) => {
  const results = [];

  if (!markWord || !markWord.trim()) {
    return results;
  }

  let maxResults = 10;
  let slicedStr = str.toLowerCase();
  const lowercasedMarkWord = markWord.trim().toLowerCase();

  let cut = 0;
  while (slicedStr.indexOf(lowercasedMarkWord) !== -1 && maxResults > 0) {
    const foundResult = slicedStr.indexOf(lowercasedMarkWord);
    results.push(foundResult + cut);
    cut += foundResult + lowercasedMarkWord.length;
    slicedStr = slicedStr.slice(cut);
    maxResults -= 1;
  }

  return results.sort();
};
