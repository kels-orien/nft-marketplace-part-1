# nft-marketplace-part-1
A [tutorial](https://dev.to/kels_orien/building-a-full-stack-nft-market-place-with-near-protocol-and-reactjs-ak9) of an NFT Market Place built using Near Protocol and React.js.

#### Preview
![alt-text](https://res.cloudinary.com/dofiasjpi/image/upload/v1649243579/near-tutorial-nfts/near-tut-preview.png)


### Prerequisites
* [Nodejs](https://github.com/nvm-sh/nvm)
* [NEAR Wallet Account](https://wallet.testnet.near.org/)
* [Rust Toolchain](https://docs.near.org/docs/develop/contracts/rust/intro#installing-the-rust-toolchain)
* [NEAR-CLI](https://docs.near.org/docs/tools/near-cli#setup)


## Getting Started
Near Protocol uses [rust](https://www.rust-lang.org/) programming language for it's smart contracts. We are going to start with a rust contract template.


#### To run this app locally, follow below steps:

##### Clone using command line interface:
```
git clone https://github.com/kels-orien/nft-marketplace-part-1.git
```

##### Create wallet testnet account
open [wallet testnet account](wallet.testnet.near.org/)

##### From the `nft-contract` folder/directory using command CLI, login to near wallet account


`near login`


##### Build the contract
From `nft-contract` directory using CLI:

For Windows users:

```
/build.bat
```

For Mac and Linux users:

```
/build.sh
```

##### Create a subaccount

To create subaccount from `nft-contract` directory via CLI use command:

```
near create-account nft-contract.youraccountname.testnet --masterAccount youraccountname.testnet

```

##### Deploy the contract
```
near deploy --accountId nft-contract.youraccountname.testnet --wasmFile res/nft_contract.wasm

```


##### Edit contract name
Change the `youraccountName` part of the `contractName` constant in `config.js` file to your own account name.

##### Install packages for frontend

Go to root directory `nft-marketplac-part-1` using CLI and install packages:

```
cd ..
npm install

```

##### Launch frontend

```
npm start

```



