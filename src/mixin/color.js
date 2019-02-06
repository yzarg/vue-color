import tinycolor from "tinycolor2";

function _colorChange(data, oldHue) {
  var alpha = data && data.a;
  var color;
  // hsl is better than hex between conversions
  if (data && data.hsl) {
    color = tinycolor(data.hsl);
  } else if (data && data.hex && data.hex.length > 0) {
    color = tinycolor(data.hex);
  } else {
    color = tinycolor(data);
  }

  if (color && (color._a === undefined || color._a === null)) {
    color.setAlpha(alpha || 1);
  }
  var hsl = color.toHsl();
  var hsv = color.toHsv();

  if (hsl.s === 0) {
    hsv.h = hsl.h = data.h || (data.hsl && data.hsl.h) || oldHue || 0;
  }
  let cmyk = rgbToCMYK(color.toRgb().r, color.toRgb().g, color.toRgb().b);

  /* --- comment this block to fix #109, may cause #25 again --- */
  // when the hsv.v is less than 0.0164 (base on test)
  // because of possible loss of precision
  // the result of hue and saturation would be miscalculated
  // if (hsv.v < 0.0164) {
  //   hsv.h = data.h || (data.hsv && data.hsv.h) || 0
  //   hsv.s = data.s || (data.hsv && data.hsv.s) || 0
  // }

  // if (hsl.l < 0.01) {
  //   hsl.h = data.h || (data.hsl && data.hsl.h) || 0
  //   hsl.s = data.s || (data.hsl && data.hsl.s) || 0
  // }
  /* ------ */

  return {
    hsl: hsl,
    hex: color.toHexString().toUpperCase(),
    hex8: color.toHex8String().toUpperCase(),
    rgba: color.toRgb(),
    hsv: hsv,
    cmyk: cmyk,
    oldHue: data.h || oldHue || hsl.h,
    source: data.source,
    a: data.a || color.getAlpha()
  };
}
let rgbToCMYK = (r, g, b) => {
  var computedC = 0;
  var computedM = 0;
  var computedY = 0;
  var computedK = 0;

  //remove spaces from input RGB values, convert to int
  r = parseInt(("" + r).replace(/\s/g, ""), 10);
  g = parseInt(("" + g).replace(/\s/g, ""), 10);
  b = parseInt(("" + b).replace(/\s/g, ""), 10);

  // BLACK
  if (r == 0 && g == 0 && b == 0) {
    computedK = 1;
    return [0, 0, 0, 1];
  }

  computedC = 1 - r / 255;
  computedM = 1 - g / 255;
  computedY = 1 - b / 255;

  var minCMY = Math.min(computedC, Math.min(computedM, computedY));
  computedC = Math.round(((computedC - minCMY) / (1 - minCMY)) * 100);
  computedM = Math.round(((computedM - minCMY) / (1 - minCMY)) * 100);
  computedY = Math.round(((computedY - minCMY) / (1 - minCMY)) * 100);
  computedK = Math.round(minCMY * 100);

  return [computedC, computedM, computedY, computedK];
};

export default {
  props: ["value"],
  data() {
    return {
      val: _colorChange(this.value)
    };
  },
  computed: {
    colors: {
      get() {
        return this.val;
      },
      set(newVal) {
        this.val = newVal;
        this.$emit("input", newVal);
      }
    }
  },
  watch: {
    value(newVal) {
      this.val = _colorChange(newVal);
    }
  },
  methods: {
    colorChange(data, oldHue) {
      this.oldHue = this.colors.hsl.h;
      this.colors = _colorChange(data, oldHue || this.oldHue);
    },
    isValidHex(hex) {
      return tinycolor(hex).isValid();
    },
    simpleCheckForValidColor(data) {
      var keysToCheck = ["r", "g", "b", "a", "h", "s", "l", "v"];
      var checked = 0;
      var passed = 0;

      for (var i = 0; i < keysToCheck.length; i++) {
        var letter = keysToCheck[i];
        if (data[letter]) {
          checked++;
          if (!isNaN(data[letter])) {
            passed++;
          }
        }
      }

      if (checked === passed) {
        return data;
      }
    },
    paletteUpperCase(palette) {
      return palette.map(c => c.toUpperCase());
    },
    isTransparent(color) {
      return tinycolor(color).getAlpha() === 0;
    }
  }
};
