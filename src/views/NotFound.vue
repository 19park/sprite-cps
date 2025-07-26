<script setup lang="ts">
</script>

<template>
  <div class="not-found">
    <p class="font-bold">존재하지 않는 페이지입니다.</p>
    <router-link to="/">[메인으로]</router-link>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  text-align: center;
  padding: 3rem 0;

  p {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
}
</style>