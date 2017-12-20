export default {

  // Capitalizes a string of text
  capitalize: (text) => {
    if (text == null){
      return ''
    }

    if (text.length == 0){
      return text
    }

    return text.charAt(0).toUpperCase() + text.substring(1)

  }
}