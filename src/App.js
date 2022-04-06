import React, { useEffect, useState } from "react";
import "./App.css";
import useModal from "./useModal";
import Modal from "./Modal";
import nearLogo from "./assets/near-logo.svg";

const initialValues = {
  assetTitle: "",
  assetDescription: "",
  assetUrl: "",
};

const App = ({ currentUser, nearConfig, walletConnection }) => {
  const [showLoader, setShowLoader] = useState(false);
  const [values, setValues] = useState(initialValues);
  const { isVisible, toggleModal } = useModal();
  const [nftResults, setNftResults] = useState([]);

  const signIn = () => {
    walletConnection.requestSignIn(
      nearConfig.contractName,
      "", // title. Optional, by the way
      "", // successUrl. Optional, by the way
      "" // failureUrl. Optional, by the way
    );
    sendMeta()
  };

  useEffect(() => {
    if (!showLoader) {
      displayAllNFT();
    }
  }, [showLoader]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const sendMeta = async () => {
    let functionCallResult = await walletConnection.account().functionCall({
      contractId: nearConfig.contractName,
      methodName: "new_default_meta",
      args: {
        owner_id: nearConfig.contractName,
      },
      attachedDeposit: 0,
      walletMeta: "",
      wallerCallbackUrl: "",
    });

    if (functionCallResult) {
      console.log("new meta data created: ");
    } else {
      console.log("meta data not created");
    }
  };

  const mintAssetToNft = async () => {
    toggleModal()
    let functionCallResult = await walletConnection.account().functionCall({
      contractId: nearConfig.contractName,
      methodName: "nft_mint",
      args: {
        token_id: `${values.assetTitle}`,
        metadata: {
          title: `${values.assetTitle}`,
          description: `${values.assetDescription}`,
          media: `${values.assetUrl}`,
        },
        receiver_id:currentUser
      },
      attachedDeposit: "589700000000000000000000",
    });

    if (functionCallResult) {
      console.log("nft meta sent: ");
    } else {
      console.log("nft meta not sent");
    }
  };
  const displayAllNFT = async () => {
    let result = await walletConnection
      .account()
      .viewFunction(nearConfig.contractName, "nft_tokens_for_owner", {
        account_id: currentUser,
        from_index: "0",
        limit: 64,
      });
    setNftResults(result);
    setShowLoader(true);
    return result;
  };

  const signOut = () => {
    walletConnection.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <div>
      <header className="top-header">
        <div className="menu">
          <div className="navbar-left">
            <h3> NFT MARKET</h3>
          </div>
          <nav className="navbar">
            <ul className="navbar-ul">
              <li className="navbar-li pt-3 pr-2">
                {currentUser ? (
                  <button href="#" className="log-link" onClick={signOut}>
                    Log out
                  </button>
                ) : (
                  <button href="#" className="log-link" onClick={signIn}>
                    Log In
                  </button>
                )}
              </li>
              <li className="navbar-li">
                {currentUser ? (
                  <button className="btn" onClick={toggleModal}>
                  Create NFT
                </button>
                ) : (
                  ""
                )}
               
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="main-wrapper">
        <div className="wrapper">
          {currentUser ? (
            <div className="welcome-wrapper">
              <span className="welcome-text">Welcome! </span>
              {currentUser}
            </div>
          ) : (
            "user not logged in"
          )}
        </div>
      </main>

      <div className="gallery-wrapper">
        {nftResults
          ? nftResults.map((nft, index) => (
              <div className="outter-wrapper" key={index}>
                <article className="card-wrapper">
                  <a className="asset-anchor" href="#">
                    <div className="asset-anchor-wrapper">
                      <div className="asset-anchor-wrapper-inner">
                        <div className="asset-anchor-wrapper-inner-2">
                          <img src={nft.metadata.media} className="img-wrapper" alt="NFT Token" />
                        </div>
                      </div>
                    </div>
                    <div className="details-wrapper">
                      <div className="details-title-wrapper">
                        <div className="details-title-left-wrapper">
                          <div className="details-title-left-wrapper-inner-1">
                            {nft.metadata.title}
                          </div>
                          <div className="details-title-left-wrapper-inner-2">
                            {nft.owner_id}
                          </div>
                        </div>
                        <div className="details-title-right-wrapper">
                          <div className="details-assets-right-wrapper-inner-1">
                            <span className="span-price">Price</span>
                            <div className="price-wrapper">
                              <div className="near-symbol">
                                <img
                                  className="near-logo"
                                  src={nearLogo}
                                  alt="near logo"
                                />
                              </div>
                              <div className="price">4.4</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </article>
              </div>
            ))
          : "NFTs not found"}
      </div>

      <Modal isVisible={isVisible} hideModal={toggleModal}>
        <div className="outform-wrapper">
          <div className="form-wrapper">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                mintAssetToNft();
              }}
            >
              <div className="form-in-wrapper">
                <h3 className="text-center pb-1">MINT NFT</h3>

                <div className="box-wrapper">
                  <div className="box-in-wrapper">
                    <div className="input-wrapper">
                      <input
                        className="input-box"
                        placeholder="Asset Title"
                        name="assetTitle"
                        type="text"
                        value={values.assetTitle}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="box-wrapper">
                  <div className="box-in-wrapper">
                    <div className="input-wrapper">
                      <input
                        className="input-box"
                        placeholder="Asset Description"
                        name="assetDescription"
                        type="text"
                        value={values.assetDescription}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="box-wrapper">
                  <div className="box-in-wrapper">
                    <div className="input-wrapper">
                      <input
                        className="input-box"
                        placeholder="Asset Url"
                        name="assetUrl"
                        type="text"
                        value={values.assetUrl}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-btn-wrapper">
                  <button className="form-btn">Mint NFT</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;
