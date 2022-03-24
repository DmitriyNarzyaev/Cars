import Container = PIXI.Container;
import { Graphics, Loader,  } from "pixi.js";
import LogoWindow from "./LogoWindow";

export default class MainContainer extends Container {
	public static readonly WIDTH:number = 1300;
	public static readonly HEIGHT:number = 600;
	private _pictureNameArray:string[] = [
		"AlfaRomeo",	"AstonMartin",
		"Dodge",		"Ferrari",
		"Jaguar",		"Infiniti",
		"Lotus",		"Porsche",
	];
	private _logoNameArray:string[] = [
		"AlfaRomeoLogo",	"AstonMartinLogo",
		"DodgeLogo",		"FerrariLogo",
		"JaguarLogo",		"InfinitiLogo",
		"LotusLogo",		"PorscheLogo",
	];
	private _logoWindow:LogoWindow;

	constructor() {
		super();
		this.initBackground();
		this.initImages();
	}

	private initBackground():void {
		let bg: Graphics = new Graphics;
		bg.beginFill(0x666666);
		bg.drawRect(0, 0, MainContainer.WIDTH, MainContainer.HEIGHT);
		this.addChild(bg);
	}

	private initImages():void {
        const loader:Loader = new Loader();
		loader.add(this._pictureNameArray[0], "AlfaRomeo.jpg");
		loader.add(this._pictureNameArray[1], "AstonMartin.jpg");
		loader.add(this._pictureNameArray[2], "Dodge.jpg");
		loader.add(this._pictureNameArray[3], "Ferrari.jpg");
		loader.add(this._pictureNameArray[4], "Jaguar.jpg");
		loader.add(this._pictureNameArray[5], "Infiniti.jpg");
		loader.add(this._pictureNameArray[6], "Lotus.jpg");
		loader.add(this._pictureNameArray[7], "Porsche.jpg");

		loader.add(this._logoNameArray[0], "AlfaRomeoLogo.png");
		loader.add(this._logoNameArray[1], "AstonMartinLogo.png");
		loader.add(this._logoNameArray[2], "DodgeLogo.png");
		loader.add(this._logoNameArray[3], "FerrariLogo.png");
		loader.add(this._logoNameArray[4], "JaguarLogo.png");
		loader.add(this._logoNameArray[5], "InfinitiLogo.png");
		loader.add(this._logoNameArray[6], "LotusLogo.png");
		loader.add(this._logoNameArray[7], "PorscheLogo.png");

		loader.load((loader, resources)=> {
			this.initLogoWindow();
		});
		loader.load();
	}

	private initLogoWindow():void {
		const gap:number = 10;
		this._logoWindow = new LogoWindow(this._logoNameArray, this._pictureNameArray);
		this.addChild(this._logoWindow);
		this._logoWindow.x = (MainContainer.WIDTH - this._logoWindow.width) / 2;
		this._logoWindow.y = MainContainer.HEIGHT - this._logoWindow.height - gap; 
	}
}
