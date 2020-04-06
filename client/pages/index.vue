<template>
  <div>
    <list-form v-model="isNewListOpened" @created="goToList"/>
    <v-card>
      <v-card-title class="primary white--text">
        <h3>Mes listes</h3>
        <v-spacer></v-spacer>
        <v-btn icon text dark @click="isNewListOpened = true">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-list class="mt-3">
          <template v-for="(list, index) in lists">
            <v-list-item :key="list.id" :to="`/list/${list.id}`" nuxt>
              <v-list-item-content>
                <v-list-item-title>{{ list.label }}</v-list-item-title>
                <v-list-item-subtitle>{{ list.description }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider v-if="index < lists.length -1" :key="`divider${index}`"></v-divider>
          </template>
        </v-list>
      </v-card-text>
      <template v-if="!lists.length">
        <v-row justify="center">
          <v-icon size="50" color="primary darken-1">mdi-lightbulb-on</v-icon>
        </v-row>
        <v-row justify="center" class="text--primary mt-4 pb-10">
          Aucune liste pour le moment,&nbsp;<a @click="isNewListOpened = true">ajoutez-en une</a>
        </v-row>
      </template>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ListForm from '@/components/ListForm';

export default {
  data: () => ({
    isNewListOpened: false,
  }),
  computed: {
    ...mapState([
      `lists`,
    ]),
  },
  methods: {
    goToList (list) {
      this.$router.push({
        path: `/list/${list.id}`,
      });
    },
  },
  components: {
    ListForm,
  },
};
</script>

<style lang="scss">
</style>
