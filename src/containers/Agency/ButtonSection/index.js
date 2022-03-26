import React from 'react';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import Box from 'common/components/Box';
import Button from 'common/components/Button';
import Container from 'common/components/UI/Container';
import ButtonSectionWrapper, {
  ButtonForm,
} from './ButtonSection.style';


const ButtonSection = ({ sectionHeader, sectionTitle, btnStyle }) => {
  const router = useRouter();
  const envTest = process.env.NEXT_PUBLIC_BASE_URL;
  return (
    <ButtonSectionWrapper id="ButtonSection">
      <Container>
        <Box>
          <ButtonForm>
            <Button type="button" title="Buy On OpenSea" onClick={() => window.open('https://opensea.io/', '_blank')} {...btnStyle} />
            <Button type="button" title="More Piece of Work" onClick={() => window.open(`${envTest}/images`, '_blank')} {...btnStyle} />
          </ButtonForm>
        </Box>
      </Container>
    </ButtonSectionWrapper>
  );
};

// ButtonSection style props
ButtonSection.propTypes = {
  sectionHeader: PropTypes.object,
  sectionTitle: PropTypes.object,
  sectionSubTitle: PropTypes.object,
};

// ButtonSection default style
ButtonSection.defaultProps = {
  // section header default style
  sectionHeader: {
    mb: '56px',
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
  // button default style
  btnStyle: {
    minWidth: '152px',
    minHeight: '45px',
    fontSize: '14px',
    fontWeight: '500',
  },
};

export default ButtonSection;
