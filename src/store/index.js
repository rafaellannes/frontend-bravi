import Vue from 'vue'
import Vuex from 'vuex'

import users from './modules/users'
import contacts from './modules/contacts'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        users,
        contacts
    }

})

export default store