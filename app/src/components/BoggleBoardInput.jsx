import React from 'react';
import {Typography} from '@material-ui/core';

const BoggleBoardInput = ({onChange}) => (
    <React.Fragment>
        <Typography>Input Boggle Board</Typography>
        <input type="text" onChange={onChange} />
    </React.Fragment>
    
);

export default BoggleBoardInput;