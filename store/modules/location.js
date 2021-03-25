
const state = {
    longitude: null,
    latitude: null
};

const actions = {

};

const mutations = {
    setCordinates(state, payload) {
      
        state.longitude = payload.longitude;
        state.latitude = payload.latitude;
    },
};

const getters = {
    getCordinates(state) {
        return {
            longitude: state.longitude,
            latitude: state.latitude
        }
    }
}

export default {
    state,
    actions,
    mutations,
    getters
};
