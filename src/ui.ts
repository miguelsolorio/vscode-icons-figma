import './ui.css'

const codicon = require('./assets/codicon.json5')
const seti = require('./assets/seti.json5')
const search = <HTMLInputElement>document.getElementById('search')
const banner = <HTMLElement>document.getElementById('banner')
const bannerBoth = <HTMLElement>document.getElementById('banner-both')
const bannerCodicon = <HTMLElement>document.getElementById('banner-codicon')
const bannerSeti = <HTMLElement>document.getElementById('banner-seti')
const iconList = document.getElementById('icon-list')
const codicons = codicon['default']
const setiIcons = seti['default']

// load codicons
codicons.forEach((icon: {
  short_name: string,
  character: string,
  unicode: string,
  description: string,
}) => {
  let iconListItem = document.createElement('li')
  let iconName = icon.short_name
  let iconFriendlyName = icon.short_name.replace(/-/g, ' ')
  let iconDescription = icon.description
  let iconGlyph = icon.character
  iconListItem.id = iconName
  iconListItem.setAttribute('icon-glyph', iconGlyph)
  iconListItem.setAttribute('icon-name', iconName)
  iconListItem.setAttribute('icon-library', 'codicon')

  iconListItem.innerHTML += `<glyph>${iconGlyph}</glyph>`
  iconListItem.innerHTML += `<metadata> ${iconFriendlyName} codicon ${iconDescription} </metadata>`

  iconList.appendChild(iconListItem)
})

// load seti
setiIcons.forEach((icon: {
  short_name: string,
  character: string,
  unicode: string,
  description: string,
}) => {
  let iconListItem = document.createElement('li')
  let iconName = icon.short_name
  let iconFriendlyName = icon.short_name.replace(/-/g, ' ')
  let iconDescription = icon.description
  let iconGlyph = icon.character
  iconListItem.id = iconName
  iconListItem.setAttribute('icon-glyph', iconGlyph)
  iconListItem.setAttribute('icon-name', iconName)
  iconListItem.setAttribute('icon-library', 'seti')

  iconListItem.innerHTML += `<glyph>${iconGlyph}</glyph>`
  iconListItem.innerHTML += `<metadata> ${iconFriendlyName} seti ${iconDescription} </metadata>`

  iconList.appendChild(iconListItem)
})

onmessage = (event) => {
  const pluginMessage = event.data.pluginMessage

  
  if (pluginMessage.type == 'hasIcons'){
    console.log(pluginMessage)
    banner.classList.remove('hide')

    if (pluginMessage.codicons == false){
      banner.classList.add('codicons')
      bannerCodicon.classList.remove('hide')
    }

    if (pluginMessage.seti == false) {
      banner.classList.add('seti')
      bannerSeti.classList.remove('hide')
    }
  }

}

search.addEventListener('keyup', function () {
  let searchInput = this.value.toString();
  document.querySelectorAll('li').forEach(item => {
    if(!item.classList.contains('hide')){
      item.classList.add('hide')
    }
  })

  const codiconFilter = codicons.filter(icon => (icon.description.includes(searchInput) || icon.short_name.includes(searchInput)))
  const setiFilter = setiIcons.filter(icon => (icon.description.includes(searchInput) || icon.short_name.includes(searchInput)))
  
  codiconFilter.forEach(result => {
    let name = result['short_name']
    document.getElementById(`${name}`).classList.remove('hide')
  })

  setiFilter.forEach(result => {
    let name = result['short_name']
    document.getElementById(`${name}`).classList.remove('hide')
  })

});

search.focus();

iconList.addEventListener('click', function (e) {

  let iconElm = <HTMLElement>e.target
  let glyph = iconElm.getAttribute('icon-glyph')
  let name = iconElm.getAttribute('icon-name')
  let library = iconElm.getAttribute('icon-library')
  if (glyph != null) {
    // place item on Figma
    parent.postMessage({ pluginMessage: { type: 'create-icon', glyph, name, library } }, '*')
  }
})