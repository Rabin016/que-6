<template>
    <div
        class="rounded-xl border-2 border-green-500 bg-green-100 mt-3 p-3 shadow-lg"
    >
        <form class="p-5 flex items-center justify-between">
            <input
                class="w-full font-medium py-2 px-3 bg-gray-200 rounded-lg placeholder-gray-700 border-2 border-transparent focus:border-green-500 focus:bg-white transition-all duration-300"
                type="text"
                placeholder="Add todo here"
                v-model="newTodo"
            />
            <div class="p-1"></div>
            <button
                @click.prevent="submitTodo()"
                class="py-2 px-3 bg-green-500 rounded-lg text-gray-100 font-semibold hover:bg-gray-700 hover:text-gray-100 transition-all duration-300"
                type="submit"
            >
                Add
            </button>
        </form>
        <div class="py-2"></div>
        <ul class="font-semibold mx-4">
            <li
                v-for="todo in allTodos
                    ? getAllTodo
                    : completed
                    ? getCompletedTodo
                    : getUncompletedTodo"
                :class="
                    todo.completed
                        ? 'line-through text-gray-500 hover:text-gray-800'
                        : 'hover:text-gray-200'
                "
                :key="todo._id"
                class="p-3 mb-2 rounded-lg shadow flex justify-between items-center hover:bg-green-500  transition-all duration-300 cursor-pointer relative"
            >
                <input
                    type="checkbox"
                    v-model="todo.completed"
                    @change="completeTodo(todo)"
                />
                <div class="p-2 border-r border-gray-500"></div>
                <div class="p-1"></div>
                <label
                    class="w-full font-medium bg-transparent cursor-pointer"
                    @dblclick="editTodo(todo)"
                    >{{ todo.todoName }}</label
                >
                <input
                    type="text"
                    :class="todo == editedTodo ? 'absolute' : 'hidden'"
                    class="font-medium bg-green-100 hover:text-gray-900 focus:text-gray-900 focus:bg-green-100 rounded-lg p-2"
                    v-model="todo.todoName"
                    @blur="doneEdit(todo)"
                    @keyup.enter="doneEdit(todo)"
                    @keyup.esc="cancelEdit(todo)"
                />

                <div class="flex items-center">
                    <div class="border-l border-gray-400 p-2"></div>
                    <svg
                        @click.prevent="deleteTodo(todo._id)"
                        class="w-5 h-5 fill-current cursor-pointer text-red-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 384"
                    >
                        <path
                            d="M64 341.333C64 364.907 83.093 384 106.667 384h170.667C300.907 384 320 364.907 320 341.333v-256H64v256zM266.667 21.333L245.333 0H138.667l-21.334 21.333H42.667V64h298.666V21.333z"
                        />
                    </svg>
                </div>
            </li>
        </ul>
        <div class="p-5"></div>
        <div class="mx-4 text-xs text-gray-600">
            <button
                @click="clearCompleted()"
                class="float-right hover:text-green-500 transition-all duration-300"
            >
                Clear completed
            </button>
            <div class="flex items-center justify-center overflow-hidden">
                <button
                    @click="showAlltodos()"
                    :class="allTodos ? 'bg-green-500' : 'bg-gray-500'"
                    class=" py-1 px-2 rounded-lg text-gray-100 transition-all duration-300"
                >
                    All todos
                </button>
                <div class="p-1"></div>
                <button
                    @click="showCompleted()"
                    :class="completed ? 'bg-green-500' : 'bg-gray-500'"
                    class="py-1 px-2 rounded-lg text-gray-100 transition-all duration-300"
                >
                    Completed
                </button>
                <div class="p-1"></div>
                <button
                    @click="showUncompleted()"
                    :class="uncompleted ? 'bg-green-500' : 'bg-gray-500'"
                    class=" py-1 px-2 rounded-lg text-gray-100 transition-all duration-300"
                >
                    Uncompleted
                </button>
            </div>
            <div class="p-2"></div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "Home",
    data: () => ({
        newTodo: null,
        beforeEditCache: null,
        editedTodo: null,
        allTodos: true,
        completed: false,
        uncompleted: false,
    }),
    computed: {
        ...mapGetters(["getAllTodo", "getCompletedTodo", "getUncompletedTodo"]),
    },
    methods: {
        ...mapActions([
            "fetchTodos",
            "addTodo",
            "deleteTodos",
            "updateTodo",
            "completedTodo",
            "clearCompleted",
        ]),

        submitTodo() {
            this.addTodo(this.newTodo);
            this.newTodo = null;
        },
        deleteTodo(ids) {
            this.deleteTodos(ids);
        },
        editTodo(todo) {
            this.beforeEditCache = todo.todoName;
            this.editedTodo = todo;
        },
        doneEdit: function(todo) {
            if (!this.editedTodo) {
                return;
            }
            this.editedTodo = null;
            todo.todoName = todo.todoName.trim();
            this.updateTodo({
                _id: todo._id,
                todoName: todo.todoName,
                computed: false,
            });
            if (!todo.todoName) {
                this.removeTodo(todo);
            }
        },
        cancelEdit: function(todo) {
            this.editedTodo = null;
            todo.todoName = this.beforeEditCache;
        },
        completeTodo(todo) {
            this.completedTodo({
                _id: todo._id,
                completed: todo.completed,
                todoName: todo.todoName,
            });
        },
        showCompleted() {
            this.allTodos = false;
            this.completed = true;
            this.uncompleted = false;
        },
        showUncompleted() {
            this.allTodos = false;
            this.completed = false;
            this.uncompleted = true;
        },
        showAlltodos() {
            this.allTodos = true;
            this.completed = false;
            this.uncompleted = false;
        },
    },
    created() {
        this.fetchTodos();
    },
};
</script>
