import './ui.css'

const data = require('./assets/codicon.json5')
const search = <HTMLInputElement>document.getElementById('search');
const iconList = document.getElementById('icon-list')
const icons = data['default']

icons.forEach((icon: {
    short_name: string,
    character: string,
    unicode: string,
    description: string,
  }) => {
  let iconListItem = document.createElement('li')
  let iconName = icon.short_name.replace(/-/g, ' ')
  let iconDescription = icon.description
  let iconGlyph = icon.character
  iconListItem.setAttribute('icon-glyph', iconGlyph)
  
  iconListItem.innerHTML += `<glyph>${iconGlyph}</glyph>`
  iconListItem.innerHTML += `<metadata> ${iconName} ${iconDescription} </metadata>`

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
  
  let name = <HTMLElement>e.target
  let glyph = name.getAttribute('icon-glyph')
  if (glyph != null) {
    // place item on Figma
    parent.postMessage({ pluginMessage: { type: 'create-icon', glyph } }, '*')
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