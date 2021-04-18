import axios from 'axios'
const state = {
    userInfo : [],
    loginPopupActive:false
};

const getters = {
    USER_INFO : state => {
        return state.userInfo;
    },
    LOGIN_POPUP_ACTIVE : state => {
        return state.loginPopupActive;
    },
};

const mutations = {
    SET_LOGIN_POPUP_ACTIVE (state,payload){
        state.loginPopupActive = payload;
    },
    SET_USER_INFO (state, payload) {
        state.userInfo = payload;
    }
};

const actions  = {
    CONTACT_US_SUBMIT({commit},submitData){
        return new Promise((resolve,reject)=>{
            axios
                .post('https://jsonplaceholder.typicode.com/posts',{
                    submitData
                })
                .then(({data,status})=>{
                    if(status=== 201){
                        console.log(data)
                        resolve(true);
                    }
                })
                .catch(error=>{
                    reject(error);
                })            
        });
    },
};



export default {
    state,
    getters,
    mutations,
    actions
}
