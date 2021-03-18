figma.showUI(__html__, { width: 320, height: 350 })

const codiconTextStyleKey = '640604ee4b4f01ff327acfaaa8305c92199c7473'
const codiconTextStyleId = 'S:640604ee4b4f01ff327acfaaa8305c92199c7473,2712:14'
const codiconColorStyleKey = '41f0c94d560e9b73b202dfc059e411effca235a4'
const codiconColorStyleId = 'S:41f0c94d560e9b73b202dfc059e411effca235a4,2919:50'

const nodes: SceneNode[] = [];
const data = require('./assets/codicon.json5')
const icons = data['default']

figma.ui.onmessage = async msg => {
  if (msg.type === 'create-icon') {
    // let text: TextNode
    
    await figma.loadFontAsync({ family: "codicon", style: "Regular" });
    
    console.log(figma.clientStorage.getAsync)
    // create new text object
    if (figma.currentPage.selection.length == 0) {

      
      
      const text: TextNode = figma.createText()
      text.fontName = { family: "codicon", style: "Regular" }
      text.characters = msg.glyph
      text.name = 'codicon: ' + msg.name
      text.fontSize = 16

      // color style
      await figma.importStyleByKeyAsync(codiconColorStyleKey)
      text.fillStyleId = codiconColorStyleId

      // text style
      await figma.importStyleByKeyAsync(codiconTextStyleKey)
      text.textStyleId = codiconTextStyleId

      nodes.push(text)
      figma.currentPage.selection = nodes
      // figma.viewport.scrollAndZoomIntoView(nodes)
    }

    // replace text objbect
    else {
      // unload current font
      let selection = <TextNode>figma.currentPage.selection[0]
      let currentFontName = selection.fontName
      await figma.loadFontAsync({ family: `${currentFontName['family']}`, style: `${currentFontName['style']}` });

      let text = <TextNode>selection
      text.characters = msg.glyph
      text.name = 'codicon: ' + msg.name
      text.fillStyleId = codiconColorStyleId
      text.textStyleId = codiconTextStyleId

      
    }
    

    
  }



}
