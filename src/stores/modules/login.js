
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
        localStorage.setItem("auth_user",payload.id);
    }
};



export default {
    state,
    getters,
    mutations,
}
