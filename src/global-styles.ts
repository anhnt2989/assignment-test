import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

  html,
  body {
    height: 100%;
    width: 100%;
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
  }

  body {
    font-family: 'Roboto', sans-serif;
  }

  body.fontLoaded {
    font-family: 'Roboto', sans-serif;
  }

  #root {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: 'Roboto', sans-serif;
    line-height: 1.5em;
  }
  
  .image {
    max-width: 100%;
    object-fit: cover;
  }
`;

export default GlobalStyle
