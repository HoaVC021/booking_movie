import {
  faFacebook, faGoogle, faInstagram,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import Logo from '../../../assets/images/logo-movie.png';
import './footerstyle.css';
function Footer() {
  return (
    <div className="footer__container">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={16} style={{ justifyContent: "space-between" }}>
          <Grid item lg={11} xs={16}>
            <div className="item_box">
              <img style={{ width: '8%' }} src={Logo} alt="Logo brand" />
              <div className="title">
                Griffin <div className="title__highlight">Movie</div>{' '}
              </div>
            </div>
          </Grid>
          <Grid item lg={5} xs={16}>
            <div className="social__box">
              <div className="social__item">
                <FontAwesomeIcon icon={faFacebook} />
              </div>
              <div className="social__item">
                <FontAwesomeIcon icon={faInstagram} />
              </div>
              <div className="social__item">
                <FontAwesomeIcon icon={faTwitter} />
              </div>
              <div className="social__item">
                <FontAwesomeIcon icon={faGoogle} />
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={16} style={{ marginBottom: "20px" }}>
          <Grid item lg={11} xs={16}>
            <div className="team_maked-left">
              Copyright © 2021.All Rights Reserved By Griffin
            </div>
          </Grid>
          <Grid item lg={5} xs={16}  >
            <div className="team_maked-right" >
              About Terms Of Use Privacy Policy FAQ Feedback
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Footer;
