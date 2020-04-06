<template>
  <div>
    <v-card v-if="list">
      <v-card color="accent" dark flat tile>
        <v-card-title class="headline">
          <v-btn icon nuxt to="/" class="mr-2">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          {{ list.label }}
          <v-spacer></v-spacer>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="isUpdateListOpened = true">
                <v-list-item-title>Modifier</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-title>
        <v-card-subtitle class="mt-2" v-text="list.description" />
      </v-card>
      <v-card-text>
        <v-list>
          <template v-for="(todo, index) in todos">
            <v-list-item :key="`todo-${todo.id}`">
              <v-list-item-action class="mr-4">
                <v-checkbox
                  :input-value="todo.isDone"
                  color="accent"
                  :ripple="false"
                  @change="toggleIsDone(todo)"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="todo">{{ todo.label }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn color="grey" icon @click="removeTodo(todo)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider v-if="index < todos.length -1" :key="index"></v-divider>
          </template>
        </v-list>
        <template v-if="!todos.length">
          <v-row justify="center">
            <v-icon size="50" color="accent darken-1">mdi-bullseye-arrow</v-icon>
          </v-row>
          <v-row justify="center" class="text--primary mt-4 pb-7">
            Aucun élément dans cette liste pour le moment
          </v-row>
        </template>
        <v-list v-if="doneTodos.length">
          <v-subheader>Éléments terminés</v-subheader>
          <template v-for="(todo, doneIndex) in doneTodos">
            <v-list-item :key="`done-todo-${todo.id}`">
              <v-list-item-action class="mr-4">
                <v-checkbox
                  :input-value="todo.isDone"
                  color="accent"
                  :ripple="false"
                  @change="toggleIsDone(todo)"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="todo done grey--text">{{ todo.label }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn color="grey" icon @click="removeTodo(todo)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider v-if="doneIndex < doneTodos.length -1" :key="doneIndex"></v-divider>
          </template>
        </v-list>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-form @submit.native.prevent="addTodo()">
                  <v-row class="no-gutters">
                    <v-col>
                      <v-text-field
                        v-model="newTodoLabel"
                        ref="newLabel"
                        dense
                        outlined
                        hide-details
                        color="accent"
                        placeholder="Nouveau..."
                      ></v-text-field>
                    </v-col>
                    <v-btn
                      color="accent"
                      fab
                      small
                      dark
                      depressed
                      class="ml-3"
                      type="submit"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-row>
                </v-form>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
    <list-form v-model="isUpdateListOpened" :list="list" @updated="isUpdateListOpened = false"></list-form>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapState } from 'vuex';
import ListForm from '@/components/ListForm';

export default {
  data: () => ({
    isUpdateListOpened: false,
    newTodoLabel: ``,
  }),
  computed: {
    ...mapState({
      list (state) {
        return _.find(state.lists, { id: _.toInteger(this.$route.params.id) });
      },
      listTodos (state) {
        return _.filter(state.todos, { idList: this.list.id });
      },
    }),
    todos () {
      return _.filter(this.listTodos, { isDone: false });
    },
    doneTodos () {
      return _.filter(this.listTodos, { isDone: true });
    },
  },
  methods: {
    toggleIsDone (todo) {
      this.$store.dispatch(`toggleIsDone`, todo.id);
    },
    removeTodo (todo) {
      this.$store.dispatch(`removeTodo`, todo.id);
    },
    addTodo () {
      if (_.trim(this.newTodoLabel) === ``) { return; }
      this.$store.dispatch(`addTodo`, {
        label: this.newTodoLabel,
        idList: this.list.id,
      });
      this.newTodoLabel = ``;
    },
  },
  async beforeMount () {
    await this.$store.dispatch(`fetchTodos`);
  },
  mounted () {
    setTimeout(() => {
      if (this.$refs.newLabel) {
        this.$refs.newLabel.focus();
      }
    });
  },
  components: {
    ListForm,
  },
};
</script>

<style lang="scss">
  .todo {
    &.done {
      text-decoration: line-through;
      font-style: italic;
    }
  }
</style>
