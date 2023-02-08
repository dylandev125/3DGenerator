import { UIPanel, UIRow } from "./libs/ui.js";
import ERC721ABI from "../abi/NFT.json" assert { type: "json" };
import CRZABI from "../abi/token.json" assert { type: "json" };

const infuraIpfsGateway = "https://crooze.infura-ipfs.io/ipfs/";
const NFTAddress = "0x8c7143774385C4E8e1368c1d9667f21A9aBbf880";
const tokenAddress = "0xE50ec3Bb6638bc4acEBAdC801F5be41961804a5b";
const feeAddress = "0x14433D857e50671031687d76f5384cC7e7E7a845";
const pinataApiEndpoint = "https://api.pinata.cloud/pinning/pinFileToIPFS";
const pinataApiKey = "07b6548b8269be7da4de";
const pinataSecret =
  "9ba00e678abb79229cf7bafe0f98c9ab9b0aa9b733e04886bfa7e41a5b56efb1";

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

  const container = new UIPanel();
  container.setClass("button-container");

  // Source code

  let option = new UIRow();
  option.setId("mintButton");
  option.setClass("custom-button btn-preview");
  option.setTextContent("Preview & Mint");

  AWS.config.update({
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "us-west-2:e82e7366-9452-467c-b487-ebc919d9ed4c",
    }),
  });

  const handleMint = async () => {
    const randomNumber = new Date().getTime().toString();

    const canvas = document.getElementsByTagName("canvas");
    var strMime = "image/jpeg";
    var imgData = canvas[0].toDataURL(strMime);

    const nftImage = document.getElementsByClassName("nft-image");
    nftImage[0].src = imgData;
    const ethereum = window?.ethereum;
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x89" }],
    });

    signals.mintLoading.dispatch(true);
    const imgBlob = await base2blob(imgData);
    const hash = await uploadFile(imgBlob, "1.jpg");

    const scene = editor.scene;
    const animations = getAnimations(scene);
    const { GLTFExporter } = await import(
      "three/addons/exporters/GLTFExporter.js"
    );
    const exporter = new GLTFExporter();

    const wheelSelect = document.getElementById("wheel_select");
    const wheels_obj = scene.getObjectByName("Carglb");

    let wheel_fl1 = wheels_obj.getObjectByName("Wheels_01_FL");
    let wheel_fr1 = wheels_obj.getObjectByName("Wheels_01_FR");
    let wheel_rl1 = wheels_obj.getObjectByName("Wheels_01_RL");
    let wheel_rr1 = wheels_obj.getObjectByName("Wheels_01_RR");

    let wheel_fl2 = wheels_obj.getObjectByName("Wheels_02_FL");
    let wheel_fr2 = wheels_obj.getObjectByName("Wheels_02_FR");
    let wheel_rl2 = wheels_obj.getObjectByName("Wheels_02_RL");
    let wheel_rr2 = wheels_obj.getObjectByName("Wheels_02_RR");

    let wheel_fl3 = wheels_obj.getObjectByName("Wheels_03_FL");
    let wheel_fr3 = wheels_obj.getObjectByName("Wheels_03_FR");
    let wheel_rl3 = wheels_obj.getObjectByName("Wheels_03_RL");
    let wheel_rr3 = wheels_obj.getObjectByName("Wheels_03_RR");

    if (wheelSelect.value === "0") {
      wheel_fl2.parent.remove(wheel_fl2);
      wheel_fl3.parent.remove(wheel_fl3);

      wheel_fr2.parent.remove(wheel_fr2);
      wheel_fr3.parent.remove(wheel_fr3);

      wheel_rl2.parent.remove(wheel_rl2);
      wheel_rl3.parent.remove(wheel_rl3);

      wheel_rr2.parent.remove(wheel_rr2);
      wheel_rr3.parent.remove(wheel_rr3);
    } else if (wheelSelect.value === "1") {
      wheel_fl1.parent.remove(wheel_fl1);
      wheel_fl3.parent.remove(wheel_fl3);

      wheel_fr1.parent.remove(wheel_fr1);
      wheel_fr3.parent.remove(wheel_fr3);

      wheel_rl1.parent.remove(wheel_rl1);
      wheel_rl3.parent.remove(wheel_rl3);

      wheel_rr1.parent.remove(wheel_rr1);
      wheel_rr3.parent.remove(wheel_rr3);
    } else if (wheelSelect.value === "2") {
      wheel_fl1.parent.remove(wheel_fl1);
      wheel_fl2.parent.remove(wheel_fl2);

      wheel_fr1.parent.remove(wheel_fr1);
      wheel_fr2.parent.remove(wheel_fr2);

      wheel_rl1.parent.remove(wheel_rl1);
      wheel_rl2.parent.remove(wheel_rl2);

      wheel_rr1.parent.remove(wheel_rr1);
      wheel_rr2.parent.remove(wheel_rr2);
    }

    const uploadGLTF = async () => {
      return new Promise((resolve, reject) => {
        exporter.parse(
          scene.getObjectByName("Carglb"),
          async function (result) {
            const blob = new Blob([JSON.stringify(result, null, 2)], {
              type: "text/plain",
            });
            const filename = randomNumber + ".gltf";

            const formData = new FormData();
            formData.append("file", blob, filename);
            formData.append("id", randomNumber);

            axios
              .post("https://notify.croozenft.io/v1/s3upload", formData, {
                headers: {
                  "Content-Type": `multipart/form-data`,
                },
              })
              .then((response) => {
                resolve(response.data.location);
                //  const linkTo = document.getElementById("Dashboard_link");
                //  linkTo.style.display = "block";
                //  linkTo.href = "https://crooze-dashboard.netlify.app";
              })
              .catch((err) => {
                signals.mintLoading.dispatch(false);
                console.log(err);
                return;
              });
          },
          undefined,
          { animations: animations }
        );
      });
    };

    const location = await uploadGLTF();

    const speed = Math.ceil(Math.random() * 100);
    const acceleration = Math.ceil(Math.random() * 100);
    const handling = Math.ceil(Math.random() * 100);
    const rarity = Math.ceil(Math.random() * 100);

    let _rarity = 0;
    if (rarity > 0 && rarity <= 60) _rarity = 1;
    else if (rarity > 60 && rarity <= 90) _rarity = 2;
    else if (rarity > 90 && rarity <= 99) _rarity = 3;
    else if (rarity > 99) _rarity = 4;

    const metadataBody = {
      name: editor.model + " #" + randomNumber.slice(-6),
      image: infuraIpfsGateway + hash,
      description: "Race your NFT to earn crypto at CroozeNFT.io",
      attributes: [
        {
          display_type: "number",
          trait_type: "Speed",
          value: speed,
          max_value: 100,
        },
        {
          display_type: "number",
          trait_type: "Acceleration",
          value: acceleration,
          max_value: 100,
        },
        {
          display_type: "number",
          trait_type: "Handling",
          value: handling,
          max_value: 100,
        },
        {
          display_type: "number",
          trait_type: "Rarity",
          value: _rarity,
          max_value: 4,
        },
      ],
      animation_url: location,
    };

    const metadataBlob = new Blob([JSON.stringify(metadataBody, null, 2)], {
      type: "text/plain",
    });
    const metadataHash = await uploadFile(metadataBlob, "1.json");
    const tokenURI = infuraIpfsGateway + metadataHash;

    if (window.ethereum) {
      await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      const NFTContract = new ethers.Contract(
        NFTAddress,
        ERC721ABI.abi,
        signer
      );
      const tokenContract = new ethers.Contract(
        tokenAddress,
        CRZABI.abi,
        signer
      );
      try {
        const balance = await tokenContract.balanceOf(address);

        if (ethers.utils.formatEther(balance.toString()) < 10) {
          Toastify({
            text: "Insufficient CRZ amount",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function () {}, // Callback after click
          }).showToast();
          return;
        }
        await tokenContract.transfer(feeAddress, ethers.utils.parseEther("10"));
        const transaction = await NFTContract.mint(address, tokenURI);
        const promise = await transaction.wait();
        const events = promise.events;
        tokenId = parseInt(events[0].args.tokenId._hex, 16);
      } catch (err) {
        console.log(err);
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

      signals.mintLoading.dispatch(false);
    }
  };

  option.onClick(async function () {
    if (!editor.model) {
      alert("Please select the car model.");

      return;
    }

    signals.showGridChanged.dispatch(false);
    signals.showHelpersChanged.dispatch(false);

    var _DEFAULT_CAMERA = new THREE.PerspectiveCamera(50, 1, 0.01, 1000);
    _DEFAULT_CAMERA.name = "Camera";
    _DEFAULT_CAMERA.position.set(130, 70, 140);
    _DEFAULT_CAMERA.lookAt(new THREE.Vector3());
    _DEFAULT_CAMERA.position.normalize().multiplyScalar(15);

    editor.camera.copy(_DEFAULT_CAMERA);

    const canvas = document.getElementsByTagName("canvas");
    var strMime = "image/jpeg";

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

  return container;
}

export { MenubarMint };
