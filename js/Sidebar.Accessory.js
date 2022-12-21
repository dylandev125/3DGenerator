import { UIPanel, UIRow, UISelect, UISpan, UIText, UICheckbox } from './libs/ui.js';
import { UIBoolean } from './libs/ui.three.js';


function SidebarAccessory( editor ) {

	const config = editor.config;
	const strings = editor.strings;
	const scene = editor.scene;

	const container = new UISpan();

	const settings = new UIPanel();
	settings.setBorderTop( '0' );
	settings.setPaddingTop( '20px' );
	container.add( settings );

	// const headerRow = new UIRow();
	// headerRow.add( new UIText( strings.getKey( 'sidebar/settings/viewport' ).toUpperCase() ) );
	// settings.add( headerRow );

	const showWindShield = new UIRow();

	showWindShield.add( new UIText( 'Windshield' ).setWidth( '90px' ) );

	const showGlass = new UIBoolean( true ).onChange( function (e) {
		let obj = scene.getObjectByName("Mustang_69glb");
		let windShield = obj.getObjectByName("Glass")
		windShield.visible = e.target.checked
		console.log(e.target.checked)
		
	} );
	showWindShield.add( showGlass );
	settings.add( showWindShield );

	const options = [
		'Wheel Type1',
		'Wheel Type2',
		'Wheel Type3'
	];

	const wheelFLRow = new UIRow();
	const wheelSelect = new UISelect().setWidth( '150px' );
	wheelSelect.setOptions( options );

	wheelSelect.setValue('Wheel Type1');

	wheelSelect.onChange( function (e) {

		let wheels_obj = scene.getObjectByName("Mustang_69_04glb");

		// let wheels_obj = obj.getObjectByName('Wheels');

		let wheel_fl1 = wheels_obj.getObjectByName('Wheels_01_FL');
		let wheel_fr1 = wheels_obj.getObjectByName('Wheels_01_FR');
		let wheel_rl1 = wheels_obj.getObjectByName('Wheels_01_RL');
		let wheel_rr1 = wheels_obj.getObjectByName('Wheels_01_RR');

		let wheel_fl2 = wheels_obj.getObjectByName('Wheels_02_FL');
		let wheel_fr2 = wheels_obj.getObjectByName('Wheels_02_FR');
		let wheel_rl2 = wheels_obj.getObjectByName('Wheels_02_RL');
		let wheel_rr2 = wheels_obj.getObjectByName('Wheels_02_RR');

		let wheel_fl3 = wheels_obj.getObjectByName('Wheels_03_FL');
		let wheel_fr3 = wheels_obj.getObjectByName('Wheels_03_FR');
		let wheel_rl3 = wheels_obj.getObjectByName('Wheels_03_RL');
		let wheel_rr3 = wheels_obj.getObjectByName('Wheels_03_RR');

		if( e.target.value === '0' ) {
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
		}

		else if( e.target.value === '1' ) {
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
		}

		else if( e.target.value === '2' ) {
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
	} );

	wheelFLRow.add( new UIText( 'Select wheel type' ).setWidth( '110px' ) );
	wheelFLRow.add( wheelSelect );

	settings.add( wheelFLRow );

	return container;

}

export { SidebarAccessory };
