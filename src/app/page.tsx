'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { prepareWriteContract, readContract, writeContract } from '@wagmi/core';
import * as React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { encodePacked, parseEther } from 'viem';
import { encodeAbiParameters } from 'viem';
import { useAccount } from 'wagmi';

import Button from '@/components/buttons/Button';
import TokenInput from '@/components/input/Input';
import UnstyledSelectIntroduction from '@/components/select/ChainSelector';
import DestinationChainSelector from '@/components/select/DestinationChainSelector';
import TokenSelector from '@/components/select/TokenSelector';

import SendFrom from '../components/abi/SendFrom.json';

const remoteChainIds = {
  '420': '10132',
  '84531': '10160',
};

export default function HomePage() {
  const [amount, setAmount] = React.useState(0);
  const { address } = useAccount();
  const [_remoteChainId, setRemoteChainId] = React.useState('');
  const toAddress = '0xd67D11499679CBcd33c0c2a7B792FC3d6aE628e9';
  const toAddressBytes = encodeAbiParameters(
    [{ type: 'address', name: 'address' }],
    [toAddress]
  );

  const adapterParams = encodePacked(
    ['uint16', 'uint256'],
    [1, BigInt(200000)]
  );
  const sendTrans = async () => {
    try {
      if (!_remoteChainId) return;
      if (!amount) return;
      const qty = parseEther(amount.toString());
      const remoteChainId = remoteChainIds[_remoteChainId];
      const fees = await readContract({
        address: '0x8fB873e697a106e7Dd819547587AcAEf0840E835',
        abi: SendFrom.abi,
        functionName: 'estimateSendFee',
        args: [remoteChainId, toAddressBytes, qty, false, adapterParams],
      });
      const args = [
        address,
        remoteChainId,
        toAddressBytes,
        qty,
        [address, '0x0000000000000000000000000000000000000000', '0x'],
      ];
      const callData = await prepareWriteContract({
        address: '0x8fB873e697a106e7Dd819547587AcAEf0840E835',
        abi: SendFrom.abi,
        functionName: 'sendFrom',
        value: fees[0],
        args: args,
      });
      const { hash } = await writeContract(callData);
      toast.success('Transaction Successful');
    } catch (error) {
      toast.error('Transaction failed');
    }
  };

  return (
    <main className='main'>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='flex items-center justify-end py-10 pr-10'>
        <ConnectButton />
      </div>
      <div className='mx-auto my-10 max-w-5xl '>
        <div className='flex items-center justify-center space-x-4'>
          <UnstyledSelectIntroduction />
          <TokenSelector />
        </div>
        <div className='h-[50px]' />
        <div className='flex items-center justify-center space-x-4'>
          <DestinationChainSelector
            setRemoteChainId={(id) => {
              setRemoteChainId(id);
            }}
          />
        </div>
        <div className='h-[50px]' />
        <div className='flex items-center justify-center space-x-4'>
          <TokenInput
            onChange={(value) => {
              setAmount(value);
            }}
          />
        </div>
        <div className='h-[50px]' />
        <div className='flex items-center justify-center space-x-4'>
          <Button
            onClick={() => {
              sendTrans();
            }}
            disabled={amount === 0 || amount === ''}
            className='flex h-[40px] w-[200px] items-center justify-center'
          >
            Submit
          </Button>
        </div>
      </div>
    </main>
  );
}
