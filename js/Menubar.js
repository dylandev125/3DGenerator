import { UIElement, UIPanel } from './libs/ui.js';
import { OrbitControls } from '../example/jsm/controls/OrbitControls.js';

// import { MenubarAdd } from './Menubar.Add.js';
// import { MenubarEdit } from './Menubar.Edit.js';
// import { MenubarFile } from './Menubar.File.js';
// import { MenubarExamples } from './Menubar.Examples.js';
// import { MenubarView } from './Menubar.View.js';
// import { MenubarHelp } from './Menubar.Help.js';
// import { MenubarMint } from './Menubar.Mint.js';
// import { MenubarPlay } from './Menubar.Play.js';
// import { MenubarStatus } from './Menubar.Status.js';

function Menubar( editor ) {
	// const controls = new OrbitControls(editor.camera, document.getElementById("viewport"));
	// controls.maxDistance = 12;
	// controls.minDistance = 4;
	
	// controls.update();

	const container = new UIPanel();
	container.setId( 'menubar' );

	let logoElement = new UIElement();
	const logoImage = document.createElement('img');
	logoImage.classList.add('img-logo');
	logoImage.src="./images/logo.png";
	logoElement.dom = logoImage;

	let redirectElement = new UIElement();
	const linkMain = document.createElement('a');
	linkMain.text = "< Back to Main"
	linkMain.href="https://croozenft.io/";
	linkMain.className = "redirect-text"
	redirectElement.dom = linkMain;
	container.add(logoElement);
	container.add(redirectElement);

	// container.add( new MenubarFile( editor ) );
	// container.add( new MenubarEdit( editor ) );
	// container.add( new MenubarAdd( editor ) );
	// container.add( new MenubarPlay( editor ) );
	// container.add( new MenubarExamples( editor ) );
	// container.add( new MenubarView( editor ) );
	// container.add( new MenubarHelp( editor ) );
	// container.add( new MenubarMint( editor ) );

	// container.add( new MenubarStatus( editor ) );

	return container;

}

export { Menubar };
