import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getAccountsuccess } from "../../modules/reducer";
import { getAccounts } from '../../api';


const HomeView = ({
    currentUser,
    account_info
  }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        getAccounts().then(function(res) {
        if(res.status == 'successful') {
          dispatch(getAccountsuccess(res.payload))
        }
        
      })
  
    }, []);
    return <h1>This is home</h1>;
  }

  
  export default HomeView