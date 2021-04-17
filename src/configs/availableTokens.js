import DAI from '../ABIs/DAI.json';
import cToken from '../ABIs/cToken.json';
import aToken from '../ABIs/aToken.json';


const availableTokens = {
    1: {
        DAI: {
            abi:DAI,
            token:'DAI',
            decimals:18,
            enabled:true,
            address:'0x6b175474e89094c44da98b954eedeac495271d0f',
            protocols:[
            {
                enabled:true,
                abi:cToken.abi,
                name:'compound',
                address:'0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
                token:'cDAI',
                decimals:28
            },
            {
                abi:aToken,
                name:'aave',
                enabled:true,
                address:'0xfC1E690f61EFd961294b3e1Ce3313fBD8aa4f85d',
                token:'aDAI',
                decimals:18,
                functions:{
    
                }
            },
            {
                abi:aToken,
                name:'aavev2',
                enabled:true,
                address:'0x028171bCA77440897B824Ca71D1c56caC55b68A3',
                token:'aDAIv2',
                decimals:18
            },
            ]
        }
    }
}

export default availableTokens;