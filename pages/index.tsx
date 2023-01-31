import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Image from 'next/image';
import Seo from './components/Seo';
import Header from './components/Header';
import Footer from './components/Footer';

import { allowlistAddresses }  from "../public/consts/allowlist";
import { setting }  from "../public/consts/setting";

const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

const Home: NextPage = () => {
  let nameMap;
  let leafNodes;
  let merkleTree;
  let addressId = 1;
  let claimingAddress;
  let hexProof;
  
  const [mintNum, setMintNum] = useState(0);
  const [alNum, setAlNum] = useState(0);
  const [mintQuantity, setmintQuantity] = useState(0);
  const [disabledFlag, setDisabledFlag] = useState(false);
  const [allowlistUserAmountData, setAllowlistUserAmountData] = useState(0);

  const abi = setting.ABI;
  const contractAddress = setting.CONTRACT_ADDRESS;
  useEffect(() => {
    const leafNodes = allowlistAddresses.map(addr => ethers.utils.solidityKeccak256(['address', 'uint16'], [addr[0] , addr[1]]));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});

    const rootHash = merkleTree.getRoot();
    console.log('Whitelist Merkle Tree\n', merkleTree.toString());
    console.log("Root Hash: ", "0x" + rootHash.toString('hex'));


    const nameMap = allowlistAddresses.map( list => list[0] );
    let addressId = nameMap.indexOf(allowlistAddresses[0][0]);
    const claimingAddress = ethers.utils.solidityKeccak256(['address', 'uint16'], [allowlistAddresses[addressId][0] , allowlistAddresses[addressId][1]]);

    console.log("index : " , addressId);
    console.log("address : " , allowlistAddresses[addressId][0]);
    console.log("amount : " , allowlistAddresses[addressId][1]);
    console.log("claimingAddress : " , claimingAddress);

    const hexProof = merkleTree.getHexProof(claimingAddress);
    console.log("hexProof : \n",hexProof);

    console.log("merkleTree.verify : " + merkleTree.verify(hexProof, claimingAddress, rootHash));
  });

  // ミントボタン用
  function MintButton() {

    async function connectWallet() {
      try{
        await (window as any).ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: setting.CAHINID }],
        });
        const provider = await new ethers.providers.Web3Provider((window as any).ethereum);
        await provider.send('eth_requestAccounts', []);
        setDisabledFlag(true);
        const signer = await provider.getSigner();
        const contract = await new ethers.Contract(contractAddress, abi, signer);
        // TotalCount取得
        const mintNumber = (await contract.totalSupply()).toString();
        setMintNum(mintNumber);
        getMerkleData();
      } catch(e) {
        console.log(e);
      }
      try{
        await (window as any).ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: setting.CAHINID,
            chainName: setting.CHAIN_NAME,
            nativeCurrency: {
              name: setting.COIN_NAME,
              symbol: setting.COIN_NAME,
              decimals: setting.DECIMALS,
            },
            rpcUrls: [setting.RPC_URLS],
          }],
        });
        console.log('try');
        setDisabledFlag(true);
      }catch(Exeption){
        console.log('Ethereum already Connected');
        console.log('catch');
      }finally{
        console.log('finally');
      }
    }

    const getMerkleData = async () =>{
        const provider = await new ethers.providers.Web3Provider((window as any).ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress(); 
        nameMap = allowlistAddresses.map( list => list[0]);
        addressId = nameMap.indexOf(address);
        const num = Number(allowlistAddresses[addressId][1]);
        if( addressId == -1){
          setAllowlistUserAmountData(0);
        } else {
          const contract = await new ethers.Contract(contractAddress, abi, signer);

          // AL数-現在のミント数で残りのAL数を出す
          setAlNum(num - await contract.getConsumedAllocation(address));
          setAllowlistUserAmountData(num);
        }
    };

    const mintQuantityPlus = async () =>{
      // ★AL条件無くなった時のロジックを考える必要があり。
      if(mintQuantity == alNum){
        return;
      } else {
        setmintQuantity(mintQuantity + 1);
      }
    };

    const mintQuantityMinus = async () =>{
      if(mintQuantity == 0){
        return;
      } else {
        setmintQuantity(mintQuantity - 1);
      }
    };
    
    const nftMint = async() => {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const signer = provider.getSigner();
      await provider.send('eth_requestAccounts', []);
      const quantity = String(mintQuantity);
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const address = await signer.getAddress(); 
      let allowlistMaxMintAmount;

      nameMap = allowlistAddresses.map( list => list[0] );
      leafNodes = allowlistAddresses.map(addr => ethers.utils.solidityKeccak256(['address', 'uint16'], [addr[0] , addr[1]]));
      merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});
      addressId = nameMap.indexOf(address);
      if( addressId == -1){
        allowlistMaxMintAmount = 0;
        claimingAddress = ethers.utils.solidityKeccak256(['address', 'uint16'], [allowlistAddresses[0][0] , allowlistAddresses[0][1]]);
        hexProof = merkleTree.getHexProof(claimingAddress);    
      }else{
        allowlistMaxMintAmount = allowlistAddresses[addressId][1];
        claimingAddress = ethers.utils.solidityKeccak256(['address', 'uint16'], [allowlistAddresses[addressId][0] , allowlistAddresses[addressId][1]]);
        hexProof = merkleTree.getHexProof(claimingAddress);    
      }
      const alNumber = Number(allowlistUserAmountData);
      try{
        if(quantity == "0" || alNumber == 0){
          alert('Cannot mint if AL count is 0 or mint count is 0. / AL数が0またはミント数が0の場合はミントできません。');
        } else {
          const price = Number(setting.TOKEN_PRICE) * Number(quantity);
          await contract.mintAllLimits(quantity, hexProof, alNumber, {value: ethers.utils.parseEther(String(price))});//, gasLimit: 91000});
          alert('Starting to execute a transaction / トランザクションを開始しました');
          location.reload();
        }
      }catch(err: any) {
      // Solidityから変換された文言をJSONへ変換
        const jsonData = JSON.stringify(err.reason);
        alert(jsonData);
      }
    };
    return <>
    <div className="bg-black pb-16 flex flex-wrap buttom justify-center">
      <div className='px-8 pt-8 lg:px-28 lg:py-28'>
        <Image className="min-w-full" src="/main_grap.png" alt="Main Image" width={500} height={500}/>
      </div>
      <div className="m-12 lg:m-32 px-12 py-6 lg:pt-8 lg:px-20 border-2 bg-black text-center border-[#FFFFFF] bg-center bg-contain bg-no-repeat">
        <Image className="min-w-full" src="/CNPES.jpg" alt="Main Image" width={168} height={118}/>

        <h1 className="text-2xl lg:text-3xl pt-2 lg:pt-4 lg:pb-6 text-white font-['Impact']"> {mintNum} / 5000</h1>
        <a className="text-2xl lg:text-3xl pt-2 lg:pt-8 lg:pb-8 text-white font-['Impact']">{alNum} </a><a className="text-2xl lg:text-3xl pt-2 lg:pt-8 lg:pb-8 text-[#99CDDB] font-['Impact'] ">AL</a><br/>
        
        <div className="pt-2 lg:pt-6 pb-7">
          <button type="button" className="cursor-pointer text-2xl lg:text-3xl inline-flex flex-shrink-0 justify-center items-center gap-2 h-[1.375rem] w-[1.375rem] lg:h-[2.375rem] lg:w-[2.375rem]
          border-[#FFFFFF] border-transparent font-['Impact'] bg-[#99CDDB] text-[#FFFFFF] hover:text-[#99CDDB] hover:bg-[#FFFFFF] focus:outline-none focus:ring-2
          focus:ring-[#99CDDB] focus:ring-offset-2 transition-all  rounded-full dark:focus:ring-offset-gray-800" onClick={mintQuantityMinus}>
          -</button>
          <a className="text-2xl lg:text-3xl px-8 lg:pt-6 lg:pb-6 text-white font-['Impact']">{mintQuantity}</a>
          <button type="button" className="cursor-pointer text-2xl lg:text-3xl inline-flex flex-shrink-0 justify-center items-center gap-2 h-[1.375rem] w-[1.375rem] lg:h-[2.375rem] lg:w-[2.375rem]
          border-[#FFFFFF] border-transparent rounded-full font-['Impact'] bg-[#99CDDB] text-[#FFFFFF] hover:text-[#99CDDB] hover:bg-[#FFFFFF] 
          focus:outline-none focus:ring-2 focus:ring-[#99CDDB] focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800" onClick={mintQuantityPlus}>
          +</button><br/>
        </div>
        { (!disabledFlag) && <button type="button" className="text-xl lg:text-2xl py-1 lg:py-3 px-12 lg:px-24 inline-flex justify-center items-center gap-2 rounded-full border border-transparent
        bg-[#FFFFFF] border-yellow-200 font-['Impact'] text-[#99CDDB] hover:yellow-500 hover:bg-[#99CDDB] hover:text-[#FFFFFF] hover:border-[#FFFFFF]
          focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800" onClick={() => connectWallet()}>
        CONNECT WALLET</button>}
        { (disabledFlag) && <button type="button" className="text-xl lg:text-2xl py-1 lg:py-3 px-12 lg:px-24 inline-flex justify-center items-center gap-2 rounded-full border border-transparent
        bg-[#FFFFFF] border-yellow-200 font-['Impact'] text-[#99CDDB] hover:yellow-500 hover:bg-[#99CDDB] hover:text-[#FFFFFF] hover:border-[#FFFFFF]
          focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800" onClick={() => nftMint()}>
        MINT NOW</button>}
      </div>
    </div>
    </>
  }

  return (
    <div>
      <Seo
          pageTitle={'CNPES'}
          pageDescription={'CNPES'}
          pageImg={'https://cnpes-site.vercel.app/_next/image?url=%2Fmain_grap.png&w=1080&q=75'}
          pageImgWidth={1920}
          pageImgHeight={1005}
      />
      <Header />
      <MintButton/>
      <Footer />
    </div>
    
  );
};

export default Home;
