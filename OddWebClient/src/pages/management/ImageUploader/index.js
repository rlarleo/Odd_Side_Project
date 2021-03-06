import React, {useState, useCallback} from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Divider,
  Typography,
  MenuItem,
  Paper,
  Grid,
  DialogContentText,
  SelectChangeEvent,
  TextField,
  CircularProgress,
} from '@mui/material';
import ImageUploder from 'common/components/ImageUploader'
import Axios from 'axios';

const ImageUploader = ({ open, setOpen, trigger, setTrigger }) => {
  const [file, setFile] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const handleClose = () => {
    setFile([]);
    setTitle('');
    setDescription('');
    setOpen(false);
  };
  
  const handleUploadFile = useCallback(async () => {

    if (!file.length) {
      return;
    }
    const files = new FormData();
    files.append('images', file[0].data);
    files.append('fileName', '');
    files.append('title', title);
    files.append('description', description);
    
    const result = Axios.post('http://localhost:3001/files/disk_upload', 
    files,
    {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    })
    .then(res => {
      alert('이미지 저장에 성공했습니다.');
      setTrigger(!trigger);
    })
    .catch(function (error) {
      alert('이미지 저장에 실패했습니다.');
    })
    setFile([]);
    setTitle('');
    setDescription('');
    setOpen(false);
  }, [file, title, description]);

  return (
  <Dialog
    open={open}
    onClose={handleClose}
    maxWidth="md"
  >
    <DialogTitle id="news">
      <Typography variant="h5" sx={{ fontWeight: 500 }}>
        이미지 업로드
      </Typography>
    </DialogTitle>
    <DialogContent>
      <Stack direction="row" spacing={2}>
        <Paper
          variant="outlined"
          sx={{ textAlign: 'center', minWidth: '235px', minHeight: '235px', my: 2 }}
        >
          <ImageUploder parentFile={file} setParentFile={setFile}  />
        </Paper>
        <Divider orientation="vertical" flexItem />
        <Stack direction="column" flex={1} spacing={2} sx={{ pt: 2 }}>
          <TextField
            value={title}
            label='title'
            fullWidth
            size="small"
            onChange={event => setTitle(event.target.value)}
          />
          <TextField
            value={description}
            label='description'
            fullWidth
            size="small"
            multiline
            rows={4}
            onChange={event => setDescription(event.target.value)}
          />
        </Stack>
      </Stack>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Disagree</Button>
      <Button onClick={handleUploadFile} autoFocus>
        Agree
      </Button>
    </DialogActions>
  </Dialog>
  )
};

export default ImageUploader;
