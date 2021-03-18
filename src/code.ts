figma.showUI(__html__, { width: 350, height: 450 })

const codiconTextStyleKey = '640604ee4b4f01ff327acfaaa8305c92199c7473'
const codiconTextStyleId = 'S:640604ee4b4f01ff327acfaaa8305c92199c7473,2712:14'
const codiconColorStyleKey = '41f0c94d560e9b73b202dfc059e411effca235a4'
const codiconColorStyleId = 'S:41f0c94d560e9b73b202dfc059e411effca235a4,2919:50'

const setiTextStyleKey = '499eeb6b308eeb612583df30b0a4fd990d4dbbc5'
const setiTextStyleId = 'S:499eeb6b308eeb612583df30b0a4fd990d4dbbc5,940:8'
const setiColorStyleKey = '9fc238b130e8f6f24ab1ecfaff5ecd1f1389528f'
const setiColorStyleId = 'S:9fc238b130e8f6f24ab1ecfaff5ecd1f1389528f,2919:5'

const nodes: SceneNode[] = [];
const data = require('./assets/codicon.json5')
const icons = data['default']

figma.ui.onmessage = async msg => {
  const nodes = []
  
  if (msg.type === 'create-icon') {
    
    // load libraries
    await figma.loadFontAsync({ family: "codicon", style: "Regular" });
    await figma.importStyleByKeyAsync(setiTextStyleKey)
    await figma.importStyleByKeyAsync(setiColorStyleKey)
    await figma.importStyleByKeyAsync(codiconTextStyleKey)
    await figma.importStyleByKeyAsync(codiconColorStyleKey)

    // create new text object
    if (figma.currentPage.selection.length == 0) {

      const text: TextNode = figma.createText()
      text.fontName = { family: "codicon", style: "Regular" }
      text.characters = msg.glyph
      text.fontSize = 16

      if (msg.library == 'seti') {
        text.name = 'seti: ' + msg.name
        text.textStyleId = setiTextStyleId
        text.fillStyleId = setiColorStyleId
      } else {
        text.name = 'codicon: ' + msg.name
        text.textStyleId = codiconTextStyleId
        text.fillStyleId = codiconColorStyleId
      }

      nodes.push(text)
      figma.currentPage.selection = nodes
      figma.viewport.scrollAndZoomIntoView(nodes)

    }

    // replace text objbect
    else {
      // unload current font
      let selection = <TextNode>figma.currentPage.selection[0]
      let currentFontName = selection.fontName
      await figma.loadFontAsync({ family: `${currentFontName['family']}`, style: `${currentFontName['style']}` });

      let text = <TextNode>selection
      text.characters = msg.glyph

      if (msg.library == 'seti') {
        text.name = 'seti: ' + msg.name
        text.textStyleId = setiTextStyleId
      } else {
        text.name = 'codicon: ' + msg.name
        text.textStyleId = codiconTextStyleId
      }

      nodes.push(text)
      figma.currentPage.selection = nodes
      figma.viewport.scrollAndZoomIntoView(nodes)

    }

    

  }

  



}
