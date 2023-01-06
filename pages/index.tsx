import { useAddress, useContract, Web3Button,ConnectWallet } from "@thirdweb-dev/react";
import { SignedPayload721WithQuantitySignature } from "@thirdweb-dev/sdk";
import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Image from 'next/image';
import Seo from './components/Seo';
import Header from './components/Header';

const signatureDropAddress = "0x5C57A4e9A549E6bD4B2393e9BEa9f2CDbB6A0a4d";

const Home: NextPage = () => {
  const address = useAddress();

  const [mintNum, setMintNum] = useState(0);
  const [mintQuantity, setmintQuantity] = useState(1);
  const [disabledFlag, setDisabledFlag] = useState(false);
  const abi = [
    "function totalMinted() external view returns (uint256)",
  ]
  const contractAddress = "0x5C57A4e9A549E6bD4B2393e9BEa9f2CDbB6A0a4d"
  useEffect(() => {
    addChain();
    if (address) {
      setConnect();
      
    } 
    async function addChain() {
      try{
        await (window as any).ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{
            chainId: "0x5",
          }],
        })
        console.log("try");
      }catch(Exeption){
        console.log("Ethereum already Connected");
        console.log("catch");
      }finally{
        console.log("finally");
      }
    }
  });

  async function setConnect() {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum)  
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const mintNumber = (await contract.totalMinted()).toString();
    setMintNum(mintNumber);
  }

  const { contract: signatureDrop } = useContract(
    signatureDropAddress,
    "signature-drop"
  );

  async function claim() {
    try {
      const tx = await signatureDrop?.claim(mintQuantity);
      alert(`Succesfully minted NFT!`);
    } catch (error: any) {
      alert(error?.message);
    }
  }
  async function connectMetamusk() {

    if (!address) {
      return;
    }

    //if (isMismatch) {
      //switchNetwork && switchNetwork(ChainId.Goerli)
    //  return;
   // }
    setConnect();
    setDisabledFlag(true);
  }

  // ミントボタン用
  function MintButton() {

    const mintQuantityPlus = async () =>{
      if(mintQuantity == 3){
        return;
      } else {
        setmintQuantity(mintQuantity + 1);
      }
    };

    const mintQuantityMinus = async () =>{
      if(mintQuantity == 1){
        return;
      } else {
        setmintQuantity(mintQuantity - 1);
      }
    };
    
    return <>
    <div className="bg-black pb-16 flex flex-wrap buttom justify-center">
      <div className='px-8 pt-8 lg:px-28 lg:py-28'>
        <Image className="min-w-full" src="/main_grap.png" alt="Main Image" width={500} height={500}/>
      </div>
      <div className="m-12 lg:m-32 px-12 py-6 lg:pt-8 lg:px-20 border-2 bg-black text-center border-[#FFFFFF] bg-center bg-contain bg-no-repeat">
        <Image className="min-w-full" src="/CNPES.jpg" alt="Main Image" width={168} height={118}/>
        {/* { (!disabledFlag) && <button type="button" className="text-xl lg:text-2xl py-1 lg:py-3 px-12 lg:px-24 inline-flex justify-center items-center gap-2 rounded-full border border-transparent
        bg-[#FFFFFF] border-yellow-200 font-['Impact'] text-[#99CDDB] hover:yellow-500 hover:bg-[#99CDDB] hover:text-[#FFFFFF] hover:border-[#FFFFFF]
          focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800" >
        CONNECT WALLET</button>}
        { (disabledFlag) && <button type="button" className="lg:text-2xl py-3 px-16 inline-flex justify-center items-center gap-2 rounded-full border border-transparent 
        bg-gray-500 border-gray-500 font-['Impact'] text-gray-800 " disabled={disabledFlag} >
        CONNECT WALLET</button>}*/}
        <h1 className="text-2xl lg:text-3xl pt-2 lg:pt-4 lg:pb-6 text-white font-['Impact']"> {mintNum} / 5000</h1>
        <a className="text-2xl lg:text-3xl pt-2 lg:pt-8 lg:pb-8 text-white font-['Impact']">5</a><a className="text-2xl lg:text-3xl pt-2 lg:pt-8 lg:pb-8 text-[#99CDDB] font-['Impact'] ">MAX</a><br/>
        
        <div className="pt-2 lg:pt-6 pb-7">
          <button type="button" className="text-2xl lg:text-3xl inline-flex flex-shrink-0 justify-center items-center gap-2 h-[1.375rem] w-[1.375rem] lg:h-[2.375rem] lg:w-[2.375rem]
          border-[#FFFFFF] border-transparent font-['Impact'] bg-[#99CDDB] text-[#FFFFFF] hover:text-[#99CDDB] hover:bg-[#FFFFFF] focus:outline-none focus:ring-2
          focus:ring-[#99CDDB] focus:ring-offset-2 transition-all  rounded-full dark:focus:ring-offset-gray-800" onClick={mintQuantityMinus}>
          -</button>
          <a className="text-2xl lg:text-3xl px-8 lg:pt-6 lg:pb-6 text-white font-['Impact']">{mintQuantity}</a>
          <button type="button" className="text-2xl lg:text-3xl inline-flex flex-shrink-0 justify-center items-center gap-2 h-[1.375rem] w-[1.375rem] lg:h-[2.375rem] lg:w-[2.375rem]
          border-[#FFFFFF] border-transparent rounded-full font-['Impact'] bg-[#99CDDB] text-[#FFFFFF] hover:text-[#99CDDB] hover:bg-[#FFFFFF] 
          focus:outline-none focus:ring-2 focus:ring-[#99CDDB] focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800" onClick={mintQuantityPlus}>
          +</button><br/>
        </div>

        {/* (!disabledFlag) && <button type="button" className="lg:text-2xl py-3 px-24 inline-flex justify-center items-center gap-2 rounded-full border border-transparent 
        bg-gray-500 border-gray-500 font-['Impact'] text-gray-800 " onClick={() => claim()}>
        MINT NOW</button>*/}

        { (!disabledFlag) && <button type="button" className="text-xl lg:text-2xl py-1 lg:py-3 px-12 lg:px-24 inline-flex justify-center items-center gap-2 rounded-full border border-transparent
        bg-[#FFFFFF] border-yellow-200 font-['Impact'] text-[#99CDDB] hover:yellow-500 hover:bg-[#99CDDB] hover:text-[#FFFFFF] hover:border-[#FFFFFF]
          focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800" onClick={() => claim()}>
        MINT NOW</button>}
        </div>
    </div>
    </>
  }

  return (
    <div>
      <Seo
          pageTitle={'SJB_Hushimiinari'}
          pageDescription={'SJB_Hushimiinari'}
          pageImg={'https://sjb-hushimiinari.vercel.app/_next/image?url=%2Fmain_grap.png&w=3840&q=75'}
          pageImgWidth={1920}
          pageImgHeight={1005}
      />
      <Header />
      <MintButton/>
    </div>
    
  );
};

export default Home;
