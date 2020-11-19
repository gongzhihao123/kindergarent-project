<template>
  <div class="index">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'index'
}
</script>

<style lang="scss">
.index {
  height: 100%;
  .hello{
    font-size: 18px;
    color:red;
  }
}

</style>
