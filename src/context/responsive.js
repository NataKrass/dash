import { bool } from 'prop-types';
import React from 'react';

const Responsive = React.createContext({
  isMobile: false,
  isTablet: false,
  details: true,
  setDetails: () => {},
  navbar: bool,
  setNavbar: () => {}
});

export default Responsive;