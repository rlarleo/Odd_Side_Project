import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from 'common/components/Box';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Button from 'common/components/Button';
import Management from 'common/components/Management';
import NextImage from 'common/components/NextImage';
import data from 'common/data/Agency';
import Container from 'common/components/UI/Container';
import GlideCarousel from 'common/components/GlideCarousel';
import GlideSlide from 'common/components/GlideCarousel/glideSlide';
import SlideSectionWrapper, {
  TextWrapper,
  ImageWrapper,
} from './slideSection.style';
import { useSelector } from 'react-redux'
import Axios from 'axios';

const SlideSection = ({
  sectionHeader,
  sectionTitle,
  sectionSubTitle,
  btnWrapperStyle,
  commentStyle,
  nameStyle,
  btnStyle,
  designationStyle,
}) => {
  const manager = useSelector( (state) => state );
  const [newsFiles, setNewsFiles] = React.useState([]);
  // Glide js options
  const glideOptions = {
    type: 'carousel',
    // autoplay: 5000,
    perView: 1,
    animationDuration: 700,
  };
  
  const isLogin = useSelector((state) => state);

  useEffect(() => {
    Axios.get("http://localhost:3001/files/news-file")
    .then((res) => {
      setNewsFiles(res.data);
    });
  }, [])

  return (
    <SlideSectionWrapper id="slideSection">
      <Container>
        <Box {...sectionHeader}>
          {isLogin && <Management url="news" />}
          <Text content="News" {...sectionSubTitle} />
          <Heading content="I'm Iron Mann" {...sectionTitle} />
        </Box>
        <GlideCarousel
          options={glideOptions}
          buttonWrapperStyle={btnWrapperStyle}
          nextButton={
            <Button
              icon={<i className="flaticon-next" />}
              aria-label="Next"
              variant="textButton"
              {...btnStyle}
            />
          }
          prevButton={
            <Button
              icon={<i className="flaticon-left-arrow" />}
              aria-label="Prev"
              variant="textButton"
              {...btnStyle}
            />
          }
        >
          <Fragment>
            {newsFiles.map((item, index) => (
              <GlideSlide key={index}>
                <Fragment>
                  <TextWrapper>
                    <i className="flaticon-quotes" />
                    <Text content={item.description} {...commentStyle} />
                    <Heading content={item.title} {...nameStyle} />
                    <Heading content={item.title} {...designationStyle} />
                  </TextWrapper>
                  <ImageWrapper>
                    <NextImage 
                      src={`http://localhost:3001/news/${item.fileName}`}
                      width="100%" height="100%" layout="responsive" objectFit="contain"
                      alt="Client Image"  
                    />
                  </ImageWrapper>
                </Fragment>
              </GlideSlide>
            ))}
          </Fragment>
        </GlideCarousel>
      </Container>
    </SlideSectionWrapper>
  );
};

// SlideSection style props
SlideSection.propTypes = {
  sectionHeader: PropTypes.object,
  sectionTitle: PropTypes.object,
  sectionSubTitle: PropTypes.object,
  row: PropTypes.object,
  col: PropTypes.object,
  btnStyle: PropTypes.object,
  btnWrapperStyle: PropTypes.object,
  nameStyle: PropTypes.object,
  commentStyle: PropTypes.object,
  designationStyle: PropTypes.object,
};

// SlideSection default style
SlideSection.defaultProps = {
  // section header default style
  sectionHeader: {
    pt: '30px',
    mb: '56px',
  },
  // sub section default style
  sectionSubTitle: {
    as: 'span',
    display: 'block',
    textAlign: 'center',
    fontSize: '14px',
    letterSpacing: '0.15em',
    fontWeight: '700',
    color: '#10ac84',
    mb: '10px',
  },
  // section title default style
  sectionTitle: {
    textAlign: 'center',
    fontSize: ['20px', '24px'],
    fontWeight: '400',
    color: '#0f2137',
    letterSpacing: '-0.025em',
    mb: '0',
  },
  // client comment style
  commentStyle: {
    color: '#343d48',
    fontWeight: '300',
    fontSize: ['20px', '24px'],
    lineHeight: '1.67',
    mb: '47px',
  },
  // client name style
  nameStyle: {
    as: 'h3',
    color: '#343d48',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '30px',
    mb: 0,
  },
  // client designation style
  designationStyle: {
    as: 'h5',
    color: 'rgba(52, 61, 72, 0.8)',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '30px',
    mb: 0,
  },
  // glide slider nav controls style
  btnWrapperStyle: {
    position: 'absolute',
    bottom: '62px',
    left: '12px',
  },
  // next / prev btn style
  btnStyle: {
    minWidth: 'auto',
    minHeight: 'auto',
    mr: '13px',
    fontSize: '16px',
    color: '#343d484d',
  },
};

export default SlideSection;
