<template>
  <div id="app">
    <transition name="page">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #444;
}

.demo-title {
  background-color: #f5f5f5;
  padding: 16px;
}

.demo-row {
  padding-left: $padding;
  position: relative;
  .border-bottom:last-child:after {
    content: none;
  }
  &:after {
    @include hairline(bottom);
  }
}

.button-row {
  padding-right: 12px;
  .button {
    margin: 6px !important;
  }
}
</style>
