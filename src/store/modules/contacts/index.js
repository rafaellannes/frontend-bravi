import axios from 'axios'

export default {
    state: {


    },

    actions: {
        loadContactsByUser(context, id) {
            return axios.get(`contacts/${id}`)

        },

        storeContact(context, params) {
            return new Promise((resolve, reject) => {
                axios.post('contacts', params)
                    .then(response => resolve())
                    .catch(error => reject(error.response.data))

            })
        },

        loadContact(context, id) {
            return new Promise((resolve, reject) => {
                axios.get(`contact/${id}`)
                    .then(response => resolve(response.data))
                    .catch(error => reject())
            })
        },

        updateContact(context, params) {
            return new Promise((resolve, reject) => {
                axios.put(`contacts/${params.id}`, params)
                    .then(response => { resolve() })
                    .catch(error => reject(error))

            })
        },

        destroyContact(context, id) {
            return new Promise((resolve, reject) => {
                axios.delete(`contacts/${id}`)
                    .then(response => { resolve() })
                    .catch(error => reject(error))

            })
        }


    },

    mutations: {
        SET_CONTACTS_BY_USER(state, userContacts) {
            state.items = userContacts
        }
    },

    getters: {

    }
}