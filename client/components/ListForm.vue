<template>
  <v-dialog
    v-model="isOpened"
    persistent
    width="500"
  >
    <v-card>
      <v-card-title class="mb-4">
        <template v-if="isCreateMode">Nouvelle liste</template>
        <template v-else>Modifier une liste</template>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="$list.label"
          label="Label"
          ref="label"
          outlined
          hide-details
          required
          class="mb-4"
        ></v-text-field>
        <v-textarea
          v-model="$list.description"
          label="Description"
          outlined
          hide-details
          no-resize
          rows="6"
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="close()">Annuler</v-btn>
        <v-btn color="primary" :disabled="isSubmitting" @click="submit()">
          <template v-if="isCreateMode">Ajouter</template>
          <template v-else>Modifier</template>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: [`value`, `list`],
  data: () => ({
    isSubmitting: false,
  }),
  computed: {
    isOpened: {
      get () { return this.value; },
      set (value) { this.$emit(`input`, value); },
    },
    $list () {
      let list = {
        label: ``,
        description: ``,
      };
      if (!this.isCreateMode) {
        list = {
          ...list,
          ...this.list,
        };
      }

      return list;
    },
    isCreateMode () {
      return !this.list || !this.list.id;
    },
  },
  methods: {
    close () {
      this.isOpened = false;
    },
    async submit () {
      if (!this.$list.label) { return; }

      this.isSubmitting = true;
      if (this.isCreateMode) {
        const list = await this.$store.dispatch(`addList`, this.$list);
        this.$emit(`created`, list);
      } else {
        const list = await this.$store.dispatch(`updateList`, this.$list);
        this.$emit(`updated`, list);
      }
      this.isSubmitting = false;
    },
  },
  watch: {
    isOpened (isOpened) {
      if (isOpened) {
        this.label = ``;
        this.description = ``;
        setTimeout(() => {
          this.$refs.label.focus();
        });
      }
    },
  },
};
</script>
