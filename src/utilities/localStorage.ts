
const KEY = "viewedCards";

export const setCardToLocalStorage=(id: string)=> {
    const oldArr = getCardFromLocalStorage()
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

export const setToLocalStorage = (key: string, value: string) => {
    if(key&&value){
    localStorage.setItem(key, value);
	}
}


export const getCardFromLocalStorage = ():string[]|undefined => {
    const arr = localStorage.getItem(KEY);
    if (arr) {
        return JSON.parse(arr);
    }
}