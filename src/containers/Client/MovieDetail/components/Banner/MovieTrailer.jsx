import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTrailer } from '../../movieDetailSlice';
import { useStyles } from './style';
import './style.css'

export default function MovieTrailer() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const urlTrailer = useSelector(state => state.movieDetail.movie.trailer)
    const open = useSelector(state => state.movieDetail.open)
    const handleOpen = () => {
        dispatch(toggleTrailer(true))
    };
    const handleClose = () => {
        dispatch(toggleTrailer(false))
    };
    return (
        <div>
            <PlayCircleOutlineIcon
                onClick={handleOpen}
                sx={{ fontSize: '110px', fill: '#00000078' }}
            />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.reactPlayer}>
                    <ReactPlayer
                        id="modal-modal-description"
                        url={urlTrailer || ''}
                        controls={true}
                        playing={true}
                        width="100%"
                        height="100%"
                    />
                </Box>
            </Modal>
        </div>
    );
}
