class IPv4 {

  constructor(address,mask) {
    this.address = address;
    this.mask = parseInt(mask);
    this.fullAddress = "";
    this.reserved = 2;
  }

  setReserved(reserved) {
    this.reserved = reserved;
  }

  setSubnetMask(mask) {
    this.mask = mask
    this.fullAddress = "";
  }

  setOctet(octet, index) {
    this.address[index] = octet;
    this.fullAddress = "";
  }

  getBinnary() {
    return this.address.map((octet,index) => {
      return octet.toString(2).padStart(8,'0');
    }).join('.')
  }

  getFullAddress() {
    if (this.fullAddress !== "") {
      return this.fullAddress;
    }
    this.fullAddress = parseInt(this.getBinnary().replace(/\./g, '').padStart(32,"0"), 2);
    return this.fullAddress;
  }


  networkAddress() {
    const fullAddress = this.getFullAddress();
    const netmask = parseInt(((1 << (32 - this.mask)) >>> 0).toString(2).padStart(32,"1"),2);
    const networkAddress = ((fullAddress & netmask) >>> 0).toString(2).padStart(32,"0").match(/.{1,8}/g);

    const intNetWorkAddress =  networkAddress.map((octet) => {
      return parseInt(octet,2);
    });
    return intNetWorkAddress.join(".");
  }

  firstUsableAddress(reserved = 0) {
    const fullAddress = this.getFullAddress();
    const netmask = parseInt(((1 << (32 - this.mask)) >>> 0).toString(2).padStart(32,"1"),2);
    const firstAddress = (((fullAddress & netmask) + 1 + reserved) >>> 0).toString(2).padStart(32,"0").match(/.{1,8}/g);

    const intFirstAddress =  firstAddress.map((octet) => {
      return parseInt(octet,2);
    });
    return intFirstAddress.join(".");
  }

  lastUsableAddress() {
    const fullAddress = this.getFullAddress();
    const netmask = parseInt((1 << (32 - this.mask)).toString(2).padStart(32,"1"),2);
    const broadcast = ~( netmask >>> 0);
    const lastAddress = (((fullAddress | broadcast) >>> 0) - 1 ).toString(2).padStart(32,"0").match(/.{1,8}/g);

    const intLastAddress =  lastAddress.map((octet) => {
      return parseInt(octet,2);
    });
    return intLastAddress.join(".");
  }

  broadcastAddress() {
    const fullAddress = this.getFullAddress();
    const netmask = parseInt((1 << (32 - this.mask)).toString(2).padStart(32,"1"),2);
    const broadcast = ~( netmask >>> 0);
    ;;console.log("broadcast", broadcast,broadcast.toString(2),fullAddress.toString(2), (fullAddress | netmask) >>> 0);
    const broadcastAddress = ((fullAddress | broadcast) >>> 0 ).toString(2).padStart(32,"0").match(/.{1,8}/g);

    const intBroadcastAddress =  broadcastAddress.map((octet) => {
      return parseInt(octet,2);
    });
    return intBroadcastAddress.join(".");
  }

  netmask() {
    const netmask = parseInt((1 << (32 - this.mask)).toString(2).padStart(32,"1"),2);
    const netmaskOctets = netmask.toString(2).padStart(32,"0").match(/.{1,8}/g);

    const intNetmask =  netmaskOctets.map((octet) => {
      return parseInt(octet,2);
    });
    return intNetmask.join(".");
  }

  count() {
    const count = parseInt((1 << (32 - this.mask)).toString(2),2);
    return count;
  }

  availableCount(reserved = this.reserved) {
    return this.count() - reserved;
  }
}

export { IPv4 };
