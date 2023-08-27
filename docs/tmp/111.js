let m = {}

Object.defineProperty(m, "key1", {
    get() {
        return this._key1
    },

    set(newVal) {
        m._key1 = newVal
    }
})

m.key1 = "value1"

let mm = {
    __proto__: m,
    "key2": "value2"
}

console.log(mm._key1)