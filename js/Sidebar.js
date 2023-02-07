import {
  UITabbedPanel,
  UISpan,
  UIPanel,
  UIColor,
  UIRow,
  UIText,
  UIDiv,
  UIInput,
  UILabel,
  UISelect,
  UICheckbox,
} from "./libs/ui.js";

import { SidebarScene } from "./Sidebar.Scene.js";
import { SidebarProperties } from "./Sidebar.Properties.js";
import { SidebarScript } from "./Sidebar.Script.js";
import { SidebarAnimation } from "./Sidebar.Animation.js";
import { SidebarProject } from "./Sidebar.Project.js";
import { SidebarSettings } from "./Sidebar.Settings.js";
import { SidebarAccessory } from "./Sidebar.Accessory.js";
import { SidebarMaterialColorProperty } from "./Sidebar.Material.ColorProperty.js";
import { MenubarMint } from "./Menubar.Mint.js";
import { Carousel } from "./Carousel.js";
// import { AddObjectCommand } from "./commands/AddObjectCommand.js";
// import * as THREE from "three";

function Sidebar(editor) {
  const strings = editor.strings;
  const signals = editor.signals;
  const scene = editor.scene;

  const container = new UIPanel();
  container.setId("sidebar");
  container.setClass("scrollbar");

  const carSelecter = new Carousel(editor);
  container.add(carSelecter);

  const wrapper = new UIPanel();

  const scene_ = new UISpan().add(
    new SidebarScene(editor),
    new SidebarProperties(editor),
    new SidebarAnimation(editor),
    new SidebarScript(editor)
  );
  const project = new SidebarProject(editor);
  const settings = new SidebarSettings(editor);
  const accessory = new SidebarAccessory(editor);

  const materialColor = new SidebarMaterialColorProperty(
    editor,
    "color",
    strings.getKey("sidebar/material/color")
  );
  materialColor.setId("material");
  wrapper.add(materialColor);



  // const colorWrapper = new UIRow();
  // colorWrapper.dom.className = "Row custom-row";

  // const text = new UIText("Background");
  // text.dom.className = "text-white";

  // const backgroundColor = new UIColor()
  //   .setValue("#000000")
  //   .setMarginLeft("8px")
  //   .onInput(onBackgroundChanged);
  // backgroundColor.dom.className = "background-color";

  // colorWrapper.add(text);
  // colorWrapper.add(backgroundColor);

  // backgroundColor.onChange(function () {
  //   onBackgroundChanged();
  // });

  // wrapper.add(colorWrapper);

  const gridSwitch = new UIRow();
  gridSwitch.dom.className = "Row custom-row";

  const text2 = new UIText("Helper View");
  text2.dom.className = "text-white";

  const toggleGrid = new UIDiv();
  toggleGrid.dom.className = "toggle";
  toggleGrid.dom.id = "gridToggle";

  const gridCheckbox = new UIInput();
  gridCheckbox.dom.className = "toggle__checkbox";
  gridCheckbox.dom.checked = true;
  gridCheckbox.dom.type = "checkbox";
  gridCheckbox.dom.id = "toggle1";

  const gridLabel = new UILabel();
  gridLabel.dom.htmlFor = "toggle1";
  gridLabel.dom.className = "toggle__label";

  toggleGrid.add(gridCheckbox);
  toggleGrid.add(gridLabel);

  gridSwitch.add(text2);
  gridSwitch.add(toggleGrid);

  wrapper.add(gridSwitch);

  const HoodScoopRow = new UIRow();
  HoodScoopRow.dom.className = "Row custom-row";

  const HoodScoopText = new UIText("Scoop");
  HoodScoopText.dom.className = "text-white";
  HoodScoopRow.add(HoodScoopText);

  const HoodScoopWrapper = new UIDiv();
  HoodScoopWrapper.setClass("round");

  const HoodScoopCheck = new UICheckbox();
  HoodScoopCheck.setId("checkHood");
  HoodScoopCheck.setValue(true);

  HoodScoopCheck.onChange(function (e) {
    let glbObj = scene.getObjectByName("Carglb");
    let scoop = glbObj.getObjectByName("Scoop");
    scoop.visible = e.target.checked;
  });

  const HoodScoopLabel = new UILabel();
  HoodScoopLabel.dom.htmlFor = "checkHood";

  HoodScoopWrapper.add(HoodScoopCheck);
  HoodScoopWrapper.add(HoodScoopLabel);

  HoodScoopRow.add(HoodScoopWrapper);
  wrapper.add(HoodScoopRow);

  const WingRow = new UIRow();
  WingRow.dom.className = "Row custom-row";

  const WingText = new UIText("Wing");
  WingText.dom.className = "text-white";
  WingRow.add(WingText);

  const WingWrapper = new UIDiv();
  WingWrapper.setClass("round");

  const WingCheck = new UICheckbox();
  WingCheck.setId("checkWing");
  WingCheck.setValue(true);

  WingCheck.onChange(function (e) {
    let glbObj = scene.getObjectByName("Carglb");
    let wing = glbObj.getObjectByName("Wing");
    wing.visible = e.target.checked;
  });

  const WingLabel = new UILabel();
  WingLabel.dom.htmlFor = "checkWing";

  WingWrapper.add(WingCheck);
  WingWrapper.add(WingLabel);

  WingRow.add(WingWrapper);
  wrapper.add(WingRow);

  // const Bonnetow = new UIRow();
  // Bonnetow.dom.className = "Row custom-row";

  // const BonnetText = new UIText("Bonnet");
  // BonnetText.dom.className = "text-white";
  // Bonnetow.add(BonnetText);

  // const BonnetWrapper = new UIDiv();
  // BonnetWrapper.setClass("round");

  // const BonnetCheck = new UICheckbox();
  // BonnetCheck.setId("checkBonnet");
  // BonnetCheck.setValue(true);

  // BonnetCheck.onChange(function(e) {
  // 	let glbObj = scene.getObjectByName("Carglb");
  // 	let wing = glbObj.getObjectByName('Bonnet');
  // 	wing.visible = e.target.checked;
  // })

  // const BonnetLabel = new UILabel();
  // BonnetLabel.dom.htmlFor = "checkBonnet";

  // BonnetWrapper.add(BonnetCheck);
  // BonnetWrapper.add(BonnetLabel);

  // Bonnetow.add(BonnetWrapper)
  // wrapper.add(Bonnetow);

  const wheelSelect = new UIRow();
  wheelSelect.dom.className = "Row custom-row";

  const wheelText = new UIText("Wheel");
  wheelText.dom.className = "text-white";
  wheelSelect.add(wheelText);

  const wheelDropdown = new UISelect();
  wheelDropdown.setClass("custom-dropdown");
  wheelDropdown.setId("wheel_select");
  const options = ["Type 1", "Type 2", "Type 3"];
  wheelDropdown.setOptions(options);
  wheelDropdown.setValue(2);

  wheelDropdown.onChange(function (e) {
    let wheels_obj = scene.getObjectByName("Carglb");

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

    if (e.target.value === "0") {
      wheel_fl1.visible = true;
      wheel_fl2.visible = false;
      wheel_fl3.visible = false;

      wheel_fr1.visible = true;
      wheel_fr2.visible = false;
      wheel_fr3.visible = false;

      wheel_rl1.visible = true;
      wheel_rl2.visible = false;
      wheel_rl3.visible = false;

      wheel_rr1.visible = true;
      wheel_rr2.visible = false;
      wheel_rr3.visible = false;
    } else if (e.target.value === "1") {
      wheel_fl1.visible = false;
      wheel_fl2.visible = true;
      wheel_fl3.visible = false;

      wheel_fr1.visible = false;
      wheel_fr2.visible = true;
      wheel_fr3.visible = false;

      wheel_rl1.visible = false;
      wheel_rl2.visible = true;
      wheel_rl3.visible = false;

      wheel_rr1.visible = false;
      wheel_rr2.visible = true;
      wheel_rr3.visible = false;
    } else if (e.target.value === "2") {
      wheel_fl1.visible = false;
      wheel_fl2.visible = false;
      wheel_fl3.visible = true;

      wheel_fr1.visible = false;
      wheel_fr2.visible = false;
      wheel_fr3.visible = true;

      wheel_rl1.visible = false;
      wheel_rl2.visible = false;
      wheel_rl3.visible = true;

      wheel_rr1.visible = false;
      wheel_rr2.visible = false;
      wheel_rr3.visible = true;
    }
  });

  wheelSelect.add(wheelDropdown);
  wrapper.add(wheelSelect);

  function onBackgroundChanged() {
    signals.sceneBackgroundChanged.dispatch(
      "Color",
      backgroundColor.getHexValue(),
      "",
      ""
    );
  }

  gridCheckbox.dom.onclick = function () {
    if (gridCheckbox.dom.checked === true) {
      toggleGrid.dom.style.backgroundColor = "green";
      signals.showGridChanged.dispatch(true);
      signals.showHelpersChanged.dispatch(true);
    } else {
      toggleGrid.dom.style.backgroundColor = "red";
      signals.showGridChanged.dispatch(false);
      signals.showHelpersChanged.dispatch(false);
    }
  };

  container.add(wrapper);

  container.add(new MenubarMint(editor));

  // container.addTab( 'scene', strings.getKey( 'sidebar/scene' ), scene );
  // container.addTab( 'project', strings.getKey( 'sidebar/project' ), project );
  // container.addTab( 'settings', strings.getKey( 'sidebar/settings' ), settings );
  // container.addTab( 'accessory', 'accessory', accessory );
  // container.select( 'scene' );

  return container;
}

export { Sidebar };
