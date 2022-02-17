const groupBy = (array, func) => {
 return array.reduce((acc, i) => {
    const group = func(i);
    if(acc[group]) {
      acc[group].push(i);
    } else {
      acc[group] = [i];
    }
    return acc;
  }, {})
}

console.log(groupBy([3.6, 3.7, 6.4, 8.9], Math.floor)) // { '3': [3.6, 3.7], '6': [6.4], '8': [8.9] }
