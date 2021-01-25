export default function (callbacks: Function) {
    let timer: any = null;
    let isMoving = false;
    return {
        touchStart: (e: any) => {
            // 类似与防抖
            console.log('start')
            let id = e.targetTouches[0].target.id;
            timer = setTimeout(() => {
                // 长按1s
                if(!isMoving){
                callbacks(id); // 执行长按的回调
                }
            }, 1000);
        },
        touchEnd: (e: any) => {
            clearTimeout(timer);
            isMoving = false;
        },
        touchMove: () => { 
            isMoving = true;
        }
    }
}
