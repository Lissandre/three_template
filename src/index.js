// IMPORT TOOLS
import Assets from '@tools/Loader'
// IMPORT APP
import '@style/style.styl'
import AppManager from '@js/AppManager'

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
const assets = new Assets({
  template: loader
})

// SET APP
new AppManager({
  assets: assets,
}).setup()
