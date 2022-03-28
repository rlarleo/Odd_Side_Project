import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { base, themed } from '../base';
import IconButton from '@mui/material/IconButton';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const envTest = process.env.NEXT_PUBLIC_BASE_URL;

const Management = ({ url }) => (
  <p align="right">
    <IconButton
      variant="outlined"
      onClick={() => window.open(`${envTest}management/${url}`, '_blank')}
    >
      <ManageAccountsIcon />
    </IconButton>
  </p>
);

export default Management;
