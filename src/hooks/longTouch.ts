let timer: any = null;

export default function (callbacks: Function) {
    return {
        touchStart: (e: any) => {
            // 类似与防抖
            let id = e.targetTouches[0].target.id;
            timer = setTimeout(() => {
                // 长按1s
                callbacks(id); // 执行长按的回调
            }, 1000);
        },
        touchEnd: (e: any) => {
            clearTimeout(timer);
        }
    }
}
