import { Ref, onMounted } from 'vue';
import { Store } from 'vuex';
import { GlobalState } from '@/store';

export default function useLoadMore(element:Ref<null|HTMLElement>,store:Store<GlobalState>,type:string){

    function loadMore(){
        // 获取可视区的高度
        let containerHeight = element.value?.clientHeight;
        let scorllTop = element.value?.scrollTop;
        let scorllHeight = element.value?.scrollHeight;
        if(containerHeight! + scorllTop! + 20 >= scorllHeight!){
            console.log('触底了');
        }
    }

    function debounce(fun:Function,wait:number){
        let timer:any;
        return function(){
        let args = arguments;
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
                fun(args);
                clearTimeout(timer);
            }, wait);
        }
    }

    onMounted(()=>{
        element.value?.addEventListener('scroll',debounce(loadMore,1000));
        console.log(6666,element.value?.parentNode)
    })

}