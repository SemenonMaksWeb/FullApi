<template>
  <header class="header-main">
    <container>
      <section class="section-header-main">
        <div class="wrapper-header-main">
          <div class="navbar-header-main">
            <font-awesome unicode="&#xf0c9;" />
          </div>
          <router-link to="/" class="logo">logo </router-link>
        </div>
        <div class="wrapper-header-main">
          <router-link to="/" class="icons_user_header-main">
            <font-awesome unicode="&#xf007;" />
          </router-link>
          <button class="icons_exit_header-main">Выход</button>
        </div>
      </section>
    </container>
  </header>
</template>

<script>
import Container from '@/components/base/container';
import FontAwesome from '@/components/base/font-awesome';
export default {
  name: 'the-header',
  components: { FontAwesome, Container },
};
</script>

<style lang="sass">
@import "src/assets/sass/the/the-header.sass"
</style>
