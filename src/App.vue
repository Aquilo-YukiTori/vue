<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: MicrosoftYaHei;
  // text-align: center;
  width: 100vw;
  min-height: 100vh;
  background-color: #f7f8fa;
  color: rgba(69, 90, 100, 0.6);
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
