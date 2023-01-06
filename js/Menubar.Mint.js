import { UIPanel, UIRow } from "./libs/ui.js";
import ERC721ABI from "../abi/NFT.json" assert { type: "json" };

const infuraIpfsGateway = "https://crooze.infura-ipfs.io/ipfs/";
const NFTAddress = "0x8c7143774385C4E8e1368c1d9667f21A9aBbf880";
const pinataApiEndpoint = "https://api.pinata.cloud/pinning/pinFileToIPFS";
const pinataApiKey = "07b6548b8269be7da4de";
const pinataSecret =
  "9ba00e678abb79229cf7bafe0f98c9ab9b0aa9b733e04886bfa7e41a5b56efb1";

const speed = Math.floor(Math.random() * 100);
const acceleration = Math.floor(Math.random() * 100);
const handling = Math.floor(Math.random() * 100);
const rarity = Math.floor(Math.random() * 100);

// const horsePower = Math.random();
// const aeroDynamics = Math.random();
// const airResistance = Math.random();
// const boostForces = Math.random();
// const traction = Math.random();
// const drift = Math.random();
// const magnetForce = Math.random();
// const torque = Math.random();
// const friction = Math.random();
// const mass = Math.random();
// const slipperiness = Math.random();
// const suspensionStiffness = Math.random();
// const rarity = Math.floor(Math.random() * 100);

const base2blob = (b64) =>
  new Promise((resolve, reject) => {
    const res = fetch(b64)
      .then((res) => res.blob())
      .then((data) => resolve(data))
      .catch(() => reject());
  });

const uploadFile = async (file, filename) => {
  const formData = new FormData();
  formData.append("file", file, filename);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
    customPinPolicy: {
      regions: [
        {
          id: "FRA1",
          desiredReplicationCount: 1,
        },
        {
          id: "NYC1",
          desiredReplicationCount: 2,
        },
      ],
    },
  });

  formData.append("pinataOptions", pinataOptions);

  const config = {
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      pinata_api_key: pinataApiKey,
      pinata_secret_api_key: pinataSecret,
    },
  };

  try {
    const response = await axios.post(pinataApiEndpoint, formData, config);

    return response.data.IpfsHash;
  } catch (error) {
    console.log(error);
  }
};

function MenubarMint(editor) {
  const signals = editor.signals;
  function getAnimations(scene) {
    const animations = [];

    scene.traverse(function (object) {
      animations.push(...object.animations);
    });

    return animations;
  }

  const link = document.createElement("a");
  function save(blob, filename) {
    if (link.href) {
      URL.revokeObjectURL(link.href);
    }

    link.href = URL.createObjectURL(blob);
    link.download = filename || "data.json";
    link.dispatchEvent(new MouseEvent("click"));
  }

  function saveString(text, filename) {
    save(new Blob([text], { type: "text/plain" }), filename);
  }

  const strings = editor.strings;

  const container = new UIPanel();
  container.setClass("button-container")

  // Source code

  let option = new UIRow();
  option.setId("mintButton")
  option.setClass("custom-button btn-preview");
  option.setTextContent("Preview & Mint");

  var bucketName = "my3dmodelbucket";

  AWS.config.update({
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "us-west-2:e82e7366-9452-467c-b487-ebc919d9ed4c",
    }),
  });

  const handleMint = async() => {
      const canvas = document.getElementsByTagName("canvas");
      var strMime = "image/jpeg";
      var strDownloadMime = "image/octet-stream";

      var imgData = canvas[0].toDataURL(strMime);

      const nftImage = document.getElementsByClassName("nft-image");
      nftImage[0].src = imgData;
      const ethereum = window?.ethereum;
      await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: '0x89' }],
      });

      signals.mintLoading.dispatch(true);
      const imgBlob = await base2blob(imgData);
      const hash = await uploadFile(imgBlob, '1.jpg');

      const metadataBody = {
        name: 'model1',
        image: infuraIpfsGateway + hash,
        description: "description",
        attributes: {
          speed,
          acceleration,
          handling,
          rarity,
        },
      };

      const metadataBlob = new Blob( [JSON.stringify( metadataBody, null, 2 )], { type: 'text/plain' });
      const metadataHash = await uploadFile(metadataBlob, '1.json');
      const tokenURI = infuraIpfsGateway + metadataHash;

      var tokenId;
      if (window.ethereum) {
        await window.ethereum.enable()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        
        const NFTContract = new ethers.Contract(NFTAddress, ERC721ABI.abi, signer);
        try {
          const transaction = await NFTContract.mint(address, tokenURI);
          const promise = await transaction.wait();
          const events = promise.events;
          tokenId = parseInt(events[0].args.tokenId._hex, 16);
        } catch (err) {
          signals.mintLoading.dispatch(false);
          return;
        }

       /*
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const accounts = await web3.eth.requestAccounts();
        const account = accounts[0];
        const NFTContract = new web3.eth.Contract(ERC721ABI.abi, NFTAddress);

        const extraData = await NFTContract.methods.mint(account, tokenURI);
        const response = await web3.eth.sendTransaction({
          from: account,
          to: NFTAddress,
          value: '0',
          data: extraData.encodeABI()
        });
*/
      }

      console.log(tokenId);
      
      const scene = editor.scene;
      const animations = getAnimations( scene );
      const { GLTFExporter } = await import( 'three/addons/exporters/GLTFExporter.js' );
      const exporter = new GLTFExporter();
      
      exporter.parse( scene, async function ( result ) {
  
        const blob = new Blob( [JSON.stringify( result, null, 2 )], { type: 'text/plain' });
        const filename = tokenId + '.gltf';

        const formData = new FormData();
        formData.append("file", blob, filename);
        formData.append("id", tokenId);

        axios.post("https://notify.croozenft.com/v1/s3upload", formData, {
          headers: {
            "Content-Type": `multipart/form-data`,
          }
        })
        .then(response =>{
           console.log(response.data);
           signals.mintLoading.dispatch(false);
          //  const linkTo = document.getElementById("Dashboard_link");
          //  linkTo.style.display = "block";
          //  linkTo.href = "https://crooze-dashboard.netlify.app";
        })
        .catch((err)=> {
            signals.mintLoading.dispatch(false);
            console.log(err)
            return;
        })  
      }, undefined, { animations: animations } );
  }

  option.onClick(async function () {
    signals.showGridChanged.dispatch( false );
    signals.showHelpersChanged.dispatch( false );

    const canvas = document.getElementsByTagName("canvas");
    var strMime = "image/jpeg";
    var strDownloadMime = "image/octet-stream";

    var imgData = canvas[0].toDataURL(strMime);

    const nftImage = document.getElementsByClassName("nft-image");
    nftImage[0].src = imgData;

    const mintModal = document.getElementsByClassName("mint-modal");
    const overlay = document.getElementsByClassName("img-container");
    mintModal[0].style.display = "flex";
    overlay[0].style.display = "block";

    const mintBtn = document.getElementById("mint_nft");
    mintBtn.removeEventListener("click", handleMint);
    mintBtn.addEventListener("click", handleMint);

  });
  container.add(option);

  option = new UIRow();
  option.setClass("custom-row");
  option.setTextContent("Upload S3");

  option.onClick(async function () {
      const scene = editor.scene;
      const animations = getAnimations( scene );
  
      const { GLTFExporter } = await import( 'three/addons/exporters/GLTFExporter.js' );
  
      const exporter = new GLTFExporter();
      
      exporter.parse( scene, async function ( result ) {
  
        // saveString( JSON.stringify( result, null, 2 ), 'scene.gltf' );
        const blob = new Blob( [JSON.stringify( result, null, 2 )], { type: 'text/plain' });

        const formData = new FormData();
        formData.append("id", 10);
        formData.append("file", blob, "10.gltf");

        axios.post("http://localhost:5000/v1/s3upload", formData)
        .then(response =>{
           console.log(response.data)})
        .catch(err=> {
           console.log("error")
     })
    }, undefined, { animations: animations } );
  })

  // container.add(option);

  return container;
}

export { MenubarMint };
