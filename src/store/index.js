import Vue from "vue";
import Vuex from "vuex";
import { v4 as uuidv4 } from "uuid";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        todolist: null,
        msg: null,
    },
    getters: {
        getAllTodo: state => state.todolist,
        getCompletedTodo: state =>
            state.todolist.filter(({ completed }) => completed),
        getUncompletedTodo: state =>
            state.todolist.filter(({ completed }) => !completed),
    },
    mutations: {
        setTodoList: (state, payload) => {
            state.todolist = payload;
        },
        setMsg: (state, payload) => {
            state.msg = payload;
        },
    },
    actions: {
        fetchTodos: async ({ commit }) => {
            if (localStorage.todos) {
                const data = JSON.parse(localStorage.todos);
                commit("setTodoList", data);
            }
        },
        addTodo: ({ commit, dispatch }, payload) => {
            const id = uuidv4();
            if (localStorage.todos) {
                const data = JSON.parse(localStorage.todos);
                data.unshift({ todoName: payload, completed: false, _id: id });
                localStorage.todos = JSON.stringify(data);
            } else {
                localStorage.todos = JSON.stringify([
                    { todoName: payload, completed: false, _id: id },
                ]);
            }
            commit("setMsg", { sucMsg: "Todo added!" });
            dispatch("fetchTodos");
        },
        deleteTodos: ({ commit, dispatch }, payload) => {
            const data = JSON.parse(localStorage.todos);
            const newData = data.filter(todo => todo._id != payload);
            localStorage.todos = JSON.stringify(newData);
            dispatch("fetchTodos");
            commit("setMsg", { sucMsg: "Todo deleted!" });
        },
        updateTodo: ({ dispatch }, payload) => {
            const data = JSON.parse(localStorage.todos);
            const newData = data.filter(todo => todo._id != payload._id);
            newData.unshift(payload);
            localStorage.todos = JSON.stringify(newData);
            dispatch("fetchTodos");
        },
        completedTodo: ({ dispatch }, payload) => {
            const data = JSON.parse(localStorage.todos);
            data.forEach(todo => {
                if (todo._id == payload._id) {
                    todo.completed = payload.completed;
                }
            });
            localStorage.todos = JSON.stringify(data);
            dispatch("fetchTodos");
        },
        clearCompleted: ({ dispatch }) => {
            const data = JSON.parse(localStorage.todos);
            const newData = data.filter(todo => !todo.completed);
            localStorage.todos = JSON.stringify(newData);
            dispatch("fetchTodos");
        },
    },
    modules: {},
});
