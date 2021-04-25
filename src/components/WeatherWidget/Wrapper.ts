import styled from 'styled-components'

const Wrapper = styled.div`
  border: 1px solid rgba(150, 150, 150, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  .w-widget__info-block {
    padding: 20px;
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
  .img {
    max-width: 100%;
    object-fit: cover;
  }
  .w-widget__title-temp {
    margin-bottom: 0;
    font-size: 44px;
    white-space: nowrap;
    display: flex;
    align-items: center;
    height: 100%;
    color: #000000;          // used to use ThemeProvider of styled-components to use color code as variables
  }
  .w-widget__unit-selector {
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
    height: 75%;
    color: #888888;         // used to use ThemeProvider of styled-components to use color code as variables
    span {
      cursor: pointer;
      &.activated {
        color: #000000;       // used to use ThemeProvider of styled-components to use color code as variables
        text-decoration: underline;
      }
    }
  }
  .w-widget__w-info {
    padding-left: 1.5rem;
    padding-top: 1rem;
    font-size: 14px;
    @media screen and (max-width) {
      padding-left: 0;
      padding-top: 0;
    }
  }
  .forecast__wrapper {
    border-top: 1px solid rgba(150,150,150,0.3);
    border-right: 1px solid rgba(150,150,150,0.3);
    padding: 20px 0px;
    &:last-child {
      border-right: none !important;
    }
    .forecast__dt {
      font-size: 14px;
      font-weight: bold;
    }
    .forecast__temp-block {
      .forecast__max-temp {
        font-size: 18px;
        font-weight: bold;
      }
      .forecast__min-temp {
        font-size: 14px;
      }
    }
  }
  .w-widget__no-data {
    text-align: center;
    padding: 5rem 0;
    .w-widget__no-data-desc {
      margin-top: 2rem;
      span {
        font-size: 18px;
        color: #333333;           // used to use ThemeProvider of styled-components to use color code as variables
      }
    }
  }
`

export default Wrapper