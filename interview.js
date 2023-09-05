// function permuteUnique(arr) {
//   const result = [];
//   const curIndexArr = [];

//   const dfs = (arr, curIndexArr, curIndex) => {
//     console.log(curIndex);
//     if (curIndexArr.length === arr.length) {
//       // 把索引转换成数据
//       result.push(curIndexArr.map((index) => arr[index]));
//       return;
//     }

//     for (let i = 0; i < arr.length; i++) {
//       let flag = false;
//       if (!curIndexArr.includes(curIndex)) {
//         // 把上一次的数加进来
//         curIndexArr.push(curIndex);
//         flag = true;
//       }
//       // 深搜
//       dfs(arr, curIndexArr, i);
//       // 回溯
//       if (flag) {
//         curIndexArr.pop();
//       }
//     }
//   };
//   dfs(arr, curIndexArr, 0);
//   return result;
// }

// console.log(permuteUnique([1, 2, 3]));

function permuteUnique(arr) {
  const result = [];
  const curIndexArr = [];

  const dfs = (arr, curIndexArr) => {
    if (curIndexArr.length === arr.length) {
      // 把索引转换成数据
      result.push(curIndexArr.map((index) => arr[index]));
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      let flag = false;
      if (!curIndexArr.includes(i)) {
        curIndexArr.push(i);
        flag = true;
        // 深搜
        dfs(arr, curIndexArr);
      }

      // 回溯
      if (flag) {
        curIndexArr.pop();
      }
    }
  };
  dfs(arr, curIndexArr);
  return result;
}

console.log(permuteUnique([1, 2, 3]));
