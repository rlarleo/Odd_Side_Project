import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomBox from 'common/components/Box';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Link from 'common/components/Link';
import NextImage from 'common/components/NextImage';
import FeatureBlock from 'common/components/FeatureBlock';
import data from 'common/data/Agency';
import Container from 'common/components/UI/Container';
import BlogSectionWrapper from './blogSection.style';
import { makeStyles } from '@material-ui/core/styles';
import Box from 'common/components/Box';
import{
  Pagination,
  Stack,
  Paper,
} from '@mui/material'
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
      justifyContent:"center",
      display:'flex'
    }
  },
  pagination: {
    alignItems: 'center',
    justify: 'center',
  },
  "& MuiPagination-ul css-wjh20t-MuiPagination-ul": {
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'proxima-nova', 'Noto Sans KR', sans-serif",
    letterSpacing: "-0.1px",
  },
}));

const BlogSection = ({
  row,
  sectionHeader,
  sectionTitle,
  sectionSubTitle,
  blogTitle,
  blogMeta,
  trigger,
}) => {
  const classes = useStyles();
  const containerRef = React.useRef(null);
  const [page, setPage] = React.useState(1);
  const [newsFiles, setNewsFiles] = React.useState([]);
  console.log('trigger', trigger);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  
  useEffect(() => {
    Axios.get("http://localhost:3001/files/news-file")
    .then((res) => {
      setNewsFiles(res.data);
    });
  }, [trigger]) 

  return (
    <BlogSectionWrapper id="blogSection">
      <Container>
        <CustomBox {...sectionHeader}>
          <Text content="News" {...sectionSubTitle} />
          <Heading
            content="Meet our work experience"
            {...sectionTitle}
          />
        </CustomBox>
        <Box
          sx={{
            height: 180,
            width: 240,
            display: 'flex',
            padding: 2,
            borderRadius: 1,
            overflow: 'hidden',
          }}
          ref={containerRef}
        >
        <CustomBox className="row" {...row}>
          {newsFiles.map((file, index) => {
            if(index <= page+1 && index >= page-1){
              return (
                <FeatureBlock
                  key={`post_key-${index}`}
                  id={`post_id-${index}`}
                  className="blog__post"
                  icon={
                    <NextImage
                      src={`http://localhost:3001/news/${file.fileName}`}
                      alt={`Blog Image ${index}`}
                      className="blog__image"
                      layout="fill"
                    />
                  }
                  title={
                    <Link href={'링크입니다.'} {...blogTitle}>
                      {file.title}
                    </Link>
                  }
                  description={<Text content={file.description} {...blogMeta} />}
                />)
              } else return <></>
          })}
        </CustomBox>
        </Box>
        <Stack spacing={2} style={{alignItems: 'center'}}>
          <Pagination 
            className={classes.pagination}
            count={newsFiles.length > 3 ? newsFiles.length-2 : 1} // 3개씩 보여야 하므로 마지막 2개 제외
            onChange={handlePageChange} 
          />
        </Stack>
      </Container>
    </BlogSectionWrapper>
  );
};

// BlogSection style props
BlogSection.propTypes = {
  sectionHeader: PropTypes.object,
  row: PropTypes.object,
  col: PropTypes.object,
  sectionTitle: PropTypes.object,
  sectionSubTitle: PropTypes.object,
  blogTitle: PropTypes.object,
  blogMeta: PropTypes.object,
  trigger: PropTypes.any,
};

// BlogSection default style
BlogSection.defaultProps = {
  // section header default style
  sectionHeader: {
    mb: ['40px', '56px'],
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
  // Blog post row default style
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: '-12px',
    mr: '-12px',
  },
  // Blog post title default style
  blogTitle: {
    fontSize: ['20px', '24px'],
    fontWeight: '400',
    color: '#ffffff',
    lineHeight: '1.5',
    mb: '10px',
    letterSpacing: '-0.020em',
  },
  // Blog post description default style
  blogMeta: {
    fontSize: '16px',
    lineHeight: '1',
    color: 'rgba(255, 255, 255, 0.5)',
    mb: 0,
  },
};

export default BlogSection;
