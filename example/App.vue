<template>
  <div id="app">
    <div class="demo-item">
      <chrome-picker :value="colors" @input="updateValue"></chrome-picker>
    </div>
  </div>
</template>

<script>
import chrome from "../src/components/Chrome.vue";

let defaultProps = {
  hex: "#194d33e6",
  hsl: {
    h: 150,
    s: 0.5,
    l: 0.2,
    a: 0.9
  },
  hsv: {
    h: 150,
    s: 0.66,
    v: 0.3,
    a: 0.9
  },
  rgba: {
    r: 25,
    g: 77,
    b: 51,
    a: 0.9
  },
  a: 0.9
};

export default {
  components: {
    "material-picker": material,
    "compact-picker": compact,
    "grayscale-picker": grayscale,
    "swatches-picker": swatches,
    "slider-picker": slider,
    "sketch-picker": sketch,
    "chrome-picker": chrome,
    "photoshop-picker": photoshop
  },
  data() {
    return {
      colors: defaultProps
    };
  },
  computed: {
    bgc() {
      return this.colors.hex;
    }
  },
  methods: {
    onOk() {
      console.log("ok");
    },
    onCancel() {
      console.log("cancel");
    },
    updateValue(value) {
      this.colors = value;
    }
  },
  created() {}
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html {
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
}

.header-container {
  position: relative;
}
.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  min-height: 580px;
  background-color: #333;
  opacity: 0.5;
  z-index: 0;
}
.header {
  display: flex;
  max-width: 780px;
  margin: 0 auto;
  padding: 20px 0;
}
.intro-wrap {
  flex: 1;
  margin-right: 100px;
}
.intro {
  width: 300px;
  color: rgba(0, 0, 0, 0.65098);
}
.intro > h1 {
  font-size: 40px;
  font-weight: normal;
  line-height: 60px;
}
.intro > p {
  font-size: 16px;
  font-weight: normal;
  line-height: 22px;
}

.demo-container {
  max-width: 780px;
  min-height: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}
.demo-list {
  display: flex;
  margin-bottom: 20px;
}
.demo-item {
  position: relative;
  margin-bottom: 10px;
  margin: 0 10px 0 10px;
  z-index: 2;
}
.demo-item h2 {
  margin: 0;
  padding: 5px 0;
  color: #666;
  font-size: 16px;
  font-weight: normal;
}
</style>
