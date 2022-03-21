import { Box } from '@mui/material';
import React from 'react';
import PayItem from './PayItem';

import amazonIcon from '../../../../../../../assets/images/amazon.png';
import paypalIcon from '../../../../../../../assets/images/paypal.png';
import hdBankIcon from '../../../../../../../assets/images/hdbank.png';
import { useStyles } from '../../style';

const listPay = [
    {
        icon: amazonIcon,
        title: 'Amazon Pay Cashback',
        des: 'Win Cashback Upto Rs 300*',
    },
    {
        icon: paypalIcon,
        title: 'PayPal',
        des: 'Transact first time with Paypal and get 100% cashback up to Rs. 500',
    },
    {
        icon: hdBankIcon,
        title: 'HDFC Bank',
        des: 'Get 15% discount up to INR 100* and INR 50* off on F&B T&C apply',
    },
];

export default function Pay() {
    const classes = useStyles();
    return (
        <Box className={classes.payBox}>
            {listPay.map((item, index) => (
                <PayItem key={index} item={item} />
            ))}
        </Box>
    );
}
