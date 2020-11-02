<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  data() {},
  props: {
    rules: {
      type: [Object, null], // {xxx: [{type: 'xxx', args: [], triger: 'change/blur/input/none'}]}
      default: null
    },
    value: {
      type: Object,
      required: true
    }
  },
  provide: {},
  computed: {},
  methods: {
    validator() {}
  }
};
</script>
