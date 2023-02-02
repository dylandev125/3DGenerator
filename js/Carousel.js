import * as THREE from "three";

import { UIElement, UIPanel } from "./libs/ui.js";
import { AddObjectCommand } from "./commands/AddObjectCommand.js";

const modelData = [
  {
    name: "Eagle",
    price: 10,
    fileName: "Mustang_69_05.gltf",
    imgName: "Mustang_69_05_Thumbnail_comp.png",
    type: "mustang5",
  },
  {
    name: "Hatchet",
    price: 10,
    fileName: "Honda_Civic_R.gltf",
    imgName: "Honda_Civic_R_Thumbnail_comp.png",
  },
  {
    name: "Sport",
    price: 10,
    fileName: "Mazda_Mx5.gltf",
    imgName: "Mazda_Mx5_Thumbnail_comp.png",
  },
  {
    name: "Wagon",
    price: 10,
    fileName: "Mercedes_W123_Wagon.gltf",
    imgName: "Mercedes_W123_Wagon_Thumbnail_comp.png",
  },
  {
    name: "Hyper",
    price: 10,
    fileName: "Bugatti_Chiron.gltf",
    imgName: "Bugatti_Chiron_Thumbnail_comp.png",
  },
  {
    name: "Muscle",
    price: 10,
    fileName: "Chevorlet_Camero_2014.gltf",
    imgName: "Chevorlet_Camero_2014_Thumbnail_comp.png",
  },
  {
    name: "Classic",
    price: 10,
    fileName: "Corvette_Stingray.gltf",
    imgName: "Corvette_Stingray_Thumbnail_comp.png",
  },
  {
    name: "Lux",
    price: 10,
    fileName: "Ferrari_F430.gltf",
    imgName: "Ferrari F430_Thumbnail_comp.png",
  },
  {
    name: "Workhorse",
    price: 10,
    fileName: "Ford_F100_1970.gltf",
    imgName: "Ford_F100_1970_Thumbnail_comp.png",
  },
  {
    name: "Aero",
    price: 10,
    fileName: "Formula1.gltf",
    imgName: "Formula1_Thumbnail_comp.png",
  },
  {
    name: "Exotic",
    price: 10,
    fileName: "Lamborghini_Aventador.gltf",
    imgName: "Lamborghini_Aventador_Thumbnail_comp.png",
  },
  {
    name: "Street",
    price: 10,
    fileName: "Mazda_Rx7.gltf",
    imgName: "Mazda_Rx7_Thumbnail_comp.png",
  },
  {
    name: "Cruiser",
    price: 10,
    fileName: "Mercedes_W140.gltf",
    imgName: "Mercedes_W140_Thumbnail_comp.png",
  },
  {
    name: "Lowrider",
    price: 10,
    fileName: "Mercury_Lowrider_1950.gltf",
    imgName: "Mercury_Lowrider_1950_Thumbnail_comp.png",
  },
  {
    name: "Europa",
    price: 10,
    fileName: "Mini_Cooper.gltf",
    imgName: "Mini_Cooper_Thumbnail_comp.png",
  },
  {
    name: "Millennial",
    price: 10,
    fileName: "Mitsubishi_Eclipse.gltf",
    imgName: "Mitsubishi_Eclipse_Thumbnail_comp.png",
  },
  {
    name: "Tuner",
    price: 10,
    fileName: "Nissan_SkylineGTR.gltf",
    imgName: "Nissan_SkylineGTR_Thumbnail_comp.png",
  },
  {
    name: "Drifter",
    price: 10,
    fileName: "Nissan350Z.gltf",
    imgName: "Nissan350Z_Thumbnail_comp.png",
  },
  {
    name: "Zodiac",
    price: 10,
    fileName: "Pagani_Zonda.gltf",
    imgName: "Pagani_Zonda_Thumbnail_comp.png",
  },
  {
    name: "Cyber",
    price: 10,
    fileName: "Pantera_1971.gltf",
    imgName: "Pantera_1971_Thumbnail_comp.png",
  },
  {
    name: "Turbo",
    price: 10,
    fileName: "Porsch_911.gltf",
    imgName: "Porsch_911_Thumbnail_comp.png",
  },
  {
    name: "Roller",
    price: 10,
    fileName: "Rolls_Royce_1950.gltf",
    imgName: "Rolls_Royce_1950_Thumbnail_comp.png",
  },
  {
    name: "Rally",
    price: 10,
    fileName: "Subaru_WRX_STI.gltf",
    imgName: "Subaru_WRX_STI_Thumbnail_comp.png",
  },
  {
    name: "Electron",
    price: 10,
    fileName: "Tesla.gltf",
    imgName: "Tesla_Thumbnail_comp.png",
  },
];

function loadXHR(url) {
  return new Promise(function (resolve, reject) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.onerror = function () {
        reject("Network error.");
      };
      xhr.onload = function () {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject("Loading error:" + xhr.statusText);
        }
      };
      xhr.send();
    } catch (err) {
      reject(err.message);
    }
  });
}

function Carousel(editor) {
  const container = new UIPanel();
  container.setId("carousel");

  const wrapper = new UIPanel();
  wrapper.setClass("slider-wrapper");

  let element = new UIElement();
  const prevButton = document.createElement("button");
  prevButton.className = "slide-arrow custom-button";
  prevButton.id = "slide-arrow-prev";
  element.dom = prevButton;
  wrapper.add(element);

  const nextButton = document.createElement("button");
  nextButton.className = "slide-arrow custom-button";
  nextButton.id = "slide-arrow-next";
  element.dom = nextButton;
  wrapper.add(element);

  const listGroup = document.createElement("ul");
  listGroup.className = "slides-container";
  listGroup.id = "slides-container";

  for (let i = 0; i < modelData.length; i++) {
    const listItem = document.createElement("li");
    listItem.className = "slide";

    const carImg = document.createElement("img");
    carImg.src = "./assets/cars/" + modelData[i].imgName + "";
    const imgWrapper = document.createElement("div");
    imgWrapper.className = "image-wrapper custom-button";
    imgWrapper.append(carImg);

    const priceItem = document.createElement("div");
    priceItem.className = "price-container";
    const crzImg = document.createElement("img");
    crzImg.src = "./assets/images/crz.svg";
    const priceView = document.createElement("span");
    priceView.textContent = modelData[i].price + " CRZ";
    priceView.className = "price-view";
    priceItem.append(crzImg);
    priceItem.append(priceView);

    listItem.append(imgWrapper);
    listItem.append(priceItem);

    listItem.onclick = async function () {
      const blob = await fetch("./assets/models/" + modelData[i].fileName);
      const bgBlob = await fetch("./assets/models/bg_plane_4.gltf");

      const response = await blob.arrayBuffer();
      const response2 = await bgBlob.arrayBuffer();

      let file = new File([response], modelData[i].fileName, {
        type: blob.headers.get("Content-Type"),
      });

      let bgFile = new File([response2], "bg_plane_4.gltf", {
        type: bgBlob.headers.get("Content-Type"),
      });

      const dt = new DataTransfer();
      dt.items.add(file);
      dt.items.add(bgFile);
      
      editor.clear();

      let color = 0xffffff;
      const intensity = 1;

      let light = new THREE.DirectionalLight(color, 0.4);
      light.name = "DirectionalLight";
      light.target.name = "DirectionalLight Target";

      light.position.set(18, 31, 28);

      editor.execute(new AddObjectCommand(editor, light));

      let light2 = new THREE.DirectionalLight(color, 0.4);
      light2.name = "DirectionalLight2";
      light2.target.name = "DirectionalLight Target2";

      light2.position.set(-19, 31, -27);

      editor.execute(new AddObjectCommand(editor, light2));

      color = 0x222222;

      light = new THREE.AmbientLight(color);
      light.name = "AmbientLight";

      editor.execute(new AddObjectCommand(editor, light));

      editor.loader.loadFiles(dt.files);
      editor.model = modelData[i].name;
    };

    listGroup.append(listItem);
  }
  element.dom = listGroup;
  wrapper.add(element);
  container.add(wrapper);

  return container;
}

export { Carousel };
