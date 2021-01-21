import { createGlobalStyle } from 'styled-components/macro';
export default {
  palette: {
    dark: {
      background: {
        blueBlack: '#2b3040'
      },
      color: {
        white: '#ffffff',
        dimWhite: '#f0f0f0',
        darkWhite: '#d0d0d0'
      }
    },
    light: {
      background: {
        blueWhite: '#f7f8ff'
      },
      color: {
        black: '#000000',
        darkGray: '#101117',
        blueGray: '#2d2f3b',
      }
    }
  }
}


export const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    background: ${props => props.themeSelection ? props.theme.palette.light.background.blueWhite : props.theme.palette.dark.background.blueBlack }
  }
  * {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  h1, h2, h3 {
    font-weight:bold;
    color: ${props => props.themeSelection ? props.theme.palette.light.color.darkGray : props.theme.palette.dark.color.dimWhite }
  }
  .ThemeButton {
    position:fixed;
    top:0px;
    right:0px;
    width:75px;
    height: 30px;
    border-radius:0;
    border: 0;
    background:white;
    cursor:pointer;
    font-size:18px;
  }
`;