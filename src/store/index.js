import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        todoList: JSON.parse(window.localStorage.getItem('todoo') || '[]'),
        td: {}
    },
    mutations: {
        savethis(state, payload) {
            state.todoList.push(payload);
        },
        clearthis(state, payload) {
            state.todoList.splice(payload, 1);
        },
        clearallthis(state) {
            state.todoList = [];
        }
    },
    actions: {
        saveTodo (context, payload) {
            context.commit('savethis', payload)
        },
        clearTodo(context, payload) {
            context.commit('clearthis', payload)
        },
        clearTodoAll(context) {
            context.commit('clearallthis')
        },
    },
    getters: {
        todos (state) {
            return state.todoList
        }
    }
});
