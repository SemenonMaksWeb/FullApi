<template>
  <header class="header-main">
    <container>
      <section class="section-header-main">
        <div class="wrapper-header-main">
          <the-header-navbar />
          <router-link to="/" class="logo">logo </router-link>
        </div>
        <div class="wrapper-header-main">
          <router-link to="/" class="icons_user_header-main">
            <font-awesome unicode="&#xf007;" />
          </router-link>
          <the-header-exit />
        </div>
      </section>
    </container>
  </header>
</template>

<script>
import Container from '@/components/base/container';
import FontAwesome from '@/components/base/font-awesome';
import TheHeaderNavbar from '@/components/the-header/the-header-navbar';
import TheHeaderExit from '@/components/the-header/the-header-exit';
export default {
  name: 'the-header',
  components: { TheHeaderExit, TheHeaderNavbar, FontAwesome, Container },
};
</script>

<style lang="sass">
@import "src/assets/sass/the/the-header.sass"
</style>
