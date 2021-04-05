// clinet端的 機體資訊
var u = navigator.userAgent

/*
* 是否為Email
*/
function isEmail(val) {
  let flag = false
  var emailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
  if (val.search(emailRule) !== -1) {
    flag = true
  }
  return flag 
}

/*
* 取得UUID
*/
function getUUID() {
  var d = Date.now()
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

  /*
  * val: 任意值
  * return  預設為正常,不對才會輸出False
  */
function isEmpty(val) {
  if (val === '' || val === undefined || val === null) {
      return true
  } else {
      return false
  }
}

/**
 * android终端
 */
function isAndroid() {
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
}

/**
 * ios终端
 */
 function isiOS() {
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

/**
 * 純數字驗證
 */
 function isDigit(s) {
  var patrn = /^[0-9]+$/
  if (!patrn.test(s)) return false
  return true
}

/**
 * 排序用
 */
function objKeySort(arys) {
  // 先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  var newkey = Object.keys(arys).sort()
  var newObj = {} // 创建一个新的对象，用于存放排好序的键值对
  for (var i = 0; i < newkey.length; i++) { // 遍历newkey数组
      newObj[newkey[i]] = arys[newkey[i]]// 向新创建的对象中按照排好的顺序依次增加键值对
  }
  return newObj // 返回排好序的新对象
}

// 將封裝的方法打包起來
export const jsFn = {
  getUUID,
  isEmpty,
  isAndroid,
  isiOS,
  isDigit,
  objKeySort,
  isEmail
}
