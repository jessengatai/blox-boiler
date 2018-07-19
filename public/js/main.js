'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * The timing used for the debounce of functions within blox events
 * @return {int} the timing in milliseconds
 */
var bloxDebounceTiming = function bloxDebounceTiming() {
  return 50;
};

/**
 * Debounce a function
 * - Courtesy of Mr Walsh - https://davidwalsh.name/javascript-debounce-function
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function bloxDebounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;
    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

/**
 * Get classes from a data attribute
 * @param  {string} attr The name of the attribute
 * @return {mixed}       An array or null
 */
var bloxDataClasses = function bloxDataClasses(object, attr) {
  var classes = object.getAttribute(attr);
  return bloxIsset(classes) ? classes.split(' ') : null;
};

/**
 * Get callback from a data attribute
 * @param  {string} attr The name of the attribute
 * @return {mixed}       A string or null
 */
var bloxDataString = function bloxDataString(object, attr) {
  var callback = object.getAttribute(attr);
  return bloxIsset(callback) ? callback : null;
};

/**
 * Quickly change the styles of an element
 * @param  {[type]} element   The element we are going to change
 * @param  {[type]} styles    The styles we are adding to the element
 */
var bloxCSS = function bloxCSS(element, styles) {
  Object.assign(element.style, styles);
};

/**
 * Check wether a value is set
 * - similar to php isset
 * @param {mixed} value Can be anything from a string to an array
 * @return {bool}
 */
var bloxIsset = function bloxIsset(value) {
  return typeof value != 'undefined' && value ? true : false;
};

/**
 * Check if an element has any of the classes passed (via array)
 * - useful for nodes
 * @param  {object} element The element to check the class array against
 * @param  {array} array    The array of classes to check for
 * @return {bool}           A boolean of true or false if classes were / were not found
 */
var bloxHasClass = function bloxHasClass(element, arr) {
  var bool = false;
  // array
  if (Array.isArray(arr)) {
    arr.every(function (c) {
      if (element.classList.contains(c)) {
        bool = true;
      }
    });
    // string
  } else if (element.classList.contains(arr)) {
    bool = true;
  }
  return bool;
};

/**
 * Sanitize a string
 * @param  {string} string The string of text to clean
 * @return {string}        The shiny new clean string
 */
var bloxSanitize = function bloxSanitize(string) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    "/": '&#x2F;'
  };
  var reg = /[&<>"'/]/ig;
  return string.replace(reg, function (match) {
    return map[match];
  });
};

/**
 * w3color.js ver.1.18
 * - by w3schools.com (Do not remove this line)
 * - I've had to fix some issues with variables not being set and will consider just writting my own converter
 * @return {[type]} [description]
 */
(function () {
  function w3color(color, elmnt) {
    if (!(this instanceof w3color)) {
      return new w3color(color, elmnt);
    }
    if ((typeof color === 'undefined' ? 'undefined' : _typeof(color)) == "object") {
      return color;
    }
    this.attachValues(toColorObject(color));
    if (elmnt) {
      elmnt.style.backgroundColor = this.toRgbString();
    }
  }
  w3color.prototype = {
    toRgbString: function toRgbString() {
      return "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")";
    },
    toRgbaString: function toRgbaString() {
      return "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.opacity + ")";
    },
    toHwbString: function toHwbString() {
      return "hwb(" + this.hue + ", " + Math.round(this.whiteness * 100) + "%, " + Math.round(this.blackness * 100) + "%)";
    },
    toHwbStringDecimal: function toHwbStringDecimal() {
      return "hwb(" + this.hue + ", " + this.whiteness + ", " + this.blackness + ")";
    },
    toHwbaString: function toHwbaString() {
      return "hwba(" + this.hue + ", " + Math.round(this.whiteness * 100) + "%, " + Math.round(this.blackness * 100) + "%, " + this.opacity + ")";
    },
    toHslString: function toHslString() {
      return "hsl(" + this.hue + ", " + Math.round(this.sat * 100) + "%, " + Math.round(this.lightness * 100) + "%)";
    },
    toHslStringDecimal: function toHslStringDecimal() {
      return "hsl(" + this.hue + ", " + this.sat + ", " + this.lightness + ")";
    },
    toHslaString: function toHslaString() {
      return "hsla(" + this.hue + ", " + Math.round(this.sat * 100) + "%, " + Math.round(this.lightness * 100) + "%, " + this.opacity + ")";
    },
    toCmykString: function toCmykString() {
      return "cmyk(" + Math.round(this.cyan * 100) + "%, " + Math.round(this.magenta * 100) + "%, " + Math.round(this.yellow * 100) + "%, " + Math.round(this.black * 100) + "%)";
    },
    toCmykStringDecimal: function toCmykStringDecimal() {
      return "cmyk(" + this.cyan + ", " + this.magenta + ", " + this.yellow + ", " + this.black + ")";
    },
    toNcolString: function toNcolString() {
      return this.ncol + ", " + Math.round(this.whiteness * 100) + "%, " + Math.round(this.blackness * 100) + "%";
    },
    toNcolStringDecimal: function toNcolStringDecimal() {
      return this.ncol + ", " + this.whiteness + ", " + this.blackness;
    },
    toNcolaString: function toNcolaString() {
      return this.ncol + ", " + Math.round(this.whiteness * 100) + "%, " + Math.round(this.blackness * 100) + "%, " + this.opacity;
    },
    toName: function toName() {
      var r,
          g,
          b,
          colorhexs = getColorArr('hexs');
      for (i = 0; i < colorhexs.length; i++) {
        r = parseInt(colorhexs[i].substr(0, 2), 16);
        g = parseInt(colorhexs[i].substr(2, 2), 16);
        b = parseInt(colorhexs[i].substr(4, 2), 16);
        if (this.red == r && this.green == g && this.blue == b) {
          return getColorArr('names')[i];
        }
      }
      return "";
    },
    toHexString: function toHexString() {
      var r = toHex(this.red);
      var g = toHex(this.green);
      var b = toHex(this.blue);
      return "#" + r + g + b;
    },
    toRgb: function toRgb() {
      return { r: this.red, g: this.green, b: this.blue, a: this.opacity };
    },
    toHsl: function toHsl() {
      return { h: this.hue, s: this.sat, l: this.lightness, a: this.opacity };
    },
    toHwb: function toHwb() {
      return { h: this.hue, w: this.whiteness, b: this.blackness, a: this.opacity };
    },
    toCmyk: function toCmyk() {
      return { c: this.cyan, m: this.magenta, y: this.yellow, k: this.black, a: this.opacity };
    },
    toNcol: function toNcol() {
      return { ncol: this.ncol, w: this.whiteness, b: this.blackness, a: this.opacity };
    },
    isDark: function isDark(n) {
      var m = n || 128;
      return (this.red * 299 + this.green * 587 + this.blue * 114) / 1000 < m;
    },
    saturate: function saturate(n) {
      var x, rgb, color;
      x = n / 100 || 0.1;
      this.sat += x;
      if (this.sat > 1) {
        this.sat = 1;
      }
      rgb = hslToRgb(this.hue, this.sat, this.lightness);
      color = colorObject(rgb, this.opacity, this.hue, this.sat);
      this.attachValues(color);
    },
    desaturate: function desaturate(n) {
      var x, rgb, color;
      x = n / 100 || 0.1;
      this.sat -= x;
      if (this.sat < 0) {
        this.sat = 0;
      }
      rgb = hslToRgb(this.hue, this.sat, this.lightness);
      color = colorObject(rgb, this.opacity, this.hue, this.sat);
      this.attachValues(color);
    },
    lighter: function lighter(n) {
      var x, rgb, color;
      x = n / 100 || 0.1;
      this.lightness += x;
      if (this.lightness > 1) {
        this.lightness = 1;
      }
      rgb = hslToRgb(this.hue, this.sat, this.lightness);
      color = colorObject(rgb, this.opacity, this.hue, this.sat);
      this.attachValues(color);
    },
    darker: function darker(n) {
      var x, rgb, color;
      x = n / 100 || 0.1;
      this.lightness -= x;
      if (this.lightness < 0) {
        this.lightness = 0;
      }
      rgb = hslToRgb(this.hue, this.sat, this.lightness);
      color = colorObject(rgb, this.opacity, this.hue, this.sat);
      this.attachValues(color);
    },
    attachValues: function attachValues(color) {
      this.red = color.red;
      this.green = color.green;
      this.blue = color.blue;
      this.hue = color.hue;
      this.sat = color.sat;
      this.lightness = color.lightness;
      this.whiteness = color.whiteness;
      this.blackness = color.blackness;
      this.cyan = color.cyan;
      this.magenta = color.magenta;
      this.yellow = color.yellow;
      this.black = color.black;
      this.ncol = color.ncol;
      this.opacity = color.opacity;
      this.valid = color.valid;
    }
  };
  function toColorObject(c) {
    var x,
        y,
        typ,
        arr = [],
        arrlength,
        i,
        opacity,
        match,
        a,
        hue,
        sat,
        rgb,
        colornames = [],
        colorhexs = [];
    c = w3trim(c.toLowerCase());
    x = c.substr(0, 1).toUpperCase();
    y = c.substr(1);
    a = 1;
    if ((x == "R" || x == "Y" || x == "G" || x == "C" || x == "B" || x == "M" || x == "W") && !isNaN(y)) {
      if (c.length == 6 && c.indexOf(",") == -1) {} else {
        c = "ncol(" + c + ")";
      }
    }
    if (c.length != 3 && c.length != 6 && !isNaN(c)) {
      c = "ncol(" + c + ")";
    }
    if (c.indexOf(",") > 0 && c.indexOf("(") == -1) {
      c = "ncol(" + c + ")";
    }
    if (c.substr(0, 3) == "rgb" || c.substr(0, 3) == "hsl" || c.substr(0, 3) == "hwb" || c.substr(0, 4) == "ncol" || c.substr(0, 4) == "cmyk") {
      if (c.substr(0, 4) == "ncol") {
        if (c.split(",").length == 4 && c.indexOf("ncola") == -1) {
          c = c.replace("ncol", "ncola");
        }
        typ = "ncol";
        c = c.substr(4);
      } else if (c.substr(0, 4) == "cmyk") {
        typ = "cmyk";
        c = c.substr(4);
      } else {
        typ = c.substr(0, 3);
        c = c.substr(3);
      }
      arrlength = 3;
      opacity = false;
      if (c.substr(0, 1).toLowerCase() == "a") {
        arrlength = 4;
        opacity = true;
        c = c.substr(1);
      } else if (typ == "cmyk") {
        arrlength = 4;
        if (c.split(",").length == 5) {
          arrlength = 5;
          opacity = true;
        }
      }
      c = c.replace("(", "");
      c = c.replace(")", "");
      arr = c.split(",");
      if (typ == "rgb") {
        if (arr.length != arrlength) {
          return emptyObject();
        }
        for (i = 0; i < arrlength; i++) {
          if (arr[i] == "" || arr[i] == " ") {
            arr[i] = "0";
          }
          if (arr[i].indexOf("%") > -1) {
            arr[i] = arr[i].replace("%", "");
            arr[i] = Number(arr[i] / 100);
            if (i < 3) {
              arr[i] = Math.round(arr[i] * 255);
            }
          }
          if (isNaN(arr[i])) {
            return emptyObject();
          }
          if (parseInt(arr[i]) > 255) {
            arr[i] = 255;
          }
          if (i < 3) {
            arr[i] = parseInt(arr[i]);
          }
          if (i == 3 && Number(arr[i]) > 1) {
            arr[i] = 1;
          }
        }
        rgb = { r: arr[0], g: arr[1], b: arr[2] };
        if (opacity == true) {
          a = Number(arr[3]);
        }
      }
      if (typ == "hsl" || typ == "hwb" || typ == "ncol") {
        while (arr.length < arrlength) {
          arr.push("0");
        }
        if (typ == "hsl" || typ == "hwb") {
          if (parseInt(arr[0]) >= 360) {
            arr[0] = 0;
          }
        }
        for (i = 1; i < arrlength; i++) {
          if (arr[i].indexOf("%") > -1) {
            arr[i] = arr[i].replace("%", "");
            arr[i] = Number(arr[i]);
            if (isNaN(arr[i])) {
              return emptyObject();
            }
            arr[i] = arr[i] / 100;
          } else {
            arr[i] = Number(arr[i]);
          }
          if (Number(arr[i]) > 1) {
            arr[i] = 1;
          }
          if (Number(arr[i]) < 0) {
            arr[i] = 0;
          }
        }
        if (typ == "hsl") {
          rgb = hslToRgb(arr[0], arr[1], arr[2]);hue = Number(arr[0]);sat = Number(arr[1]);
        }
        if (typ == "hwb") {
          rgb = hwbToRgb(arr[0], arr[1], arr[2]);
        }
        if (typ == "ncol") {
          rgb = ncolToRgb(arr[0], arr[1], arr[2]);
        }
        if (opacity == true) {
          a = Number(arr[3]);
        }
      }
      if (typ == "cmyk") {
        while (arr.length < arrlength) {
          arr.push("0");
        }
        for (i = 0; i < arrlength; i++) {
          if (arr[i].indexOf("%") > -1) {
            arr[i] = arr[i].replace("%", "");
            arr[i] = Number(arr[i]);
            if (isNaN(arr[i])) {
              return emptyObject();
            }
            arr[i] = arr[i] / 100;
          } else {
            arr[i] = Number(arr[i]);
          }
          if (Number(arr[i]) > 1) {
            arr[i] = 1;
          }
          if (Number(arr[i]) < 0) {
            arr[i] = 0;
          }
        }
        rgb = cmykToRgb(arr[0], arr[1], arr[2], arr[3]);
        if (opacity == true) {
          a = Number(arr[4]);
        }
      }
    } else if (c.substr(0, 3) == "ncs") {
      rgb = ncsToRgb(c);
    } else {
      match = false;
      colornames = getColorArr('names');
      for (i = 0; i < colornames.length; i++) {
        if (c.toLowerCase() == colornames[i].toLowerCase()) {
          colorhexs = getColorArr('hexs');
          match = true;
          rgb = {
            r: parseInt(colorhexs[i].substr(0, 2), 16),
            g: parseInt(colorhexs[i].substr(2, 2), 16),
            b: parseInt(colorhexs[i].substr(4, 2), 16)
          };
          break;
        }
      }
      if (match == false) {
        c = c.replace("#", "");
        if (c.length == 3) {
          c = c.substr(0, 1) + c.substr(0, 1) + c.substr(1, 1) + c.substr(1, 1) + c.substr(2, 1) + c.substr(2, 1);
        }
        for (i = 0; i < c.length; i++) {
          if (!isHex(c.substr(i, 1))) {
            return emptyObject();
          }
        }
        arr[0] = parseInt(c.substr(0, 2), 16);
        arr[1] = parseInt(c.substr(2, 2), 16);
        arr[2] = parseInt(c.substr(4, 2), 16);
        for (i = 0; i < 3; i++) {
          if (isNaN(arr[i])) {
            return emptyObject();
          }
        }
        rgb = {
          r: arr[0],
          g: arr[1],
          b: arr[2]
        };
      }
    }
    return colorObject(rgb, a, hue, sat);
  }
  function colorObject(rgb, a, h, s) {
    var hsl, hwb, cmyk, ncol, color, hue, sat;
    if (!rgb) {
      return emptyObject();
    }
    if (!a) {
      a = 1;
    }
    hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    hwb = rgbToHwb(rgb.r, rgb.g, rgb.b);
    cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
    hue = h || hsl.h;
    sat = s || hsl.s;
    ncol = hueToNcol(hue);
    color = {
      red: rgb.r,
      green: rgb.g,
      blue: rgb.b,
      hue: hue,
      sat: sat,
      lightness: hsl.l,
      whiteness: hwb.w,
      blackness: hwb.b,
      cyan: cmyk.c,
      magenta: cmyk.m,
      yellow: cmyk.y,
      black: cmyk.k,
      ncol: ncol,
      opacity: a,
      valid: true
    };
    color = roundDecimals(color);
    return color;
  }
  function emptyObject() {
    return {
      red: 0,
      green: 0,
      blue: 0,
      hue: 0,
      sat: 0,
      lightness: 0,
      whiteness: 0,
      blackness: 0,
      cyan: 0,
      magenta: 0,
      yellow: 0,
      black: 0,
      ncol: "R",
      opacity: 1,
      valid: false
    };
  }
  function getColorArr(x) {
    if (x == "names") {
      return ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGrey', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkSlateGrey', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DimGrey', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Grey', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray', 'LightGrey', 'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSlateGrey', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'RebeccaPurple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'SlateGrey', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'];
    }
    if (x == "hexs") {
      return ['f0f8ff', 'faebd7', '00ffff', '7fffd4', 'f0ffff', 'f5f5dc', 'ffe4c4', '000000', 'ffebcd', '0000ff', '8a2be2', 'a52a2a', 'deb887', '5f9ea0', '7fff00', 'd2691e', 'ff7f50', '6495ed', 'fff8dc', 'dc143c', '00ffff', '00008b', '008b8b', 'b8860b', 'a9a9a9', 'a9a9a9', '006400', 'bdb76b', '8b008b', '556b2f', 'ff8c00', '9932cc', '8b0000', 'e9967a', '8fbc8f', '483d8b', '2f4f4f', '2f4f4f', '00ced1', '9400d3', 'ff1493', '00bfff', '696969', '696969', '1e90ff', 'b22222', 'fffaf0', '228b22', 'ff00ff', 'dcdcdc', 'f8f8ff', 'ffd700', 'daa520', '808080', '808080', '008000', 'adff2f', 'f0fff0', 'ff69b4', 'cd5c5c', '4b0082', 'fffff0', 'f0e68c', 'e6e6fa', 'fff0f5', '7cfc00', 'fffacd', 'add8e6', 'f08080', 'e0ffff', 'fafad2', 'd3d3d3', 'd3d3d3', '90ee90', 'ffb6c1', 'ffa07a', '20b2aa', '87cefa', '778899', '778899', 'b0c4de', 'ffffe0', '00ff00', '32cd32', 'faf0e6', 'ff00ff', '800000', '66cdaa', '0000cd', 'ba55d3', '9370db', '3cb371', '7b68ee', '00fa9a', '48d1cc', 'c71585', '191970', 'f5fffa', 'ffe4e1', 'ffe4b5', 'ffdead', '000080', 'fdf5e6', '808000', '6b8e23', 'ffa500', 'ff4500', 'da70d6', 'eee8aa', '98fb98', 'afeeee', 'db7093', 'ffefd5', 'ffdab9', 'cd853f', 'ffc0cb', 'dda0dd', 'b0e0e6', '800080', '663399', 'ff0000', 'bc8f8f', '4169e1', '8b4513', 'fa8072', 'f4a460', '2e8b57', 'fff5ee', 'a0522d', 'c0c0c0', '87ceeb', '6a5acd', '708090', '708090', 'fffafa', '00ff7f', '4682b4', 'd2b48c', '008080', 'd8bfd8', 'ff6347', '40e0d0', 'ee82ee', 'f5deb3', 'ffffff', 'f5f5f5', 'ffff00', '9acd32'];
    }
  }
  function roundDecimals(c) {
    c.red = Number(c.red.toFixed(0));
    c.green = Number(c.green.toFixed(0));
    c.blue = Number(c.blue.toFixed(0));
    c.hue = Number(c.hue.toFixed(0));
    c.sat = Number(c.sat.toFixed(2));
    c.lightness = Number(c.lightness.toFixed(2));
    c.whiteness = Number(c.whiteness.toFixed(2));
    c.blackness = Number(c.blackness.toFixed(2));
    c.cyan = Number(c.cyan.toFixed(2));
    c.magenta = Number(c.magenta.toFixed(2));
    c.yellow = Number(c.yellow.toFixed(2));
    c.black = Number(c.black.toFixed(2));
    c.ncol = c.ncol.substr(0, 1) + Math.round(Number(c.ncol.substr(1)));
    c.opacity = Number(c.opacity.toFixed(2));
    return c;
  }
  function hslToRgb(hue, sat, light) {
    var t1, t2, r, g, b;
    hue = hue / 60;
    if (light <= 0.5) {
      t2 = light * (sat + 1);
    } else {
      t2 = light + sat - light * sat;
    }
    t1 = light * 2 - t2;
    r = hueToRgb(t1, t2, hue + 2) * 255;
    g = hueToRgb(t1, t2, hue) * 255;
    b = hueToRgb(t1, t2, hue - 2) * 255;
    return { r: r, g: g, b: b };
  }
  function hueToRgb(t1, t2, hue) {
    if (hue < 0) hue += 6;
    if (hue >= 6) hue -= 6;
    if (hue < 1) return (t2 - t1) * hue + t1;else if (hue < 3) return t2;else if (hue < 4) return (t2 - t1) * (4 - hue) + t1;else return t1;
  }
  function hwbToRgb(hue, white, black) {
    var i,
        rgb,
        rgbArr = [],
        tot;
    rgb = hslToRgb(hue, 1, 0.50);
    rgbArr[0] = rgb.r / 255;
    rgbArr[1] = rgb.g / 255;
    rgbArr[2] = rgb.b / 255;
    tot = white + black;
    if (tot > 1) {
      white = Number((white / tot).toFixed(2));
      black = Number((black / tot).toFixed(2));
    }
    for (i = 0; i < 3; i++) {
      rgbArr[i] *= 1 - white - black;
      rgbArr[i] += white;
      rgbArr[i] = Number(rgbArr[i] * 255);
    }
    return { r: rgbArr[0], g: rgbArr[1], b: rgbArr[2] };
  }
  function cmykToRgb(c, m, y, k) {
    var r, g, b;
    r = 255 - Math.min(1, c * (1 - k) + k) * 255;
    g = 255 - Math.min(1, m * (1 - k) + k) * 255;
    b = 255 - Math.min(1, y * (1 - k) + k) * 255;
    return { r: r, g: g, b: b };
  }
  function ncolToRgb(ncol, white, black) {
    var letter, percent, h, w, b;
    h = ncol;
    if (isNaN(ncol.substr(0, 1))) {
      letter = ncol.substr(0, 1).toUpperCase();
      percent = ncol.substr(1);
      if (percent == "") {
        percent = 0;
      }
      percent = Number(percent);
      if (isNaN(percent)) {
        return false;
      }
      if (letter == "R") {
        h = 0 + percent * 0.6;
      }
      if (letter == "Y") {
        h = 60 + percent * 0.6;
      }
      if (letter == "G") {
        h = 120 + percent * 0.6;
      }
      if (letter == "C") {
        h = 180 + percent * 0.6;
      }
      if (letter == "B") {
        h = 240 + percent * 0.6;
      }
      if (letter == "M") {
        h = 300 + percent * 0.6;
      }
      if (letter == "W") {
        h = 0;
        white = 1 - percent / 100;
        black = percent / 100;
      }
    }
    return hwbToRgb(h, white, black);
  }
  function hueToNcol(hue) {
    while (hue >= 360) {
      hue = hue - 360;
    }
    if (hue < 60) {
      return "R" + hue / 0.6;
    }
    if (hue < 120) {
      return "Y" + (hue - 60) / 0.6;
    }
    if (hue < 180) {
      return "G" + (hue - 120) / 0.6;
    }
    if (hue < 240) {
      return "C" + (hue - 180) / 0.6;
    }
    if (hue < 300) {
      return "B" + (hue - 240) / 0.6;
    }
    if (hue < 360) {
      return "M" + (hue - 300) / 0.6;
    }
  }

  /**
   * Color convert by w3schools
   * https://www.w3schools.com/lib/w3color.js
   * @param  {[type]} ncs [description]
   * @return {[type]}     [description]
   */
  function ncsToRgb(ncs) {
    var black, chroma, bc, percent, black1, chroma1, red1, factor1, blue1, red1, red2, green2, blue2, max, factor2, grey, r, g, b;
    ncs = w3trim(ncs).toUpperCase();
    ncs = ncs.replace("(", "");
    ncs = ncs.replace(")", "");
    ncs = ncs.replace("NCS", "NCS ");
    ncs = ncs.replace(/  /g, " ");
    if (ncs.indexOf("NCS") == -1) {
      ncs = "NCS " + ncs;
    }
    ncs = ncs.match(/^(?:NCS|NCS\sS)\s(\d{2})(\d{2})-(N|[A-Z])(\d{2})?([A-Z])?$/);
    if (ncs === null) return false;
    black = parseInt(ncs[1], 10);
    chroma = parseInt(ncs[2], 10);
    bc = ncs[3];
    if (bc != "N" && bc != "Y" && bc != "R" && bc != "B" && bc != "G") {
      return false;
    }
    percent = parseInt(ncs[4], 10) || 0;
    if (bc !== 'N') {
      black1 = 1.05 * black - 5.25;
      chroma1 = chroma;
      if (bc === 'Y' && percent <= 60) {
        red1 = 1;
      } else if (bc === 'Y' && percent > 60 || bc === 'R' && percent <= 80) {
        if (bc === 'Y') {
          factor1 = percent - 60;
        } else {
          factor1 = percent + 40;
        }
        red1 = (Math.sqrt(14884 - Math.pow(factor1, 2)) - 22) / 100;
      } else if (bc === 'R' && percent > 80 || bc === 'B') {
        red1 = 0;
      } else if (bc === 'G') {
        factor1 = percent - 170;
        red1 = (Math.sqrt(33800 - Math.pow(factor1, 2)) - 70) / 100;
      }
      if (bc === 'Y' && percent <= 80) {
        blue1 = 0;
      } else if (bc === 'Y' && percent > 80 || bc === 'R' && percent <= 60) {
        if (bc === 'Y') {
          factor1 = percent - 80 + 20.5;
        } else {
          factor1 = percent + 20 + 20.5;
        }
        blue1 = (104 - Math.sqrt(11236 - Math.pow(factor1, 2))) / 100;
      } else if (bc === 'R' && percent > 60 || bc === 'B' && percent <= 80) {
        if (bc === 'R') {
          factor1 = percent - 60 - 60;
        } else {
          factor1 = percent + 40 - 60;
        }
        blue1 = (Math.sqrt(10000 - Math.pow(factor1, 2)) - 10) / 100;
      } else if (bc === 'B' && percent > 80 || bc === 'G' && percent <= 40) {
        if (bc === 'B') {
          factor1 = percent - 80 - 131;
        } else {
          factor1 = percent + 20 - 131;
        }
        blue1 = (122 - Math.sqrt(19881 - Math.pow(factor1, 2))) / 100;
      } else if (bc === 'G' && percent > 40) {
        blue1 = 0;
      }
      if (bc === 'Y') {
        green1 = (85 - 17 / 20 * percent) / 100;
      } else if (bc === 'R' && percent <= 60) {
        green1 = 0;
      } else if (bc === 'R' && percent > 60) {
        factor1 = percent - 60 + 35;
        green1 = (67.5 - Math.sqrt(5776 - Math.pow(factor1, 2))) / 100;
      } else if (bc === 'B' && percent <= 60) {
        factor1 = 1 * percent - 68.5;
        green1 = (6.5 + Math.sqrt(7044.5 - Math.pow(factor1, 2))) / 100;
      } else if (bc === 'B' && percent > 60 || bc === 'G' && percent <= 60) {
        green1 = 0.9;
      } else if (bc === 'G' && percent > 60) {
        factor1 = percent - 60;
        green1 = (90 - 1 / 8 * factor1) / 100;
      }
      factor1 = (red1 + green1 + blue1) / 3;
      red2 = (factor1 - red1) * (100 - chroma1) / 100 + red1;
      green2 = (factor1 - green1) * (100 - chroma1) / 100 + green1;
      blue2 = (factor1 - blue1) * (100 - chroma1) / 100 + blue1;
      if (red2 > green2 && red2 > blue2) {
        max = red2;
      } else if (green2 > red2 && green2 > blue2) {
        max = green2;
      } else if (blue2 > red2 && blue2 > green2) {
        max = blue2;
      } else {
        max = (red2 + green2 + blue2) / 3;
      }
      factor2 = 1 / max;
      r = parseInt(red2 * factor2 * (100 - black1) / 100 * 255, 10);
      g = parseInt(green2 * factor2 * (100 - black1) / 100 * 255, 10);
      b = parseInt(blue2 * factor2 * (100 - black1) / 100 * 255, 10);
      if (r > 255) {
        r = 255;
      }
      if (g > 255) {
        g = 255;
      }
      if (b > 255) {
        b = 255;
      }
      if (r < 0) {
        r = 0;
      }
      if (g < 0) {
        g = 0;
      }
      if (b < 0) {
        b = 0;
      }
    } else {
      grey = parseInt((1 - black / 100) * 255, 10);
      if (grey > 255) {
        grey = 255;
      }
      if (grey < 0) {
        grey = 0;
      }
      r = grey;
      g = grey;
      b = grey;
    }
    return {
      r: r,
      g: g,
      b: b
    };
  }
  function rgbToHsl(r, g, b) {
    var min,
        max,
        i,
        l,
        s,
        maxcolor,
        h,
        rgb = [];
    rgb[0] = r / 255;
    rgb[1] = g / 255;
    rgb[2] = b / 255;
    min = rgb[0];
    max = rgb[0];
    maxcolor = 0;
    for (i = 0; i < rgb.length - 1; i++) {
      if (rgb[i + 1] <= min) {
        min = rgb[i + 1];
      }
      if (rgb[i + 1] >= max) {
        max = rgb[i + 1];maxcolor = i + 1;
      }
    }
    if (maxcolor == 0) {
      h = (rgb[1] - rgb[2]) / (max - min);
    }
    if (maxcolor == 1) {
      h = 2 + (rgb[2] - rgb[0]) / (max - min);
    }
    if (maxcolor == 2) {
      h = 4 + (rgb[0] - rgb[1]) / (max - min);
    }
    if (isNaN(h)) {
      h = 0;
    }
    h = h * 60;
    if (h < 0) {
      h = h + 360;
    }
    l = (min + max) / 2;
    if (min == max) {
      s = 0;
    } else {
      if (l < 0.5) {
        s = (max - min) / (max + min);
      } else {
        s = (max - min) / (2 - max - min);
      }
    }
    s = s;
    return { h: h, s: s, l: l };
  }
  function rgbToHwb(r, g, b) {
    var h, w, bl, max, min, chroma;
    r = r / 255;
    g = g / 255;
    b = b / 255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    chroma = max - min;
    if (chroma == 0) {
      h = 0;
    } else if (r == max) {
      h = (g - b) / chroma % 6 * 360;
    } else if (g == max) {
      h = ((b - r) / chroma + 2) % 6 * 360;
    } else {
      h = ((r - g) / chroma + 4) % 6 * 360;
    }
    w = min;
    bl = 1 - max;
    return { h: h, w: w, b: bl };
  }
  function rgbToCmyk(r, g, b) {
    var c, m, y, k, max;
    r = r / 255;
    g = g / 255;
    b = b / 255;
    max = Math.max(r, g, b);
    k = 1 - max;
    if (k == 1) {
      c = 0;
      m = 0;
      y = 0;
    } else {
      c = (1 - r - k) / (1 - k);
      m = (1 - g - k) / (1 - k);
      y = (1 - b - k) / (1 - k);
    }
    return { c: c, m: m, y: y, k: k };
  }
  function toHex(n) {
    var hex = n.toString(16);
    while (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  }
  function cl(x) {
    console.log(x);
  }
  function w3trim(x) {
    return x.replace(/^\s+|\s+$/g, '');
  }
  function isHex(x) {
    return '0123456789ABCDEFabcdef'.indexOf(x) > -1;
  }
  window.w3color = w3color;
})();

document.addEventListener("DOMContentLoaded", function (event) {

  /**
   * Check to see if an element is position relative (or equiv, aboslute, fixed etc)
   * @param  {object}  object The element to check
   * @return {Boolean}        Wether or not this element is position relative
   */
  var isRelative = function isRelative(object) {

    var style = object.style.position;
    var classes = object.classList;
    var goodPositions = ['relative', 'sticky', 'fixed', 'absolute'];
    var hasStickyClass = function hasStickyClass() {
      for (var i = 0; i < classes.length; i++) {
        if (classes[i].startsWith("sticky-")) {
          return true;
        }
      }
    };
    // if the direct style is a relative position return true
    // if the object has a sticky classes return true
    return goodPositions.indexOf(style) == true || hasStickyClass() ? true : false;
  };

  /**
   * Setup the base markup needed for our data-attr backgrounds
   * @param  {object} object The background parent
   */
  var bloxSetupBackground = function bloxSetupBackground(object) {

    // setup the background divs we will need
    var divColor = document.createElement('div');
    divColor.className = 'bg-color';
    var divImage = document.createElement('div');
    divImage.className = 'bg-image';
    var divGradient = document.createElement('div');
    divGradient.className = 'bg-gradient';

    // prepend new divs
    object.prepend(divColor, divImage, divGradient);

    // check and make sure the position is usable for smart backgrounds (fixed, absolute, sticky, relative etc)
    if (isRelative(object)) {
      object.className += ' overflow-hidden';
    } else {
      object.className += ' position-relative overflow-hidden';
    }

    // if this is a modal, remove the background style
    if (object.classList.contains('modal')) {
      object.style.backgroundColor = 'transparent';
    }
  };

  /**
   * Update a background
   * @param  {object} object The background parent
   */
  var bloxUpdateBackground = function bloxUpdateBackground(object) {

    // divs
    var divColor = object.querySelector('.bg-color');
    var divImage = object.querySelector('.bg-image');
    var divGradient = object.querySelector('.bg-gradient');

    // attributes
    var color = object.getAttribute('data-bg-color');
    var colorOpacity = object.getAttribute('data-bg-color-opacity');
    var image = object.getAttribute('data-bg-image');
    var imageOpacity = object.getAttribute('data-bg-image-opacity');
    var imageBlend = object.getAttribute('data-bg-image-blend');
    var imageBlur = object.getAttribute('data-bg-image-blur');
    var gradStart = object.getAttribute('data-bg-gradient-start');
    var gradEnd = object.getAttribute('data-bg-gradient-end');
    var gradDeg = object.getAttribute('data-bg-gradient-rotation');
    var gradOpacity = object.getAttribute('data-bg-gradient-opacity');

    // color fallbacks
    color = !bloxIsset(color) ? 'transparent' : color;
    colorOpacity = !bloxIsset(colorOpacity) ? 1 : Number(colorOpacity);
    // image fallbacks
    imageOpacity = !bloxIsset(imageOpacity) ? 1 : Number(imageOpacity);
    imageBlend = !bloxIsset(imageBlend) ? 'normal' : imageBlend;
    imageBlur = !bloxIsset(imageBlur) ? 0 : Number(imageBlur);
    // grad fallbacks
    gradEnd = !bloxIsset(gradEnd) ? 'transparent' : gradEnd;
    gradDeg = !bloxIsset(gradDeg) ? 0 : Number(gradDeg);
    gradOpacity = !bloxIsset(gradOpacity) ? 1 : Number(gradOpacity);

    // setup background color RGBA string
    var colorRGBA = w3color(color);
    colorRGBA.opacity = colorOpacity;
    colorRGBA = colorRGBA.toRgbaString();

    // the gradient
    if (bloxIsset(gradStart)) {
      bloxCSS(divGradient, {
        backgroundImage: 'linear-gradient(' + gradDeg + 'deg, ' + gradEnd + ', ' + gradStart + ')',
        opacity: gradOpacity
      });
    } else {
      divGradient.removeAttribute('style');
    }

    // the image
    // - the color is added here if the image is set, this ensures the blend mode actually works
    if (bloxIsset(image)) {
      bloxCSS(divImage, {
        backgroundImage: 'url(' + image + ')',
        backgroundBlendMode: imageBlend,
        backgroundColor: colorRGBA,
        opacity: imageOpacity
      });

      // if blur is on
      if (imageBlur > 0) {
        bloxCSS(divImage, {
          filter: 'blur(' + imageBlur + 'px)',
          top: '-' + imageBlur * 1.5 + 'px',
          bottom: '-' + imageBlur * 1.5 + 'px',
          left: '-' + imageBlur * 1.5 + 'px',
          right: '-' + imageBlur * 1.5 + 'px'
        });
        // reset blur styles if it's off
      } else {
        bloxCSS(divImage, {
          filter: '',
          top: '',
          bottom: '',
          left: '',
          right: ''
        });
      }

      // if blend is normal apply background color to the bg-color div so image opacity still works
      if (imageBlend === 'normal' && imageOpacity !== 0) {
        divColor.style.backgroundColor = colorRGBA;
      } else {
        divColor.style.backgroundColor = '';
      }

      // the color + clean the image
    } else {
      if (color === 'transparent' || colorOpacity === 0) {
        divColor.style.backgroundColor = 'transparent';
      } else {
        divColor.style.backgroundColor = colorRGBA;
      }
      divImage.removeAttribute('style');
    }
  };

  /**
   * Our background wrapper function
   * - sets up the markup we need
   * - sets up the updates we run on eahc background
   */
  var bloxBackgrounds = function bloxBackgrounds() {

    // setup the smart backgrounds
    var nodes = document.querySelectorAll('[data-bg-image], [data-bg-gradient-start], [data-bg-color]');

    // loop through each smart background and setup the html
    for (var i = 0; i < nodes.length; i++) {
      // setup base html
      bloxSetupBackground(nodes[i]);
      // update the styles
      bloxUpdateBackground(nodes[i]);
    }

    // listen for mutations on our smart backgrounds
    var mutationObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        // only update the background if the observed mutation was background related
        // - MutationObserver will respond to any mutation (class changes, style changes etc).
        // - We don't wont re-build the background if we don't have to
        var bgAttributes = ['data-bg-color', 'data-bg-color-opacity', 'data-bg-image', 'data-bg-image-opacity', 'data-bg-image-blend', 'data-bg-image-blur', 'data-bg-gradient-start', 'data-bg-gradient-end', 'data-bg-gradient-rotation', 'data-bg-gradient-opacity'];
        if (bgAttributes.includes(mutation.attributeName)) {
          bloxUpdateBackground(mutation.target);
        }
      });
    });

    // starts listening for changes on our backgrounds
    for (var i = 0; i < nodes.length; i++) {
      mutationObserver.observe(nodes[i], {
        attributes: true,
        attributeOldValue: true
      });
    }
  };
  bloxBackgrounds();
});

document.addEventListener("DOMContentLoaded", function (event) {

  /**
   * Adds row classes to our .boxes
   */
  var runBoxRowClasses = bloxDebounce(function () {

    // setup some big scope variables
    var ww = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var boxContainers = document.querySelectorAll('.boxes[data-rowclasses]');

    // run through each element that uses responsive classes
    if (boxContainers.length) {
      boxContainers.forEach(function (object, index) {

        // get the width of the container and setup the children
        var children = object.querySelectorAll('.box');
        var lastChild = children[children.length - 1];
        var rowCount = 0;

        // clean up the .row-x classes
        children.forEach(function (box, index) {
          var prefix = "row-";
          var classes = box.className.split(" ").filter(function (c) {
            return c.lastIndexOf(prefix, 0) !== 0;
          });
          box.className = classes.join(" ").trim();
        });

        // run through each box and apply row class
        for (var i = 0; i < children.length; i++) {
          var currentNode = children[i];
          var previousNode = children[i - 1];

          // check if we are on a new row
          if (
          // if this is the first box
          currentNode === children[0]
          // or if the top offset of this box doesn't match the previous siblings offset
          || currentNode.offsetTop !== previousNode.offsetTop) {
            rowCount++;
          }

          // check if this box is in the last row
          if (currentNode.offsetTop === lastChild.offsetTop) {
            currentNode.className += ' row-last';
          }

          // add our class!
          currentNode.className += ' row-' + rowCount;
        } // end each .box
      }); // end each .boxes
    } // end .boxes exist check
  }, bloxDebounceTiming()); // end runBoxRowClasses()

  /**
   * Handle responsive changes
   * @param  {object} event the event
   */
  window.addEventListener('resize', runBoxRowClasses);
  runBoxRowClasses();

  /**
   * Find the margin left of an element
   * @param  {object} box The element in question
   * @return {integer}    The left margin of the element
   */
  var getMarginLeft = function getMarginLeft(box) {
    var style = box.currentStyle || window.getComputedStyle(box);
    return parseInt(style.marginLeft, 10);
  };

  /**
   * Figure out the fullwidth of an element inclusive of margins
   * @param  {object} box The element in question
   * @return {integer}    The total width in integer format
   */
  var getFullWidth = function getFullWidth(box) {
    var width = box.getBoundingClientRect().width;
    var style = window.getComputedStyle(box);
    // add top and bottom margins to height total
    var fullwidth = ["left", "right"].map(function (side) {
      return parseInt(style['margin-' + side], 10);
    }).reduce(function (total, side) {
      return total + side;
    }, width);
    return parseInt(fullwidth);
  };

  /**
   * Return the fullheight of an element including the top and bottom margins
   * @param  {object} box The element in question
   * @return {integer}    The total height
   */
  var getFullHeight = function getFullHeight(box) {
    var height = box.getBoundingClientRect().height;
    var style = window.getComputedStyle(box);
    // add top and bottom margins to height total
    var fullheight = ["top", "bottom"].map(function (side) {
      return parseInt(style['margin-' + side], 10);
    }).reduce(function (total, side) {
      return total + side;
    }, height);
    return parseInt(fullheight);
  };

  /**
   * Find the box sibling that has the highest bottom offset
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  var findHeighestBottom = function findHeighestBottom(array) {
    return array.reduce(function (prev, current) {
      return prev.bottom < current.bottom ? prev : current;
    });
  };

  /**
   * Get the boxes container height by using the offest of the lowest box in the set
   * @param  {array} boxes  The boxes of the container
   * @return {integer}      The height of the container
   */
  var getContainerHeight = function getContainerHeight(boxes) {
    var lowest = boxes.reduce(function (prev, current) {
      return Math.floor(prev.offsetTop + prev.getBoundingClientRect().height) > Math.floor(current.offsetTop + current.getBoundingClientRect().height) ? prev : current;
    });
    return Math.floor(lowest.offsetTop + getFullHeight(lowest));
  };

  /**
   * Setup and handle the masonry boxes
   */
  var setupMasonry = bloxDebounce(function () {

    // loop through each container
    document.querySelectorAll('.boxes[data-layout="masonry"]').forEach(function (container) {

      // setup positional nodes
      var left = 0;
      var boxes = [];
      var available = [];
      var children = container.children;

      // maintain dimensions of the container
      container.classList.add('position-relative');
      container.style.height = container.getBoundingClientRect().height + 'px';

      // setup the boxes array
      // - this is to target only the immediate .box children of the container
      for (var i = 0, l = children.length; i < l; ++i) {
        var child = children[i];
        if (child.nodeType === 1 && child.classList.contains('box')) {
          boxes.push(child);
        }
      }

      // figure out how many columns are in this container
      var columnCount = function columnCount() {
        return parseInt(container.getBoundingClientRect().width / boxes[0].getBoundingClientRect().width);
      };

      // loop through each box for positioning
      boxes.forEach(function (box, index, initial) {

        // set position relative for this
        box.style.position = 'absolute';

        // first row boxes
        if (index <= columnCount() - 1) {
          box.style.left = index != 0 ? left + 'px' : 0;
          left += getFullWidth(box);

          // masonry boxes
        } else {
          // find the highest point sibling
          var chosen = findHeighestBottom(available);
          // position this box under the chosen box
          box.style.top = chosen.bottom + 'px';
          box.style.left = chosen.left + 'px';
          // remove the chosen sibling from the available array
          available = available.filter(function (obj) {
            return obj.box !== chosen.box;
          });
        }

        // push current box to the list of available boxes to use for next sibling
        available.push({
          box: index,
          bottom: box.offsetTop + getFullHeight(box),
          left: box.offsetLeft - getMarginLeft(box)
        });
      });

      // update the height of the container
      var containerHeight = getContainerHeight(boxes);
      container.style.height = containerHeight + 'px';
    });
  }, bloxDebounce() + 100); // end setupMasonry() using a hard 100ms debounce here, 50 is too small

  /**
   * Handle responsive changes to the masonry boxes
   * @param  {object} event the event
   */
  window.addEventListener('resize', setupMasonry);
  setupMasonry();
});

document.addEventListener("DOMContentLoaded", function (event) {

  /**
   * Run through the hash functionality when url hash changes
   */
  var runHashes = bloxDebounce(function () {

    // setup some big scope variables
    var hash = window.location.hash;
    var objectsAll = document.querySelectorAll('[data-hash]');

    // run through hash bound elements
    if (objectsAll.length) {
      objectsAll.forEach(function (object, index) {

        // bound hash
        var hashBound = object.getAttribute('data-hash');

        // classes
        var hashClassesOn = bloxDataClasses(object, 'data-classes-onhash');
        var hashClassesOff = bloxDataClasses(object, 'data-classes-offhash');

        // callbacks
        var hashEventOn = bloxDataString(object, 'data-event-onhash');
        var hashEventOff = bloxDataString(object, 'data-event-offhash');

        // clean up the hashes
        if (bloxIsset(hashClassesOn)) {
          var _object$classList;

          (_object$classList = object.classList).remove.apply(_object$classList, _toConsumableArray(hashClassesOn));
        }
        if (bloxIsset(hashClassesOff)) {
          var _object$classList2;

          (_object$classList2 = object.classList).remove.apply(_object$classList2, _toConsumableArray(hashClassesOff));
        }

        /*
        HASH CLASSES
         */
        // hash unmatched and classes off
        if (hash !== hashBound && bloxIsset(hashClassesOff)) {
          var _object$classList3;

          (_object$classList3 = object.classList).add.apply(_object$classList3, _toConsumableArray(hashClassesOff));
          // hash matched and classes on
        } else if (hash === hashBound && bloxIsset(hashClassesOn)) {
          var _object$classList4;

          (_object$classList4 = object.classList).add.apply(_object$classList4, _toConsumableArray(hashClassesOn));
        }

        /*
        HASH CALLBACKS
         */
        // has unmatched and function callback off
        if (hash !== hashBound && bloxIsset(hashEventOff)) {
          var _event = new CustomEvent(hashEventOff, {
            detail: {
              target: object
            }
          });
          document.dispatchEvent(_event);

          // has matched and function callback on
        } else if (hash === hashBound && bloxIsset(hashEventOn)) {
          var _event2 = new CustomEvent(hashEventOn, {
            detail: {
              target: object
            }
          });
          document.dispatchEvent(_event2);
        }
      });
    }
  }, bloxDebounceTiming());

  /**
   * Handle hash changes
   * @param  {object} event the event
   */
  window.addEventListener('hashchange', runHashes);
  runHashes();
});

document.addEventListener("DOMContentLoaded", function (event) {

  /**
   * Open a modal
   * @param  {object} modal The modal object that we are opening
   * @return {function}     Returns a window trigger that notifies the modal has opened
   */
  var openModal = bloxDebounce(function (modal) {
    // setup our modal vars
    var modalId = modal.id;
    var wraps = document.querySelectorAll('html,body');
    // add modal open classes
    modal.classList.add('on');
    // turn off window scrolling
    for (var i = 0; i < wraps.length; i++) {
      wraps[i].style.overflow = 'hidden';
    }
    // notify
    var event = new CustomEvent('modal-opened:' + modalId);
    return window.dispatchEvent(event);
  }, bloxDebounceTiming());

  /**
   * Close a modal
   * @param  {object} modal The modal object that we are closing
   * @return {function}     Returns a window trigger that notifies the modal has closed
   */
  var closeModal = bloxDebounce(function (modal) {
    // setup our modal vars
    var modalId = modal.id;
    var wraps = document.querySelectorAll('html,body');
    // add modal open classes
    modal.classList.remove('on');
    // turn on window scrolling
    for (var i = 0; i < wraps.length; i++) {
      wraps[i].style.overflow = '';
    }
    // notify
    var event = new CustomEvent('modal-closed:' + modalId);
    return window.dispatchEvent(event);
  }, bloxDebounceTiming());

  // open a modal via click
  var openClicks = document.querySelectorAll('[data-open-modal]');
  openClicks.forEach(function (el) {
    el.addEventListener('click', function (event) {
      var id = event.target.getAttribute('data-open-modal');
      var m = document.querySelector('#' + id);
      openModal(m);
    });
  });

  // close a modal via direct close click
  var closeClicks = document.querySelectorAll('[data-close-modal]');
  closeClicks.forEach(function (el) {
    el.addEventListener('click', function (event) {
      var id = event.target.getAttribute('data-close-modal');
      var m = document.querySelector('#' + id);
      closeModal(m);
    });
  });

  // close modal via clicking modal backdrop
  var closeBG = document.querySelectorAll('.modal');
  closeBG.forEach(function (el) {
    el.addEventListener('click', function (event) {
      // only close if the event target is the modal background
      if (event.target === el && el.classList.contains('on')) {
        closeModal(el);
      }
    });
  });

  // close modal via hitting the escape key
  document.onkeydown = function (evt) {
    evt = evt || window.event;
    var modalOn = document.querySelector('.modal.on');
    if (evt.keyCode == 27 && bloxIsset(modalOn)) {
      closeModal(modalOn);
    }
  };
});

document.addEventListener("DOMContentLoaded", function (event) {

  /**
   * Update classes on componenent resize elements
   * @param {object} object The element that we are updating
   * @param {string} size   The size we are updating to (wide, tall, square)
   */
  var setComponentClasses = function setComponentClasses(object, size) {

    // setup components
    var componentId = object.id;
    var classesWide = bloxDataClasses(object, 'data-classes-wide');
    var classesTall = bloxDataClasses(object, 'data-classes-tall');
    var classesSquare = bloxDataClasses(object, 'data-classes-square');
    var allClasses = [].concat(classesWide, classesTall, classesSquare).filter(function (n) {
      return n != undefined;
    });
    var utilClasses = ['isTall', 'isWide', 'isSquare'];

    // clean up all the classes on the object and return it
    var cleanUp = function cleanUp() {
      var _object$classList5, _object$classList6;

      (_object$classList5 = object.classList).remove.apply(_object$classList5, utilClasses);
      (_object$classList6 = object.classList).remove.apply(_object$classList6, _toConsumableArray(allClasses));
      return object;
    };

    // fire the event trigger for this component
    var fireUp = bloxDebounce(function (state) {
      if (bloxIsset(componentId)) {
        // notify
        var _event3 = new CustomEvent('component-resized:' + componentId, {
          detail: {
            target: object,
            state: state
          }
        });
        return document.dispatchEvent(_event3);
      }
    }, bloxDebounceTiming());

    /*
    WIDE CLASSES
     */
    if (size == 'wide' && !bloxHasClass(object, 'isWide')) {
      cleanUp().classList.add('isWide');
      fireUp('wide');
      // handle custom classes
      if (bloxIsset(classesWide)) {
        var _object$classList7;

        (_object$classList7 = object.classList).add.apply(_object$classList7, _toConsumableArray(classesWide));
      }

      /*
      TALL CLASSES
       */
    } else if (size == 'tall' && !bloxHasClass(object, 'isTall')) {
      cleanUp().classList.add('isTall');
      fireUp('tall');
      // handle custom classes
      if (bloxIsset(classesTall)) {
        var _object$classList8;

        (_object$classList8 = object.classList).add.apply(_object$classList8, _toConsumableArray(classesTall));
      }

      // square
    } else if (size == 'square' && !bloxHasClass(object, 'isSquare')) {
      cleanUp().classList.add('isSquare');
      fireUp('square');
      // handle custom classes
      if (bloxIsset(classesSquare)) {
        var _object$classList9;

        (_object$classList9 = object.classList).add.apply(_object$classList9, _toConsumableArray(classesSquare));
      }
    }
  };

  /**
   * Our responsive componenent wrapper function
   * - sets up the resize observer we use to listen for element changes
   * @return {[type]} [description]
   */
  var runComponentClasses = function runComponentClasses() {

    // setup the smart backgrounds
    var nodes = document.querySelectorAll('[data-classes-tall], [data-classes-wide], [data-classes-square], [data-responsive]');

    // listen for resize changes and update the classes accordingly
    var ro = new ResizeObserver(function (elements) {
      elements.forEach(function (element) {
        var width = element.contentRect.width;
        var height = element.contentRect.height;
        // wide (is 1.04 times wider than tall)
        if (width > Math.pow(height, 1.04)) {
          setComponentClasses(element.target, 'wide');
          // tall (is 1.03 times taller than wide)
        } else if (height > Math.pow(width, 1.03)) {
          setComponentClasses(element.target, 'tall');
          // square (tall and wide are too close)
        } else {
          setComponentClasses(element.target, 'square');
        }
      });
    });

    // starts listening for changes on our backgrounds
    for (var i = 0; i < nodes.length; i++) {
      ro.observe(nodes[i]);
    }
  };

  /**
   * Our responsive viewport wrapper function
   * - sets up viewport repsonsive classes and listens for changes
   */
  var runViewportClasses = bloxDebounce(function () {

    // setup some big scope variables
    var ww = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var responsiveClasses = document.querySelectorAll('[data-classes-tny], [data-classes-sml], [data-classes-med], [data-classes-lrg], [data-classes-xl]');

    // run through each element that uses responsive classes
    if (responsiveClasses.length) {
      responsiveClasses.forEach(function (object, index) {

        // get all the classes this element has
        var classesTny = bloxDataClasses(object, 'data-classes-tny');
        var classesSml = bloxDataClasses(object, 'data-classes-sml');
        var classesMed = bloxDataClasses(object, 'data-classes-med');
        var classesLrg = bloxDataClasses(object, 'data-classes-lrg');
        var classesXl = bloxDataClasses(object, 'data-classes-xl');
        var allClasses = [].concat(classesTny, classesSml, classesMed, classesLrg, classesXl).filter(function (n) {
          return n != undefined;
        });

        // clean up all classes on the object that have been specified
        var cleanUpClasses = function cleanUpClasses() {
          var _object$classList10;

          (_object$classList10 = object.classList).remove.apply(_object$classList10, _toConsumableArray(allClasses));
        };

        // tny classes on
        if (ww <= 599 && !bloxHasClass(object, classesTny)) {
          cleanUpClasses();
          if (bloxIsset(classesTny)) {
            var _object$classList11;

            (_object$classList11 = object.classList).add.apply(_object$classList11, _toConsumableArray(classesTny));
          }

          // sml classes on
        } else if (ww >= 600 && ww <= 879 && !bloxHasClass(object, classesSml)) {
          cleanUpClasses();
          if (bloxIsset(classesSml)) {
            var _object$classList12;

            (_object$classList12 = object.classList).add.apply(_object$classList12, _toConsumableArray(classesSml));
          }
          // med classes on
        } else if (ww >= 880 && ww <= 1099 && !bloxHasClass(object, classesMed)) {
          cleanUpClasses();
          if (bloxIsset(classesMed)) {
            var _object$classList13;

            (_object$classList13 = object.classList).add.apply(_object$classList13, _toConsumableArray(classesMed));
          }
          // lrg classes on
        } else if (ww >= 1100 && ww <= 1499 && !bloxHasClass(object, classesLrg)) {
          cleanUpClasses();
          if (bloxIsset(classesLrg)) {
            var _object$classList14;

            (_object$classList14 = object.classList).add.apply(_object$classList14, _toConsumableArray(classesLrg));
          }
          // xl classes on
        } else if (ww > 1500 && !bloxHasClass(object, classesXl)) {
          cleanUpClasses();
          if (bloxIsset(classesXl)) {
            var _object$classList15;

            (_object$classList15 = object.classList).add.apply(_object$classList15, _toConsumableArray(classesXl));
          }
        }
      });
    } // end responsiveClasses.length check
  }, bloxDebounceTiming());

  /**
   * Handle responsive changes
   * @param  {event} event the event
   */
  window.addEventListener('resize', runViewportClasses);
  runViewportClasses();

  /**
   * Handle responsive component changes
   */
  runComponentClasses();
});

document.addEventListener("DOMContentLoaded", function (event) {

  // Props and thanks for this functionality goes to Eric Bidelman
  // https://developers.google.com/web/updates/2017/09/sticky-headers
  var bottomClasses = ['sticky-bottom', 'sticky-bottom--sml-up', 'sticky-bottom--med-up', 'sticky-bottom--lrg-up', 'sticky-bottom--xl-up', 'sticky-bottom--tny-only', 'sticky-bottom--sml-only', 'sticky-bottom--med-only', 'sticky-bottom--lrg-only', 'sticky-bottom--xl-only'];

  /**
  * Sets up an intersection observer to notify when elements with the class
  * `.sticky_sentinel--top` become visible/invisible at the top of the container.
  * @param {!Element} container
  */
  var observeHeaders = function observeHeaders(container) {
    var observer = new IntersectionObserver(function (records, observer) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = records[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var record = _step.value;

          var sentinel = record.boundingClientRect;
          var sticky = record.target.parentElement.querySelector('[data-sticky]');
          var viewport = record.rootBounds;

          /*
          STICKY BOTTOM
           */
          if (bloxHasClass(sticky, bottomClasses)) {

            // position sentinal
            var offset = getHeight(sticky) + getOffset(sticky, 'bottom') + 1;
            record.target.style.top = offset + 'px';
            // started sticking.
            if (sentinel.top < viewport.bottom && !isInViewport(record.target.nextElementSibling) // check that the bottom sentinel isn't visible
            ) {
                fireEvent(true, sticky);
              }
            // stopped sticking.
            if (sentinel.top > viewport.bottom) {
              fireEvent(false, sticky);
            }

            /*
            STICKY TOP
             */
          } else {

            // position sentinal
            var _offset = -getOffset(sticky, 'top') - getMargin(sticky, 'top') - 1;
            record.target.style.top = _offset + 'px';
            // started sticking.
            if (sentinel.bottom < viewport.top) {
              fireEvent(true, sticky);
            }
            // stopped sticking.
            if (sentinel.bottom >= viewport.top && sentinel.bottom < viewport.bottom) {
              fireEvent(false, sticky);
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }, { threshold: [0] }); // will fire when any part of the senitel comes into view

    // Add the top sentinels to each section and attach an observer.
    var sentinels = addSentinels(container, 'sticky_sentinel--top');
    sentinels.forEach(function (el) {
      return observer.observe(el);
    });
  };

  /**
   * Sets up an intersection observer to notify when elements with the class
   * `.sticky_sentinel--bottom` become visible/invisible at the bottom of the
   * container.
   * @param {!Element} container
   */
  var observeFooters = function observeFooters(container) {
    var observer = new IntersectionObserver(function (records, observer) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = records[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var record = _step2.value;

          var sentinel = record.boundingClientRect;
          var sticky = record.target.parentElement.querySelector('[data-sticky]');
          var viewport = record.rootBounds;

          /*
          STICKY BOTTOM
           */
          if (bloxHasClass(sticky, bottomClasses)) {

            // position sentinal
            var offset = -getOffset(sticky, 'bottom') + getMargin(sticky, 'bottom') - 1;
            record.target.style.bottom = offset + 'px';
            // started sticking
            if (sentinel.top > viewport.bottom) {
              fireEvent(true, sticky);
            }
            // stopped sticking
            if (sentinel.top < viewport.bottom) {
              fireEvent(false, sticky);
            }

            /*
            STICKY TOP
             */
          } else {

            // position sentinal
            var _offset2 = getHeight(sticky) + getOffset(sticky, 'top') + getMargin(sticky, 'bottom') + 1;
            record.target.style.bottom = _offset2 + 'px';

            // started sticking
            if (sentinel.top > viewport.top && !isInViewport(record.target.previousElementSibling) // check that the top sentinel isn't visible
            ) {
                fireEvent(true, sticky);
              }
            // stopped sticking
            if (sentinel.top < viewport.top && sentinel.bottom < viewport.bottom) {
              fireEvent(false, sticky);
            }
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }, { threshold: [0] }); // will fire when any part of the senitel comes into view

    // Add the bottom sentinels to each section and attach an observer.
    var sentinels = addSentinels(container, 'sticky_sentinel--bottom');
    sentinels.forEach(function (el) {
      return observer.observe(el);
    });
  };

  /**
   * @param {!Element} container
   * @param {string} className
   */
  var addSentinels = function addSentinels(container, className) {
    return Array.from(container.querySelectorAll('[data-sticky]')).map(function (el) {
      var sentinel = document.createElement('div');
      sentinel.classList.add('sticky_sentinel', className);
      return el.parentElement.appendChild(sentinel);
    });
  };

  /**
   * Dispatches the `sticky-event` custom event on the target element.
   * @param {boolean} stuck True if `target` is sticky.
   * @param {!Element} target Element to fire the event on.
   */
  var fireEvent = function fireEvent(stuck, target) {
    var e = new CustomEvent('sticky-change', { detail: { stuck: stuck, target: target } });
    document.dispatchEvent(e);
  };

  /**
   * Return a unique array
   * @param  {Array} arrArg the array to filter
   * @return {Array}        the filters array
   */
  var uniqueArray = function uniqueArray(arrArg) {
    return arrArg.filter(function (elem, pos, arr) {
      return arr.indexOf(elem) == pos;
    });
  };

  /**
   * Get and return the height of a node
   * @param  {element} target the node to get the height of
   * @return {integer}        the height of the node
   */
  var getHeight = function getHeight(target) {
    var style = window.getComputedStyle(target);
    return parseInt(style.height);
  };

  /**
   * Get and return the top offset of a node
   * @param  {element} target the node to get the height of
   * @return {integer}        the height of the node
   */
  var getOffset = function getOffset(target, direction) {
    var style = window.getComputedStyle(target);
    if (direction === 'top') {
      return parseInt(style.top);
    } else {
      return parseInt(style.bottom);
    }
  };

  /**
   * Get and return the bottom margin of a node
   * @param  {element} target the node to get the height of
   * @return {integer}        the height of the node
   */
  var getMargin = function getMargin(target, direction) {
    var style = window.getComputedStyle(target);
    if (direction === 'top') {
      return parseInt(style.marginTop);
    } else {
      return parseInt(style.marginBottom);
    }
  };

  /**
   * Check if an element is within the viewport
   * @param  {[type]} elem [description]
   * @return {[type]}      [description]
   */
  var isInViewport = function isInViewport(elem) {
    var bounding = elem.getBoundingClientRect();
    return bounding.top >= 0 && bounding.left >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) && bounding.right <= (window.innerWidth || document.documentElement.clientWidth);
  };

  /**
   * Toggle the sticky classes on and off based on state
   * @param  {element} object   The sticky header elements
   * @param  {bool} sticking    True or false representation of the sticky states
   */
  var stickyClasses = function stickyClasses(object, sticking) {

    // setup sticky classes
    var stickyClassesOn = bloxDataClasses(object, 'data-classes-onstick');
    var stickyClassesOff = bloxDataClasses(object, 'data-classes-offstick');

    // header is sticking
    if (sticking === true) {
      if (bloxIsset(stickyClassesOn)) {
        var _object$classList16;

        (_object$classList16 = object.classList).add.apply(_object$classList16, _toConsumableArray(stickyClassesOn));
      }
      if (bloxIsset(stickyClassesOff)) {
        var _object$classList17;

        (_object$classList17 = object.classList).remove.apply(_object$classList17, _toConsumableArray(stickyClassesOff));
      }
      // header is no longer sticking
    } else {
      if (bloxIsset(stickyClassesOn)) {
        var _object$classList18;

        (_object$classList18 = object.classList).remove.apply(_object$classList18, _toConsumableArray(stickyClassesOn));
      }
      if (bloxIsset(stickyClassesOff)) {
        var _object$classList19;

        (_object$classList19 = object.classList).add.apply(_object$classList19, _toConsumableArray(stickyClassesOff));
      }
    }
  };

  /**
   * Fire functions when sticking
   * @param  {element} object   The sticky header elements
   * @param  {bool} sticking    True or false representation of the sticky states
   */
  var stickyEvent = function stickyEvent(object, sticking) {

    // setup sticky classes
    var stickyEventOn = bloxDataString(object, 'data-event-onstick');
    var stickyEventOff = bloxDataString(object, 'data-event-offstick');

    // callcback to run when sticking
    if (sticking === true && bloxIsset(stickyEventOn)) {
      var _event4 = new CustomEvent(stickyEventOn, {
        detail: {
          target: object,
          sticking: sticking
        }
      });
      document.dispatchEvent(_event4);
    }

    // callcback to run when not sticking
    if (sticking === false && bloxIsset(stickyEventOff)) {
      var _event5 = new CustomEvent(stickyEventOff, {
        detail: {
          target: object,
          sticking: sticking
        }
      });
      document.dispatchEvent(_event5);
    }
  };

  /**
   * Notifies when elements w/ the `sticky` class begin to stick or stop sticking.
   */
  var observeStickyHeaderChanges = function observeStickyHeaderChanges() {
    var stickies = document.querySelectorAll('[data-classes-onstick], [data-classes-offstick], [data-event-onstick], [data-event-offstick]');
    var containers = [];

    // loop through each sticky
    for (var i = 0; i < stickies.length; i++) {
      // add the data-sticky attribute to our sticky elements
      stickies[i].setAttribute('data-sticky', '');
      // push the parent element to the containers array
      containers.push(stickies[i].parentElement);
    }

    // make the container array unique
    containers = uniqueArray(containers);

    // create and observe the sentinals for all sticky contains on the page
    for (var i = 0; i < containers.length; i++) {
      // add sticky parent class
      containers[i].classList.add('sticky_parent');
      // add sentinels and setup observers
      observeHeaders(containers[i]);
      observeFooters(containers[i]);
    }
  };
  // observe on window load (just so the doc has some time to render first)
  observeStickyHeaderChanges();

  /**
   * Listen for our custom event that fires when a sticky changes its state
   * @type {event}
   */
  document.addEventListener('sticky-change', function (e) {
    // header became sticky or stopped sticking.
    var header = e.detail.target;
    // true when header is sticky.
    var sticking = e.detail.stuck;
    // add classes on stick / unstick
    stickyClasses(header, sticking);
    // fire function on stick / unstick
    stickyEvent(header, sticking);
  });
});