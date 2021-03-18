figma.showUI(__html__, { width: 300, height: 350 })

const codiconTextStyleId = 'S:640604ee4b4f01ff327acfaaa8305c92199c7473,2712:14'
const codiconColorStyleId = 'S:41f0c94d560e9b73b202dfc059e411effca235a4,2919:50'

const nodes: SceneNode[] = [];
const data = require('./assets/codicon.json5')
const icons = data['default']

figma.ui.onmessage = async msg => {
  if (msg.type === 'create-icon') {
    let text: TextNode
    
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
    
    // create new text object
    if (figma.currentPage.selection.length == 0) {
      
      text = figma.createText()
      text.characters = msg.glyph
      text.fillStyleId = codiconColorStyleId
      text.textStyleId = codiconTextStyleId
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
      text.fillStyleId = codiconColorStyleId
      text.textStyleId = codiconTextStyleId

      
    }
    

    
  }



}
