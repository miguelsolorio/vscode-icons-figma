import './ui.css'

const codicon = require('./assets/codicon.json5')
const seti = require('./assets/seti.json5')
const search = <HTMLInputElement>document.getElementById('search');
const iconList = document.getElementById('icon-list')
const codicons = codicon['default']
const setiIcons = seti['default']

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
  iconListItem.setAttribute('icon-glyph', iconGlyph)
  iconListItem.setAttribute('icon-name', iconName)
  iconListItem.setAttribute('icon-library', 'codicon')
  
  iconListItem.innerHTML += `<glyph>${iconGlyph}</glyph>`
  iconListItem.innerHTML += `<metadata> ${iconFriendlyName} codicon ${iconDescription} </metadata>`

  iconList.appendChild(iconListItem)
})

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
  iconListItem.setAttribute('icon-glyph', iconGlyph)
  iconListItem.setAttribute('icon-name', iconName)
  iconListItem.setAttribute('icon-library', 'seti')

  iconListItem.innerHTML += `<glyph>${iconGlyph}</glyph>`
  iconListItem.innerHTML += `<metadata> ${iconFriendlyName} seti ${iconDescription} </metadata>`

  iconList.appendChild(iconListItem)
})

function sanitizeText(string) {
  return string = string.replace(/-/gi, ' ');
}

search.addEventListener('keyup', function () {
  let filter = search.value.toUpperCase();
  let wrapper = document.getElementById('icon-list');
  let icon = iconList.getElementsByTagName('li');

  for (let i= 0; i < icon.length; i++) {
    let textInner = sanitizeText(icon[i].innerText)
    let textContents = sanitizeText(icon[i].textContent);
    let compareText = textContents || textInner;

    if (compareText.toUpperCase().indexOf(filter) > -1) {
      icon[i].style.display = '';
    } else {
      icon[i].style.display = 'none';
    }
  }
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

// document.getElementById('create').onclick = () => {
//   const textbox = document.getElementById('count') as HTMLInputElement
//   const count = parseInt(textbox.value, 10)
//   parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*')
// }

// document.getElementById('cancel').onclick = () => {
//   parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
// }