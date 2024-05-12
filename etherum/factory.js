import web3 from './web3';
import CampaignFactory from './build/ campaignFactory.json';
const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),'0xEbe5372EA61580338b9735e3B8e0F00099D3d0A4'
);
export default instance;