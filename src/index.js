// IMPORT TOOLS
import Sizes from '@tools/Sizes'
import Time from '@tools/Time'
import Assets from '@tools/Loader'
// IMPORT APP
import '@style/style.styl'
import App from '@js/App'

// LOADER TEMPLATE
const loader = `
<div class="loaderScreen">
  <div class="loaderScreen__progressBar">
    <div class="loaderScreen__progress"></div>
  </div>
  <h1 class="loaderScreen__load">0%</h1>
  <div class="loaderScreen__progressBar">
    <div class="loaderScreen__progress"></div>
  </div>
</div>
`
// SET TOOLS
const time = new Time()
const sizes = new Sizes()
const assets = new Assets({
  template: loader
})


// SET APP
new App({
  canvas: document.querySelector('#_canvas'),
  time: time,
  sizes: sizes,
  assets: assets,
})
