import { createStore } from "vuex"; 
import http from "../http-common";

const store = createStore({
    state: {
        contacts: []
    },
    
    getters: {
        allContacts: state => state.contacts
    },
    
    actions: {
        async fetchContact({ commit }){
            const response = await http.get("/contacts");
            commit('setContact', response.data.reverse())
        },
        async addConstact({ commit }, contact){
            const newContact = await http.post("/contacts", contact);
            commit('newContact', newContact.data)
        },
        async removContact({ commit }, contacts){
            contacts.forEach( async element =>  {
                await http.delete(`/contacts/${element}`);
            });
            commit('deleteContact', contacts)
        }
    },
    
    mutations: {
        setContact: (state, contacts) => state.contacts = contacts,
        newContact: (state, contact) => state.contacts.unshift(contact),
        deleteContact: (state, contacts) => {
            var a = state.contacts.filter(e =>  !contacts.includes(e.id))
            state.contacts= []
            state.contacts.push(...a)
            return state.contacts
        },
    }
})

export default store