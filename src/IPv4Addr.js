import Octet from './Octet';
import Netmask from './Netmask';
import React, { useState } from 'react';
import {IPv4} from './lib/ipv4';
import './IPv4Addr.css';

const IPv4Addr = (props) => {

  const [ipv4, setIpv4] = useState(new IPv4([10,0,8,0],21));
  const [validAddress, setValidAddress] = useState(true);
  const [showSubnetting,setShowSubnetting] = useState(true);
  const [subnetsNumber,setSubnetsNumber] = useState(0);

  const setOctet = (octet,index,change) => {
    let updatedAddress = [...ipv4.address];
    if (change) {
      updatedAddress[index] = +octet;
      setIpv4(new IPv4(updatedAddress,ipv4.mask));
    }
  };

  const setNetmask = (netmask,change) => {
    if (change) {
      setIpv4(new IPv4(ipv4.address,netmask));
    }
  };

	const displayNetmasks = (netmasks) => {
		let netmasksElements = [];
		netmasks.forEach((e) => {
			netmasksElements.push(<div>{e.networkAddress}/{e.netmask} ({e.count} hosts)</div>);
		});
		return netmasksElements;
	};

  return (
    <div>
        <h1>CIDR:</h1>
      <div className='address-container'>
        {ipv4.address.map((octet,index) => {
          return <div className='octet-container'><Octet key={index} value={octet} index={index} setValid={setValidAddress} changeFunction={setOctet} />{ (index < 3) ? <span>.</span> : <span className='slash'>/</span> }</div>
        })} <Netmask value={ipv4.mask} setValid={setValidAddress} changeFunction={setNetmask} />
      </div>
      <div className="subnets">
        Break into subnets:
          <input
            name="showSubnetting"
            type="checkbox"
            checked={showSubnetting}
            onChange={ e => { setShowSubnetting(e.target.checked) }}
          />
            { showSubnetting ?
                <div>
                  max number of subnets: {ipv4.numberOfPossibleSubnets()} with a minimum of 4 addreses (minus Network, broadcast, 2 available addresses)
                  closest: {ipv4.getClosestPowerOfTwo(subnetsNumber)}
                  <input
                    type="text"
                    value={subnetsNumber}
                    onChange={ e => setSubnetsNumber(e.target.value) }
                  />
                  {displayNetmasks(ipv4.breakIntoSubnets(subnetsNumber))}
                </div>
              : ""
          }
      </div>

      { validAddress ? <div className="results">
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
      </div> : "" }
    </div>
  );
}

export default IPv4Addr;
