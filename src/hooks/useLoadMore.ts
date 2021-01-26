import { debounce } from '@/utils/uiils';
import { Ref, onMounted, SetupContext } from 'vue';

export default function useLoadMore(element:Ref<null|HTMLElement>,ctx: SetupContext<Record<string, any>>){

    function loadMore(){
        // 获取可视区的高度
        let containerHeight = element.value?.clientHeight;
        let scorllTop = element.value?.scrollTop;
        let scorllHeight = element.value?.scrollHeight;
        if(containerHeight! + scorllTop! + 20 >= scorllHeight!){
            ctx.emit('loadMore');
        }
    }

    onMounted(()=>{
        element.value?.addEventListener('scroll',debounce(loadMore,1000));
    })

}