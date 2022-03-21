import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useStyles } from '../../style';
import { useDispatch, useSelector } from 'react-redux';
import { getTheater, getTime } from '../../../../movieDetailSlice';

export default function FormSelect({
    listShowTime,
    onHanleChange,
    inputLable,
    lichChieuPhim,
}) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const rap = useSelector(state => state.movieDetail.rap)
    const time = useSelector(state => state.movieDetail.time)

    const handleChange = (event, value) => {
        if (value === 'theater') {
            dispatch(getTheater(event.target.value))
        }
        if (value === 'date') {
            dispatch(getTime(event.target.value))
        }
        if (onHanleChange) {
            onHanleChange(event.target.value);
        }
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel
                    id="demo-simple-select-label"
                    sx={{
                        color: '#24708e',
                    }}
                >
                    {inputLable}
                </InputLabel>
                {listShowTime && listShowTime.length > 0 && (
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={rap}
                        label="Theater"
                        onChange={(e) => handleChange(e, 'theater')}
                        className={classes.selectItem}
                        sx={{
                            color: '#24708e',
                        }}
                    >
                        {listShowTime.map((item) => (
                            <MenuItem
                                key={item.maHeThongRap}
                                value={item.maHeThongRap}
                                style={{ color: 'black', borderBottom: '1px solid #777' }}
                            >
                                {item.tenHeThongRap}
                            </MenuItem>
                        ))}
                    </Select>
                )}
                {lichChieuPhim && Object.keys(lichChieuPhim).length > 0 && (
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={time}
                        onChange={(e) => handleChange(e, 'date')}
                        label="Theater"
                        className={classes.selectItem}
                        sx={{
                            color: '#24708e',
                        }}
                    >
                        {Object.keys(lichChieuPhim).map((item) => (
                            <MenuItem
                                key={item}
                                value={item}
                                style={{ color: 'black', borderBottom: '1px solid #777' }}
                            >
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            </FormControl>
        </Box>
    );
}
