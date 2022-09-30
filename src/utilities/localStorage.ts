
const KEY = "viewedCards";

export const setToLocalStorage=(id: string)=> {
    const oldArr = getFromLocalStorage()
    if (oldArr) {
        if ((oldArr.find((item)=>{return item == id }))) {
            return
        }
        oldArr.push(id)
        const jsonArr = JSON.stringify(oldArr);
        localStorage.setItem(KEY, jsonArr);
        return
    }
    const newArr = new Array
    newArr.push(id)
    const jsonArr = JSON.stringify(newArr);
    localStorage.setItem(KEY, jsonArr);
}

export const getFromLocalStorage = ():string[]|undefined => {
    const arr = localStorage.getItem(KEY);
    if (arr) {
        return JSON.parse(arr);
    }
}