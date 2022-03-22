import Container = PIXI.Container;
import { Graphics, Loader } from "pixi.js";

export default class MainContainer extends Container {
	public static readonly WIDTH:number = 1300;
	public static readonly HEIGHT:number = 600;
	private _pictureNameArray:string[] = [
		"AlfaRomeo",		"AlfaRomeoLogo",
		"AstonMartin",		"AstonMartinLogo",
		"Dodge",			"DodgeLogo",
		"Ferrari",			"FerrariLogo",
		"Jaguar", 			"JaguarLogo",
		"Lotus", 			"LotusLogo",
		"Porsche", 			"PorscheLogo",
	];

	constructor() {
		super();
		this.initBackground();
		this.initImages();
	}

	private initBackground():void {
		let plkdjfg: Graphics = new Graphics;
		plkdjfg.beginFill(0x00ff48);
		plkdjfg.drawRect(0, 0, MainContainer.WIDTH, MainContainer.HEIGHT);
		this.addChild(plkdjfg);
	}

	private initImages():void {
        const loader:Loader = new Loader();
		loader.add(this._pictureNameArray[0], "robot-1.jpg");
		loader.add(this._pictureNameArray[1], "robot-2.jpg");
		loader.add(this._pictureNameArray[2], "robot-3.jpg");
		loader.add(this._pictureNameArray[3], "robot-4.jpg");
		loader.add(this._pictureNameArray[4], "robot-5.jpg");
		loader.add(this._pictureNameArray[5], "robot-6.jpg");
		loader.add(this._pictureNameArray[6], "robot-7.jpg");
		loader.add(this._pictureNameArray[7], "robot-8.jpg");
		loader.add(this._pictureNameArray[8], "robot-9.jpg");
		loader.add(this._pictureNameArray[9], "robot-9.jpg");
		loader.add(this._pictureNameArray[10], "robot-9.jpg");
		loader.add(this._pictureNameArray[11], "robot-9.jpg");
		loader.add(this._pictureNameArray[12], "robot-9.jpg");
		loader.add(this._pictureNameArray[13], "robot-9.jpg");
		loader.load((loader, resources)=> {

			console.log("loader");
		});
		loader.load();
	}
}