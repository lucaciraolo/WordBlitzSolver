import React from 'react';
import {Typography} from '@material-ui/core';

const BoggleBoardInput = ({onChange, onKeyDown, value}) => (
    <React.Fragment>
        <Typography>Input Boggle Board</Typography>
        <input type="text" value={value} onChange={onChange} onKeyDown={onKeyDown} />
    </React.Fragment>
    
);

export default BoggleBoardInput;