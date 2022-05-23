import React, { useEffect, Fragment, useRef, useState, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { agencyTheme } from 'common/theme/agency';
import ResetCSS from 'common/assets/css/style';
import { AgencyWrapper } from 'containers/Agency/agency.style';
import BlogSection from 'containers/Agency/BlogSection';
import Button from 'common/components/Button';
import Axios from 'axios';
import ImageUploader from './ImageUploader'

const News = () => {
  const userFileRef = useRef();
  const [saveFile, setSaveFile] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  async function saveFileApi({ name, file }) {
    const APIController = 'auth';

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('file', file);

      return await Axios({
        method: 'post',
        url: `${APIController}/test`,
        data: formData,
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
    } catch (exception) {
      console.error(exception);
      return {
        data: {
          result: false,
        },
      };
    }
  }

  const handleSelectFile = useCallback((ref) => async () => {
    ref.current?.click();
  }, []);

  const handleUploadFile = useCallback((ref) => async () => {
    const fileList = ref?.current.files;
    console.log(fileList);
    if (!fileList) {
      return;
    }
    setSaveFile(fileList[0]);
    const files = new FormData();
    files.append('images', fileList[0]);
    
    for (var value of files.values()) {
      console.log(value);
    }
    const result = Axios.post('http://localhost:3001/files/disk_upload', 
    files, 
    {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    })
    .then(res => {
      console.log(res);
    })
    console.log(result);

  }, []);

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  return (
    <ThemeProvider theme={agencyTheme}>
      <Fragment>
        <ResetCSS />
        <AgencyWrapper>
          <BlogSection />
          <Button
            type="button" 
            title="이미지 업로드" 
            onClick={handleSelectFile(userFileRef)}
          />
          <input
            type="file"
            // multiple="multiple"
            hidden
            ref={userFileRef}
            onChange={handleUploadFile(userFileRef)}
            accept="image/*"
            name="1"
          />
          <Button
            type="button"
            title="파일저장"
            onClick={handleClickOpen}
          >
            저장하기
          </Button>
          <ImageUploader open={modalOpen} setOpen={setModalOpen} />
        </AgencyWrapper>
        {/* End of agency wrapper section */}
      </Fragment>
    </ThemeProvider>
  );
};
export default News;
