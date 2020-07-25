let primary = '#FF5B04'
let secondary = '#ffaa81'
let tertiary = '#FF5B04'
export default {
  primaryDark: '#FF5B04',
  primary: primary,
  danger: '#ff0000',
  warning: '#ffc107',
  secondary: secondary,
  white: '#ffffff',
  gray: '#cccccc',
  lightGray: '#eeeeee',
  darkGray: '#555555',
  normalGray: '#999',
  black: '#000',
  success: '#4BB543',
  goldenYellow: '#FFDF00',
  tertiary: tertiary,
  setPrimary(color){
    this.primary = color
  },
  setSecondary(color){
    this.secondary = color
  },
  setTertiary(color){
    this.tertiary = color
  }
}