import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs, { TabPane } from 'rc-tabs';
// import TabContent from 'rc-tabs/lib/TabContent';
// import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import Box from 'common/components/Box';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Input from 'common/components/Input';
import Button from 'common/components/Button';
import Image from 'common/components/Image';
import LoginModalWrapper from './loginModal.style';
import 'rc-tabs/assets/index.css';
import LogoImage from 'common/assets/image/agency/logo.png';
import LoginImage from 'common/assets/image/agency/login-bg.jpg';
import { ConnectingAirportsOutlined } from '@mui/icons-material';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';

const LoginModal = ({
  row,
  col,
  btnStyle,
  logoStyle,
  titleStyle,
  contentWrapper,
  descriptionStyle,
}) => {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [registerInfo, setRegisterInfo] = useState({ email: '', username: '', password: '' });
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state);

  const LoginButtonGroup = () => (
      <Button className="default" title="LOGIN" onClick={() => handleLogin()} {...btnStyle} />
  );
  const LogoutButtonGroup = () => (
      <Button className="default" title="LOGOUT" onClick={() => handleLogout()} {...btnStyle} />
  );
  const SignupButtonGroup = () => (
    <Fragment>
      <Button className="default" title="REGISTER" onClick={() => handleRegister()} {...btnStyle} />
    </Fragment>
  );

  const handleLogout = () => {
    Axios.post('http://localhost:3001/auth/login', {
      email: loginInfo.email,
      password: loginInfo.password,
    })
    .then(res => {
      console.log(res);
      dispatch({ type: 'fail' });
    })
  }

  const handleLogin = () => {
    Axios.post('http://localhost:3001/auth/login', {
      email: loginInfo.email,
      password: loginInfo.password,
    })
    .then(res => {
      console.log(res);
      dispatch({ type: 'success' });
    })
  }

  const handleRegister = () => {
    Axios.post('http://localhost:3001/auth/register', {
      username: registerInfo.username,
      password: registerInfo.password,
      email: registerInfo.email,
    })
    .then(res => {
      console.log(res);
    })
  }

  const onChangeLoginInfo = (e, name) => {
    setLoginInfo({
      ...loginInfo,
      [name]: e,
    });
  };

  const onChangeRegisterInfo = (e, name) => {
    setRegisterInfo({
      ...registerInfo,
      [name]: e,
    });
  };

  return (
    <LoginModalWrapper>
      <Box className="row" {...row}>
        <Box className="col imageCol" {...col}>
          <Image className="patternImage" src={LoginImage.src} alt="Login Banner" />
        </Box>
        <Box className="col tabCol" {...col}>
          <Box {...contentWrapper}>
            <Image src={LogoImage.src} {...logoStyle} alt="Logo Image" />
            <Tabs
              defaultActiveKey="loginForm"
              animated={{ tabPane: true }}
            >
              <TabPane tab="LOGIN" key="loginForm">
                <Heading content="Welcome Odd" {...titleStyle} style={{ paddingTop: "40px"}}/>
                <Text
                  content="Welcome to Odd. Please login with your personal account information letter."
                  {...descriptionStyle}
                />
                {loginState? 
                  (<div> 로그인 성공</div>) : 
                  (<>
                    <Input onChange={event => onChangeLoginInfo(event, "email")} inputType="email" isMaterial label="E-mail" />
                    <Input onChange={event => onChangeLoginInfo(event, "password")} inputType="password" isMaterial label="Password" />
                  </>)}
                <div style={{ paddingTop: "40px", textAlign: "right" }}>
                  {loginState? <LogoutButtonGroup /> : <LoginButtonGroup />}
                </div>
              </TabPane>
              <TabPane tab="REGISTER" key="registerForm">
                <Heading content="Welcome Odd" {...titleStyle} style={{ paddingTop: "40px"}} />
                <Text
                  content="Welcome to Odd. Please register with your personal account information letter."
                  {...descriptionStyle}
                />
                <Input onChange={event => onChangeRegisterInfo(event, "username")} isMaterial label="Name" />
                <Input onChange={event => onChangeRegisterInfo(event, "email")} inputType="email" isMaterial label="E-mail" />
                <Input onChange={event => onChangeRegisterInfo(event, "password")} inputType="password" isMaterial label="Password" />
                <div style={{ paddingTop: "40px", textAlign: "right" }}>
                  <SignupButtonGroup onClick={() => handleRegister} />
                </div>
              </TabPane>
            </Tabs>
          </Box>
        </Box>
      </Box>
    </LoginModalWrapper>
  );
};

// LoginModal style props
LoginModal.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
  logoStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  hintTextStyle: PropTypes.object,
  contentWrapper: PropTypes.object,
  descriptionStyle: PropTypes.object,
  googleButtonStyle: PropTypes.object,
};

// LoginModal default style
LoginModal.defaultProps = {
  // Team member row default style
  row: {
    flexBox: true,
    flexWrap: 'wrap',
  },
  // Team member col default style
  col: {
    width: [1, 1 / 2],
  },
  // Default logo size
  logoStyle: {
    width: '128px',
    height: 'auto',
    ml: '15px',
  },
  // Title default style
  titleStyle: {
    fontSize: ['22px', '36px', '50px'],
    fontWeight: '400',
    color: '#20201D',
    letterSpacing: '-0.025em',
    mt: '35px',
    mb: '10px',
    pb: '20px',
  },
  // Description default style
  descriptionStyle: {
    color: 'rgba(52, 61, 72, 0.8)',
    fontSize: '15px',
    lineHeight: '26px',
    letterSpacing: '-0.025em',
    mb: '23px',
    ml: '1px',
    pb: '40px'
  },
  // Content wrapper style
  contentWrapper: {
    pt: ['32px', '56px'],
    pl: ['17px', '32px', '38px', '40px', '56px'],
    pr: '32px',
    pb: ['32px', '56px'],
  },
  // Default button style
  btnStyle: {
    minWidth: '156px',
    fontSize: '14px',
    fontWeight: '500',
  },
  // Outline button outline style
  outlineBtnStyle: {
    minWidth: '156px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#10ac84',
  },
  // Google button style
  googleButtonStyle: {
    bg: '#ffffff',
    color: '#343D48',
  },
};

export default LoginModal;
