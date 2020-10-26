import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict:true,  // 开启严格模式  确保state 中的数据只能 mutations 修改
    state:{
        singer:{}
    },
    actions:{

    },
    mutations:{
        setSinger(state,msg){
            state.singer = msg
        }
    },
    getters:{

    }

})

export default store