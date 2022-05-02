import React, { Fragment, useRef, useState, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { agencyTheme } from 'common/theme/agency';
import ResetCSS from 'common/assets/css/style';
import { AgencyWrapper } from 'containers/Agency/agency.style';
import BlogSection from 'containers/Agency/BlogSection';
import Button from 'common/components/Button';
import axios from 'axios';

const News = () => {
  const userFileRef = useRef();
  const [saveFile, setSaveFile] = useState({});

  async function saveFileApi({ name, file }) {
    const APIController = 'auth';

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('file', file);

      return await axios({
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
    const file = ref?.current.files;
    if (!file) {
      return;
    }
    console.log(file);
    console.log(file[0]);
    setSaveFile(file[0]);

  }, []);

  const handleSaveFile = useCallback((file) => async () => {
    if (file.length === 0) {
      alert('파일을 업로드 해주세요.');
      return;
    }
    const result = await saveFileApi({
      name: 'test',
      file,
    });

    console.log(result);

    // if (result?.data?.success) {
    //   closeWindow(true);
    // } else {
    //   alert('파일 저장에 실패했습니다.');
    // }
  }, []);

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
            onClick={handleSaveFile({saveFile})}
          >
            저장하기
          </Button>
        </AgencyWrapper>
        {/* End of agency wrapper section */}
      </Fragment>
    </ThemeProvider>
  );
};
export default News;
