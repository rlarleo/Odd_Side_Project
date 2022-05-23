import { IconButton, Stack } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
  position: 'relative',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

const ImageUploader = ({
  parentFile,
  setParentFile,
}) => {
  const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    border: ' 2px dashed #8C969C',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#8C969C',
    borderStyle: 'dashed',
    backgroundColor: '#EFEFEF',
    color: '#8C969C',
    transition: 'border .3s ease-in-out',
    minHeight: '235px',
  };

  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    width: 300,
    height: 200,
    padding: 4,
    justifyContent: 'center',
    boxSizing: 'border-box',
  };
  const onDrop = useCallback(acceptedFiles => {
    setParentFile(
      acceptedFiles.map((file) => ({
        data: file,
        preview: URL.createObjectURL(file),
      })),
    );
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    multiple: false,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  );

  const handleDelete = () => {
    setParentFile([]);
  };

  const thumbs = parentFile.map(file => (
    <div style={{ display: 'flex' }}>
      <div style={thumb} key={file.data.name}>
        <div style={thumbInner}>
          <img src={file.preview} style={img} alt="preview" />
        </div>
      </div>
    </div>
  ));

  return parentFile.length === 0 || !parentFile[0].preview ? (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      <CloudUploadIcon fontSize="large" />
      <span
        style={{
          paddingTop: '10px',
          textAlign: 'center',
          color: '#8C969C',
        }}
      >
        드래그 앤 드롭
      </span>
    </div>
  ) : (
    <Stack direction="column">
      <Stack direction="row" justifyContent="flex-end">
        <IconButton
          sx={{
            '-webkit-align-items': 'flex-start',
            p: 0,
            top: 0,
            mr: '8px',
            height: '10px',
          }}
          onClick={() => handleDelete(parentFile[0].data.name)}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
      <Stack
        marginTop={2}
        marginBottom={1}
        direction="row"
        justifyContent="center"
        sx={{
          overflowX: 'scroll',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {thumbs}
      </Stack>
    </Stack>
  );
};

export default ImageUploader;