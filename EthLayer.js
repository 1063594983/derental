const contract = require('truffle-contract')
const Web3 = require('web3');
const marketplaceArtifacts = require('./Marketplace.json')
// import ethUtil from 'ethereumjs-util'
// 和以太坊交互
class EthLayer {
  constructor(){
    let provider = new Web3.providers.HttpProvider("http://localhost:8545");
    // let marketplaceContract = contract(marketplaceArtifacts)
    // marketplaceContract.setProvider(provider)
    // this.web3 = Web3
    this.account = "0x202C3cc09adA398CDaf2a85341f0132748cF3EaC"
    this.marketplaceContract = contract(marketplaceArtifacts)
    this.marketplaceContract.setProvider(provider)
  }
  async createListing(house){
    let inst = await this.marketplaceContract.deployed()
    let ret = await inst.createListing(house.depositWei,house.city,house.title,house.descHash,house.price,house.imageHash,{from:web3.eth.defaultAccount,value:house.depositWei})
    console.log('listing created => ', ret)
  }

  async cancelListing(listingId){
    let inst = await this.marketplaceContract.deployed()
    let ret = await inst.cancelListing(listingId,{from:this.account})
    console.log('listing withdrawed => ',ret)
  }

  async makeOffer(offer){
    let inst = await this.marketplaceContract.deployed()
    let ret = await inst.makeOffer(offer.listingId,offer.value,offer.checkIn,offer.nights,offer.arbitrator,{from:this.account,value:offer.value})
    console.log('offer made => ',ret)
  }

  async getUserCredit(){
    let inst = await this.marketplaceContract.deployed()
    let ret = await inst.getCredit(this.account)
    console.log(ret)
    return ret
  }

  async cancelOffer(listingId,offerId){
    let inst = await this.marketplaceContract.deployed()
    let ret = await inst.cancelOffer(listingId,offerId,{from:this.account})
    console.log('offer canceled => ',ret)
  }

  async acceptOffer(listingId,offerId){
    let inst = await this.marketplaceContract.deployed()
    let ret = await inst.acceptOffer(listingId,offerId,{from:this.account})
    console.log('offer accepted => ',ret)
  }

  async finalizeOffer(listingId,offerId){
    let inst = await this.marketplaceContract.deployed()
    let ret = await inst.finalizeOffer(listingId,offerId,{from:this.account})
    console.log('offer finalized => ',ret)
  }

  async disputeOffer(listingId,offerId){
    let inst = await this.marketplaceContract.deployed()
    let ret = await inst.disputeOffer(listingId,offerId,{from:this.account})
    console.log('offer disputed => ',ret)
  }

  async arbitrateOffer(listingId,offerId,refund){
    let inst = await this.marketplaceContract.deployed()
    let ret = await inst.arbitrateOffer(listingId,offerId,refund,{from:this.account})
    console.log('offer arbitrated => ',ret)
  }

}

export default EthLayer

// async function getExchangeRate(from,to){
//     let url = `https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}`
//     let rsp = await fetch(url)
//     rsp = await rsp.json()
//     return +rsp[to]
//   }

//   console.log(getExchangeRate("CNY", "ETH"))

// let eth = new EthLayer();
// var house = {
//     depositWei: "1542600000000000000",
//     city: '上海',
//     title: '华师大',
//     descHash: '',
//     price: '300',
//     imageHash: ''
// }

// eth.createListing(house)
eth.getUserCredit()