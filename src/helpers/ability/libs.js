export function ObjMergeRecursive() {
  let dst = {},
    src,
    p,
    args = [].splice.call(arguments, 0)

  while (args.length > 0) {
    src = args.splice(0, 1)[0]
    if (toString.call(src) == '[object Object]') {
      for (p in src) {
        if (Object.prototype.hasOwnProperty.call(src, p)) {
          if (toString.call(src[p]) == '[object Object]') {
            dst[p] = ObjMergeRecursive(dst[p] || {}, src[p])
          } else {
            dst[p] = src[p]
          }
        }
      }
    }
  }

  return dst
}

export function esplitUnderlineToObjectNested(key) {
  const arr = key.split('_')
  const obj = {}

  const createDeepObject = (arr, obj) => {
    if (arr.length > 1) {
      obj[arr[0]] = {}
      createDeepObject(arr.slice(1), obj[arr[0]])
    } else {
      obj[arr[0]] = { _key: key }
    }
  }

  createDeepObject(arr, obj)
  return obj
}
