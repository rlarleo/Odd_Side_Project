import React from 'react';
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
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from 'common/components/Box';

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

const icon = (
  <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
    <Box component="svg" sx={{ width: 100, height: 100 }}>
      <Box
        component="polygon"
        sx={{
          fill: (theme) => theme.palette.common.white,
          stroke: (theme) => theme.palette.divider,
          strokeWidth: 1,
        }}
        points="0,100 50,00, 100,100"
      />
    </Box>
  </Paper>
);

const BlogSection = ({
  row,
  sectionHeader,
  sectionTitle,
  sectionSubTitle,
  blogTitle,
  blogMeta,
}) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
  const containerRef = React.useRef(null);
  const [page, setPage] = React.useState(1);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  
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
          {data.blog.map((post, index) => {
            if(index <= page+1 && index >= page-1){
              return (
                <FeatureBlock
                  key={`post_key-${index}`}
                  id={`post_id-${post.id}`}
                  className="blog__post"
                  icon={
                    <NextImage
                      src={post.thumbnail_url}
                      alt={`Blog Image ${post.id}`}
                      className="blog__image"
                      layout="fill"
                    />
                  }
                  title={
                    <Link href={post.postLink} {...blogTitle}>
                      {post.title}
                    </Link>
                  }
                  description={<Text content={post.date} {...blogMeta} />}
                />)
              } else return <></>
          })}
        </CustomBox>
        </Box>
        <Stack spacing={2} sx={{justifyContent: "space-between"}}>
          <Pagination 
            className={classes.pagination}
            count={data.blog.length-2} // 3개씩 보여야 하므로 마지막 2개 제외
            onChange={handlePageChange} 
          />
        </Stack>
        {/* <Box
          sx={{
            height: 180,
            width: 240,
            display: 'flex',
            padding: 2,
            borderRadius: 1,
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? 'grey.100' : 'grey.900',
            overflow: 'hidden',
          }}
          ref={containerRef}
        >
          <Box sx={{ width: 200 }}>
            <FormControlLabel
              control={<Switch checked={checked} onChange={handleChange} />}
              label="Show from target"
            />
            <Slide direction="up" in={checked} container={containerRef.current}>
              {icon}
            </Slide>
          </Box>
        </Box> */}
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
