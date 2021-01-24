// Example file src/helpers/icon.js
module.exports = function (options) {
  // ! options.fn(this) = Handelbars content between {{#icon}} HERE {{/icon}}
  var icon = `<svg class="svg-sprite-icon icon-${options.fn(
    this
  )}" width="30" height="30">
              <use xlink:href="static/images/svg/symbol/sprite.svg#${options.fn(
                this
              )}"></use>
              </svg>`;
  return icon;
};
