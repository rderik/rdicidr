import Octet from './Octet';
import React, { useState } from 'react';
import {IPv4} from './lib/ipv4';

const IPv4Addr = (props) => {

  const [ipv4, setIpv4] = useState(new IPv4([10,0,8,0],21));
  const setOctet = (octet,index) => {
    let updatedAddress = [...ipv4.address];
    updatedAddress[index] = +octet;
    setIpv4(new IPv4(updatedAddress,ipv4.mask));
  };
  return (
    <div>
      <div>
      {ipv4.address.map((octet,index) => {
        ;;console.log("this is:", octet, index);
        return <Octet key={index} value={octet} index={index} changeFunction={setOctet} />
      })} / <input value={ipv4.mask} onChange={e => { setIpv4(new IPv4(ipv4.address,e.target.value))}} />
      </div>
      <div>
        {
          ipv4.getBinnary()
        }
      </div>
      <div>
        Network Address:
        <span>{ipv4.networkAddress()}</span>
      </div>
      <div>
        First usable address:
        <span>{ipv4.firstUsableAddress()}</span>
      </div>
      <div>
        First usable address(AWS):
        <span>{ipv4.firstUsableAddress(3)}</span>
        <br />
        <span>AWS reserves first four addresses for: Network, Router, DNS, Future use</span>
      </div>
      <div>
        Last usable address:
        <span>{ipv4.lastUsableAddress()}</span>
      </div>
      <div>
        Broadcast Address:
        <span>{ipv4.broadcastAddress()}</span>
      </div>
      <div>
        Netmask:
        <span>{ipv4.netmask()}</span>
      </div>
      <div>
        Count:
        <span>{ipv4.count()}</span>
      </div>
      <div>
        Usable addresses:
        <span>{ipv4.availableCount()}</span>
      </div>
      <div>
        Usable addresses(AWS):
        <span>{ipv4.availableCount(5)}</span>
      </div>
      </div>
  );
}

export default IPv4Addr;
