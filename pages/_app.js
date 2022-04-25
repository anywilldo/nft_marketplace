import '../styles/globals.css'
import Link from 'next/link'
import Web3Modal from 'web3modal'
import { providers } from 'ethers'
import WalletConnectProvider from '@walletconnect/web3-provider'

const INFURA_ID = '460f40a260564ac4a4f4b3fffb032dad'
  
const providerOptions = {
  // Example with injected providers
  // injected: {
  //   display: {
  //     logo: "data:image/gif;base64,INSERT_BASE64_STRING",
  //     name: "Injected",
  //     description: "Connect with the provider in your Browser"
  //   },
  //   package: null
  // },
  // Example with WalletConnect provider
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_ID // required
    }
  }
};

let web3Modal
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    // network: 'mainnet', // optional
    cacheProvider: true,
    providerOptions, // required
  })
}


function MyApp({ Component, pageProps }) {
  const connect = async () => {
    console.log('clicked connect')
    const provider = await web3Modal.connect()
    console.log('connected', provider)

    // We plug the initial `provider` into ethers.js and get back
    // a Web3Provider. This will add on methods from ethers.js and
    // event listeners such as `.on()` will be different.
    const web3Provider = new providers.Web3Provider(provider)
    console.log('web3Provider', web3Provider)

    const signer = web3Provider.getSigner()
    console.log('signer', signer)
    const address = await signer.getAddress()
    console.log('address', address)

    const network = await web3Provider.getNetwork()

  }
  return (
    <div>
      <nav className='flex justify-between border-b p-6'>
        <p className='text-4xl font-bold'>Market Place</p>
        <div className='flex mt-4'>
          <Link href='/'>
            <a className='mr-4 text-blue-500 hover:text-blue-700'>Home</a>
          </Link>
          <Link href='/create-item'>
            <a className='mr-4 text-blue-500 hover:text-blue-700'>Sell Item</a>
          </Link>
          <Link href='/my-asset'>
            <a className='mr-4 text-blue-500 hover:text-blue-700'>My Items</a>
          </Link>
          <Link href='/creator-dashboard'>
            <a className='mr-4 text-blue-500 hover:text-blue-700'>Dashboard</a>
          </Link>
          <button className='border shadown px-4 py-2' onClick={connect}>
            Connect
          </button>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
