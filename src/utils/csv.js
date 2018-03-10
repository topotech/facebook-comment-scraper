export default (jsonData) => {
  const jsonColumnDefArray = Object.keys(jsonData[0]);
  let outputCsv = '\uFEFF';
  // set the column names
  for (let columnIndex = 0; columnIndex < jsonColumnDefArray.length; columnIndex += 1) {
    outputCsv += `"${jsonColumnDefArray[columnIndex].toString().trim()}",`;
  }
  outputCsv = outputCsv.slice(0, outputCsv.length - 1);
  outputCsv += '\r\n';
  // set the data
  for (let objectIndex = 0; objectIndex < jsonData.length; objectIndex += 1) {
    let eachLine = '';
    const row = jsonData[objectIndex];
    for (let columnIndex = 0; columnIndex < jsonColumnDefArray.length; columnIndex += 1) {
      const columnName = jsonColumnDefArray[columnIndex];
      eachLine += `"${row[columnName].toString().trim()}",`;
    }
    eachLine = eachLine.slice(0, eachLine.length - 1);
    outputCsv += `${eachLine}\r\n`;
  }
  return outputCsv;
};
