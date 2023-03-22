import { UIPanel, UIRow } from "./libs/ui.js";
import ERC721ABI from "../abi/NFT.json" assert { type: "json" };
import USDTABI from "../abi/usdt.json" assert { type: "json" };
import USDCABI from "../abi/usdc.json" assert { type: "json" };

const infuraIpfsGateway = "https://crooze.infura-ipfs.io/ipfs/";
const NFTAddress = "0x8AAf154304D1aB7873ac1033E08135Cb4A086338";
const pinataApiEndpoint = "https://api.pinata.cloud/pinning/pinFileToIPFS";
const pinataApiKey = "fdd18548955e6c02a604";
const pinataSecret =
  "";

const tokenAddress = [
  "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
  "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
]

const tokenABI = [
  USDCABI,
  USDTABI
]

const tokenSymbol = [
  "USDC",
  "USDT"
]

const mintPrice = 1;

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
    const tokenTypeDom = document.getElementById("token_select");
    const tokenType = tokenTypeDom.value;
    const randomNumber = new Date().getTime().toString();
    const nftImage = document.getElementsByClassName("nft-image");
    const imgSRC = nftImage[0].src;

    const ethereum = window?.ethereum;
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x89" }],
    });

    signals.mintLoading.dispatch(true);
    const imgBlob = await base2blob(imgSRC);
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
              .post("https://devnotify.croozenft.io/v1/s3upload", formData, {
                headers: {
                  "Content-Type": `multipart/form-data`,
                },
              })
              .then((response) => {
                resolve(response.data.location);
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
      description: "Race your NFT to win cash prizes at CroozeNFT.io!",
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

    let returnIdRes;
    returnIdRes = await axios
      .post("https://devnotify.croozenft.io/v1/game/addmeta", metadataBody, {
        headers: {
          "Content-Type": `application/json`,
        },
      });

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
        ERC721ABI,
        signer
      );
      const tokenContract = new ethers.Contract(
        tokenAddress[tokenType],
        tokenABI[tokenType],
        signer
      );

      try {
        const balance = await tokenContract.balanceOf(address);
        const allwance = await tokenContract.allowance(address, NFTAddress);

        if (ethers.utils.formatUnits(balance.toString(), 6) < mintPrice) {
          Toastify({
            text: "Insufficient " + tokenSymbol[tokenType] + " amount",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "linear-gradient(to right, #CC2222, #AA7777)",
            },
            onClick: function () {}, // Callback after click
          }).showToast();
          return;
        }

        if (ethers.utils.formatUnits(allwance.toString(), 6) < mintPrice ) {
          await tokenContract.approve(NFTAddress, ethers.utils.parseUnits(mintPrice.toString(), 6));
        }

        NFTContract.on("Transfer", async (from, to, amount, event) => {
          if (from == '0x0000000000000000000000000000000000000000' && to === address){
            const tokenId = parseInt(event.args.tokenId._hex, 16)
            const body = {
              nftId: tokenId
            }

            await axios
            .post("https://devnotify.croozenft.io/v1/game/metadata/" + returnIdRes.data.data.id, body, {
              headers: {
                "Content-Type": `application/json`,
              },
            })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              signals.mintLoading.dispatch(false);
              console.log(err);
              return;
            });
          }
        });

        await NFTContract.generatorMint(address, tokenURI, tokenAddress[tokenType], ethers.utils.parseUnits(mintPrice.toString(), 6));

      } catch (err) {
        console.log(err);
        signals.mintLoading.dispatch(false);
        return;
      }

      const mintModal = document.getElementsByClassName("mint-modal");
      const overlay = document.getElementsByClassName("img-container");
      mintModal[0].style.display = "none";
      overlay[0].style.display = "none";
      signals.mintLoading.dispatch(false);
    }
  };

  function crop(image, x, y, width, height) {
    // create a canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    // set canvas size
    canvas.width = width;
    canvas.height = height;
  
    // draw the image
    ctx.drawImage(image, x, y, width, height, 0, 0, width, height);
  
    // return the data url
    return canvas.toDataURL();
  }

  function resize(image, logo) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set width and height
    canvas.width = 500;
    canvas.height = 500;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(logo, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL();
  }

  option.onClick(async function () {
    const size = editor.size;
    if (!editor.model) {
      alert("Please select the car model.");

      return;
    }

    signals.showGridChanged.dispatch(false);
    signals.showHelpersChanged.dispatch(false);

    var _DEFAULT_CAMERA = new THREE.PerspectiveCamera(50, 1, 0.01, 1000);
    _DEFAULT_CAMERA.name = "Camera";
    _DEFAULT_CAMERA.position.set(-130, 70, 140);
    _DEFAULT_CAMERA.lookAt(new THREE.Vector3());

    let multiplyIndex;
    if (size === "medium") multiplyIndex = 6.5;
    else if (size === "large") multiplyIndex = 8.3;
    else if (size === "small") multiplyIndex = 5.8;
    else multiplyIndex = 6.5;

    _DEFAULT_CAMERA.position.normalize().multiplyScalar(multiplyIndex);
    editor.camera.copy(_DEFAULT_CAMERA);
    signals.cameraResetted.dispatch();

    const canvas = document.getElementsByTagName("canvas");
    var strMime = "image/jpeg";
    const imgWidth = canvas[0].width;
    const imgHeight = canvas[0].height;
    
    setTimeout(() => {

      var imgData = canvas[0].toDataURL(strMime);

      const nftImage = document.getElementsByClassName("nft-image");

      let cropImage;
      const newImg = new Image();
      newImg.src = imgData;

      newImg.onload = function() {
        if (imgWidth > imgHeight * 0.9) {
          cropImage = crop(newImg, (imgWidth - imgHeight * 0.9)/2, 0, imgHeight * 0.9, imgHeight * 0.9);
        }
        else {
          cropImage = crop(newImg, 0, (imgHeight * 0.9 - imgWidth)/2, imgWidth, imgWidth);
        }
        const imgCrop = new Image();
        imgCrop.src = cropImage;

        const logo = new Image();
        logo.src = "../assets/images/nftlogo.png";

        imgCrop.onload = function() {
          logo.onload = function () {
            const resultImage = resize(imgCrop, logo);
            nftImage[0].src = resultImage;            
          }
        }
      };


    }, "500")

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
