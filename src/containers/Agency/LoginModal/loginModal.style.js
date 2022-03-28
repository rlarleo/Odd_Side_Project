import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const LoginModalWrapper = styled.div`
  margin: 71px auto;
  padding: 71px auto;
  border-radius: 5px;
  overflow: hidden;
  background-color: ${themeGet('colors.white', '#ffffff')};
  @media only screen and (min-width: 120px) {
    max-width: 1170px;
    width: 100%;
  }
`;

export default LoginModalWrapper;
