// 防抖
export function debounce(fun:Function,wait:number){
    let timer:any;
    return function(...args:any){
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
            fun(args);
            clearTimeout(timer);
        }, wait);
    }
}

// 节流
export function throttle(fun:Function,wait:number){
    let date = 0;
    return function (...args:any) {
        const now = Date.now();
        if (now - date > wait) {
            fun(...args);
            date = now;
        }
    }
}
// export function throttle(fun:Function,wait:number){
//     let timer:any=null;
//     return function (...args:any) {
//         if(!timer){
//             timer = setTimeout(() => {
//                 fun(...args);
//                 timer = null;
//             }, wait);
//         }
//     }
// }


