const chunkNewsArr = [];

function chunkArray(arrayData, chunkSize) {
  while (arrayData.length) {
    chunkNewsArr.push(arrayData.splice(0, chunkSize));
  }
}

export {chunkNewsArr, chunkArray}