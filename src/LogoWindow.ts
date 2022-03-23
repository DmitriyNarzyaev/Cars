import { Sprite } from "pixi.js";
import Container = PIXI.Container;

export default class LogoWindow extends Container {
	private _logoSizeCorrector:number = 4;
	private _windowWidth:number = 800;
	private _windowHeight:number = 500 / this._logoSizeCorrector;
	constructor(logoNameArray:string[]) {
		super();
		this.initBorders();
		this.initLogo(logoNameArray);
	}

	private initBorders():void {
		let borders:PIXI.Graphics = new PIXI.Graphics;
		borders
			.lineStyle(1, 0x000000, 1, 1)
			.beginFill(0x000000, 0)
			.drawRect(0, 0, this._windowWidth, this._windowHeight);
		this.addChild(borders);
	}

	private initLogo(logoNameArray:string[]):void {
		const gap:number = 5;
		let logoBackgroundX:number = 0;
		let logoContainer:PIXI.Container = new PIXI.Container;
		this.addChild(logoContainer);

		for (let iterator:number = 0; iterator < logoNameArray.length; iterator++) {
			let logoBackground:PIXI.Graphics = new PIXI.Graphics;
			logoBackground
				.beginFill(0xbbbbbb)
				.drawRect(0, 0, this._windowHeight, this._windowHeight);
			logoBackground.x = logoBackgroundX;
			logoBackgroundX += logoBackground.width + gap;
			logoContainer.addChild(logoBackground);

			let logo:Sprite = Sprite.from(logoNameArray[iterator]);
			logo.width /= this._logoSizeCorrector;
			logo.height /= this._logoSizeCorrector;
			logo.x = logoBackground.x + (logoBackground.width - logo.width) /2;
			logo.y = logoBackground.y + (logoBackground.height - logo.height) /2;
			logoContainer.addChild(logo);
		}
		this.initBackground(logoContainer);
		this.initMask(logoContainer);
	}

	private initBackground(logoContainer:PIXI.Container):void {
		let logoContainerBackground:PIXI.Graphics = new PIXI.Graphics;
		logoContainerBackground
			.lineStyle(1, 0x000000)
			.beginFill(0x000000, 1)
			.drawRect(0, 0, logoContainer.width, logoContainer.height);
		logoContainer.addChildAt(logoContainerBackground, 0);
	}

	private initMask(logoContainer:PIXI.Container):void {
		let windowMask:PIXI.Graphics = new PIXI.Graphics;
		windowMask
			.lineStyle(1, 0x000000, 0, 0)
			.beginFill(0x000000, 1)
			.drawRect(0, 0, this._windowWidth, this._windowHeight);
		this.addChild(windowMask);
		logoContainer.mask = windowMask;
	}
}