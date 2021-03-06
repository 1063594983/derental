import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import marketplaceArtifacts from '../../build/contracts/Marketplace.json'
import ethUtil from 'ethereumjs-util'
// 和以太坊交互
class EthLayer {
  constructor(){
    let provider = new Web3.providers.HttpProvider("http://localhost:8545");
    // let marketplaceContract = contract(marketplaceArtifacts)
    // marketplaceContract.setProvider(provider)
    // this.web3 = Web3
    this.account = "0xC0F20Edba75CB6208b4773DCFc9dC05b767E93ce"
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
