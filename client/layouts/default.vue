<template>
  <v-app>
    <v-row align="start" justify="center">
      <v-content>
        <v-container>
          <nuxt />
        </v-container>
      </v-content>
    </v-row>
  </v-app>
</template>

<script>
export default {
  async beforeMount () {
    await this.$store.dispatch(`fetchLists`);
  },
};
</script>

<style lang="scss">
  .v-content {
    margin-left: 20px;
    margin-right: 20px;
    max-width: 600px !important;
    margin-top: 50px;
  }
</style>
