import React, { Fragment, useEffect } from 'react';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import Box from 'common/components/Box';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Button from 'common/components/Button';
import FeatureBlock from 'common/components/FeatureBlock';
import Container from 'common/components/UI/Container';
import Particles from '../../Agency/Particle';
import BannerWrapper, { DiscountLabel } from './bannerSection.style';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore } from 'redux';
import Axios from 'axios';

const BannerSection = ({
  row,
  col,
  title,
  btnStyle,
  description,
  discountText,
  discountAmount,
}) => {
  const router = useRouter()
  const dispatch = useDispatch();

  const checkLofin = () => {
    const result = Axios.get("http://localhost:3001/auth/isLogin").then((res) => {
      console.log(res);
      dispatch({ type: 'success' })
    });
    console.log(result.data);
  }
  const loginState = useSelector((state) => state);

  // useEffect(() => {
  //   checkLofin();
  //   console.log(loginState);
  // }, [loginState]);


  const ButtonGroup = () => (
    <Fragment>
      <Button 
        title="임시 이미지 업로드 버튼"
        onClick={() => router.push('/images')}
        {...btnStyle}
      />
    </Fragment>
  );
  return (
    <BannerWrapper>
      {/* <Particles /> */}
      <Container>
        <Box className="row" {...row}>
          <Box className="col" {...col}>
            <DiscountLabel>
              <Text content="경근이를 위한" {...discountAmount} />
              <Text content="페이지" {...discountText} />
            </DiscountLabel>
            <FeatureBlock
              title={
                <Heading
                  content="메인 화면입니다."
                  {...title}
                />
              }
              description={
                <Text
                  content="Agencies around the world are moving to the digital agencies. So, It is high time to introduce your agency digitaly ."
                  {...description}
                />
              }
              button={<ButtonGroup />}
            />
          </Box>
        </Box>
      </Container>
    </BannerWrapper>
  );
};

BannerSection.propTypes = {
  title: PropTypes.object,
  btnStyle: PropTypes.object,
  description: PropTypes.object,
  contentStyle: PropTypes.object,
  discountText: PropTypes.object,
  discountAmount: PropTypes.object,
  outlineBtnStyle: PropTypes.object,
};

BannerSection.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: '-15px',
    mr: '-15px',
    alignItems: 'center',
  },
  col: {
    pr: '15px',
    pl: '15px',
    width: ['100%', '70%', '60%', '50%'],
  },
  title: {
    fontSize: ['26px', '34px', '42px', '55px'],
    fontWeight: '300',
    color: '#0f2137',
    letterSpacing: '-0.025em',
    mb: ['20px', '25px'],
    lineHeight: '1.31',
  },
  description: {
    fontSize: '16px',
    color: '#343d48cc',
    lineHeight: '2.1',
    mb: '0',
  },
  btnStyle: {
    minWidth: ['120px', '156px'],
    fontSize: '14px',
    fontWeight: '500',
  },
  outlineBtnStyle: {
    minWidth: ['130px', '156px'],
    fontSize: '14px',
    fontWeight: '500',
    color: '#0f2137',
    p: '5px 10px',
  },
  discountAmount: {
    fontSize: '14px',
    color: '#10AC84',
    mb: 0,
    as: 'span',
    mr: '0.4em',
  },
  discountText: {
    fontSize: '14px',
    color: '#0f2137',
    mb: 0,
    as: 'span',
  },
};

export default BannerSection;
