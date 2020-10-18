import axios from 'axios'

export default {
    state: {
        items: {
            data: []
        }

    },

    actions: {
        getUsers({ commit }) {
            return axios.get('users')
                .then(response => {
                    commit('SET_USER', response.data)
                });
        },

        loadUser(context, id) {
            return new Promise((resolve, reject) => {
                axios.get(`users/${id}`)
                    .then(response => resolve(response.data))
                    .catch(error => reject())
            })
        },


        storeUser(context, params) {
            return new Promise((resolve, reject) => {
                axios.post('users', params)
                    .then(response => resolve())
                    .catch(error => reject(error.response.data))

            })
        },

        updateUser(context, params) {
            return new Promise((resolve, reject) => {
                axios.put(`users/${params.id}`, params)
                    .then(response => { resolve() })
                    .catch(error => reject(error))

            })
        },

        destroyUser(context, id) {
            return new Promise((resolve, reject) => {
                axios.delete(`users/${id}`)
                    .then(response => { resolve() })
                    .catch(error => reject(error))

            })
        }
    },

    mutations: {
        SET_USER(state, users) {
            state.items = users
        }
    },

    getters: {

    }
}