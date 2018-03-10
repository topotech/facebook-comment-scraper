export default (data) => {
  const columns = Object.keys(data[0]);
  let outputCsv = '\uFEFF';

  // set the column names
  columns.forEach((column) => {
    const columnName = column.toString().trim();
    outputCsv += `"${columnName}",`;
  });
  outputCsv = outputCsv.slice(0, outputCsv.length - 1);
  outputCsv += '\r\n';

  // set the data
  data.forEach((row) => {
    let line = '';
    columns.forEach((column) => {
      let value = row[column].toString().trim();
      value = value.replace(/(\r|\n)/g, '');
      line += `"${value}",`;
    });
    line = line.slice(0, line.length - 1);
    outputCsv += `${line}\r\n`;
  });
  return outputCsv;
};
