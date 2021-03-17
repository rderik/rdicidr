import Octet from './Octet';
import React, { useState } from 'react';

const IPv4Addr = (props) => {

  const [address, setAddress] = useState([10,0,0,0]);
  const [netmask, setNetmask] = useState(16);
  return (
    <div>
      <div>
      {address.map((octet,index) => {
        ;;console.log("this is:", octet, index);
        return <Octet value={octet} />
      })} / {netmask}
      </div>
      <div>
        {
          address.map((octet,index) => {
            return octet.toString(2).padStart(8,'0');
          }).join('.')
        }
      </div>
      </div>
  );
}

export default IPv4Addr;
