import React from 'react';
import {Component} from 'react';
import {withRouter} from 'react-router-dom';

const ErrorPage = props => 
<div className="body">
    ERROR: CAN'T FIND PAGE 
</div>

export default withRouter(ErrorPage);