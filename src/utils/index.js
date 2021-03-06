import firstletter from './dict.js'

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  if (isToday(date)) {
    return wx.dayjs(date).format('A HH:mm').replace('PM', '下午').replace('AM', '上午')
  }
  return getDate(date)
}

export function getDate (date, splitor = '/') {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}${splitor}${addZeroPrefix(month)}${splitor}${addZeroPrefix(day)}`
}

/**
 * 返回时分秒/时分
 * @export
 * @param {*} date
 * @param {boolean} [withSecond=false]
 * @returns
 */
export function getTime (date, withSecond = false) {
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return withSecond ? `${addZeroPrefix(hour)}:${addZeroPrefix(minute)}:${addZeroPrefix(second)}` : `${hour}:${addZeroPrefix(minute)}`
}

export function getFullDate (date) {
  return `${getDate(date)} ${getTime(date)}`
}

export function isToday (date) {
  return date.toDateString() === new Date().toDateString()
}

/**
 * 个位数，加0前缀
 * @param {*} number
 * @returns
 */
function addZeroPrefix (number) {
  return number < 10 ? `0${number}` : number
}

export function throttle (func, wait) {
  let timeout
  return function () {
    let that = this
    let args = arguments

    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null
        func.apply(that, args)
      }, wait)
    }
  }
}
export function formatDuration (time) {
  let interval = time
  let continued = ''
  if (interval > 3600) {
    const hour = Math.floor(interval / 3600)
    continued += hour + '小时'
    interval -= hour * 3600
  }
  if (interval > 60 && interval < 3600) {
    const min = Math.floor(interval / 60)
    continued += min + '分'
    interval -= min * 60
  }
  if (interval < 60) {
    continued += Math.floor(interval) + '秒'
  }
  return continued
}

// 获取中文字符首字母拼音
export function pinyin (raw) {
  const str = `${raw}`
  if (!str || /^ +$/g.test(str)) {
    return ''
  }
  let result = []
  for (let i = 0; i < str.length; i++) {
    let unicode = str.charCodeAt(i)
    let char = str.charAt(i)
    if (unicode >= 19968 && unicode <= 40869) {
      char = firstletter.charAt(unicode - 19968)
    }
    result.push(char)
  }
  return result.join('')
}
// 判断是否是json string
export function isJSON (str) {
  if (typeof str === 'string') {
    try {
      let obj = JSON.parse(str)
      return !!(typeof obj === 'object' && obj)
    } catch (e) {
      return false
    }
  }
}

// 将query对象转化为string
export function queryString (query) {
  let qr = ''
  for (let key in query) {
    if (query[key]) {
      qr += `&${key}=${encodeURIComponent(query[key])}`
    }
  }
  return qr.slice(1)
}

export default {
  formatNumber,
  formatTime,
  throttle,
  formatDuration,
  pinyin,
  isJSON
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

// encoder
// [https://gist.github.com/999166] by [https://github.com/nignag]
export function btoa (input) {
  const str = String(input)
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars, output = '';
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4)
    if (charCode > 0xFF) {
      throw new Error('\'btoa\' failed: The string to be encoded contains characters outside of the Latin1 range.')
    }
    block = block << 8 | charCode
  }
  return output
}

// decoder
// [https://gist.github.com/1020396] by [https://github.com/atk]
export function atob (input) {
  const str = (String(input)).replace(/[=]+$/, '') // #31: ExtendScript bad parse of /=
  if (str.length % 4 === 1) {
    throw new Error('\'atob\' failed: The string to be decoded is not correctly encoded.')
  }
  for (
    // initialize result and counters
    var bc = 0, bs, buffer, idx = 0, output = '';
    // get next character
    buffer = str.charAt(idx++); // eslint-disable-line no-cond-assign
    // character found in table? initialize bit storage and add its ascii value;
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
    // and if not first of each 4 characters,
    // convert the first 8 bits to one ascii character
    bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  ) {
    // try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer)
  }
  return output
}
