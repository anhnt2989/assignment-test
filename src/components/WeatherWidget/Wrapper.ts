import styled from 'styled-components'

const Wrapper = styled.div`
  border: 1px solid rgba(150, 150, 150, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  .w-widget__info-block {
    padding: 20px 20px 0 20px;
    .w-widget__info-block__title {
      margin-bottom: 0;
      margin-block-end: 0;
      color: #333333;         // used to use ThemeProvider of styled-components to use color code as variables
    }
    .w-widget__info-block__info {
      font-size: 14px;
      span {
        color: #666666;         // used to use ThemeProvider of styled-components to use color code as variables
      }
    }
  }
`

export default Wrapper