<template>
  <aside class="aside-main">
    <the-aside-link v-for="data in link" :key="data.id" :link="data" />
  </aside>
</template>

<script>
import TheAsideLink from '@/components/the-aside/the-aside-link';
export default {
  name: 'the-aside',
  components: { TheAsideLink },
  data() {
    return {
      link: [
        {
          id: 1,
          text: 'Главная',
          to: '/',
        },
        {
          id: 2,
          text: 'Вакансии',
          array: [
            {
              id: 4,
              text: 'Все вакансии',
              to: '/vacancy/',
            },
            {
              id: 5,
              text: 'Должности вакансии',
              to: '/vacancy/position',
            },
          ],
        },
        {
          id: 3,
          text: 'Пользователи',
          to: '/user',
        },
      ],
    };
  },
};
</script>

<style lang="sass">
@import "src/assets/sass/the/the-aside"
</style>
