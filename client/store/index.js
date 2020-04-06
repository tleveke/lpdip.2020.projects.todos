
import _ from 'lodash';

export const state = () => ({
  lists: [],
  todos: [],
});

export const mutations = {
  SET_LISTS (state, lists) {
    state.lists = lists;
  },
  ADD_LIST (state, list) {
    state.lists.push(list);
  },
  SET_LIST (state, list) {
    const listIndex = _.findIndex(state.lists, { id: list.id });
    state.lists[listIndex] = list;
    state.lists = _.clone(state.lists);
  },
  SET_TODOS (state, todos) {
    state.todos = todos;
  },
  ADD_TODO (state, todo) {
    state.todos.push(todo);
  },
  SET_TODO (state, todo) {
    const todoIndex = _.findIndex(state.todos, { id: todo.id });
    state.todos[todoIndex] = todo;
    state.todos = _.clone(state.todos);
  },
};

export const actions = {
  async fetchLists ({ commit }) {
    let lists = null;
    try {
      lists = await this.$axios.$get(`/api/lists`);
    } catch (e) {}
    return commit(`SET_LISTS`, lists || []);
  },
  async fetchTodos ({ state, commit }, force = false) {
    if (state.todos.length && !force) { return; }
    const { data: todos } = await this.$axios.get(`/api/todos`);
    return commit(`SET_TODOS`, todos);
  },
  async addList ({ state, commit }, list) {
    const { data: newList } = await this.$axios.post(`/api/lists`, list);
    commit(`ADD_LIST`, newList);
    return newList;
  },
  async updateList ({ state, commit }, list) {
    const { data: updatedList } = await this.$axios.put(`/api/lists/${list.id}`, list);
    commit(`SET_LIST`, updatedList);
    return updatedList;
  },
  async addTodo ({ commit }, todo) {
    const { data: newTodo } = await this.$axios.post(`/api/todos`, todo);
    commit(`ADD_TODO`, newTodo);
    return newTodo;
  },
  async toggleIsDone ({ state, commit }, id) {
    const todo = _.find(state.todos, { id });
    const { data: updatedTodo } = await this.$axios.put(`/api/todos/${id}`, {
      ...todo,
      isDone: !todo.isDone,
    });
    commit(`SET_TODO`, updatedTodo);
    return updatedTodo;
  },
  async removeTodo ({ state, commit }, id) {
    await this.$axios.delete(`/api/todos/${id}`);
    commit(`SET_TODOS`, _.reject(state.todos, { id }));
  },
};
