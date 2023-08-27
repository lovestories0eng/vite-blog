let url = 'http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe'

function getUrl(url, param) {
    let query = url.split('?')[1].split('#')[0]
    let ans = query.split('&')
    let res = {}

    for (let i = 0; i < ans.length; i++) {
        let re = ans[i].split('=')
        // 如果该键已经存在
        if (res.hasOwnProperty(re[0])) {
            res[re[0]].push(parseInt(re[1]))
        } else {
            res[re[0]] = [parseInt(re[1])]
        }
    }
    return param === undefined ? res : res[param]
}

console.log(getUrl(url))
console.log(getUrl(url, 'key'))