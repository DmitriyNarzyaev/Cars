import { Graphics, InteractionEvent, IPoint, Sprite } from "pixi.js";
import Container = PIXI.Container;

export default class LogoWindow extends Container {
	private _logoSizeCorrector:number = 4;
	private _logoContainer:PIXI.Container;
	private _pictureContainer:PIXI.Container;
	private _logoArray:PIXI.Graphics[] = [];
	private _windowWidth:number = 800;
	private _windowHeight:number = 500 / this._logoSizeCorrector;
	private _touchDownPoint:IPoint;
	private _startDrag:number=0;
	private _dragDistance:number = 0;
	private _dragIterator:number = 0;
	private _dragPoint1:number=0;
	private _dragPoint2:number=0;
	private _logoNameIterator:number = 0;
	private _logoNameArray:string[];

	constructor(logoNameArray:string[], pictureNameArray:string[]) {
		super();
		this._logoNameArray = pictureNameArray;
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
		this._logoContainer = new PIXI.Container;
		this._logoContainer.interactive = true;
		this._logoContainer.buttonMode = true;
		this.addChild(this._logoContainer);

		for (let iterator:number = 0; iterator < logoNameArray.length; iterator++) {
			let logoBackground:PIXI.Graphics = new PIXI.Graphics;
			logoBackground
				.beginFill(0xbbbbbb)
				.drawRect(0, 0, this._windowHeight, this._windowHeight);
			logoBackground.x = logoBackgroundX;
			logoBackgroundX += logoBackground.width + gap;
			this._logoContainer.addChild(logoBackground);
			this._logoArray.push(logoBackground);

			let logo:Sprite = Sprite.from(logoNameArray[iterator]);
			logo.width /= this._logoSizeCorrector;
			logo.height /= this._logoSizeCorrector;
			logo.x = logoBackground.x + (logoBackground.width - logo.width) /2;
			logo.y = logoBackground.y + (logoBackground.height - logo.height) /2;
			this._logoContainer.addChild(logo);
		}
		this.initBackground(this._logoContainer);
		this.initMask(this._logoContainer);

		this._logoContainer
			.addListener('mousedown', this.onDragStart, this)
			.addListener('touchstart', this.onDragStart, this)
			.addListener('mouseup', this.onDragEnd, this)
			.addListener('mouseupoutside', this.onDragEnd, this)
			.addListener('touchend', this.onDragEnd, this)
			.addListener('touchendoutside', this.onDragEnd, this);
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

	private onDragStart(event:InteractionEvent):void {
		this._touchDownPoint = this._logoContainer.toLocal(event.data.global);
		this._logoContainer.addListener('mousemove', this.onDragMove, this);
		this._logoContainer.addListener('touchmove', this.onDragMove, this);
		this._startDrag = event.data.global.x;
	}

	private onDragMove(event:InteractionEvent):void {
		const newPosition:IPoint = this.toLocal(event.data.global);
		this._logoContainer.x = newPosition.x - this._touchDownPoint.x;
		const maxX:number = 0;
		if (this._logoContainer.x > maxX) {
			this._logoContainer.x = maxX;
		}
		const minX:number =
			this._windowWidth -
			this._logoContainer.width;
		if (this._logoContainer.x < minX) {
			this._logoContainer.x = minX;
		}
	}

	private onDragEnd(event:InteractionEvent):void {
		this._logoContainer.removeListener('mousemove', this.onDragMove, this);
		this._logoContainer.removeListener('touchmove', this.onDragMove, this);
		this._dragDistance = Math.abs(this._startDrag - event.data.global.x);
		this._dragIterator++;
		if (this._dragPoint1 !==0 && this._dragPoint2 !==0) {
			if (this._dragIterator == 1) {
				this._dragPoint1 = event.data.global.x;
			} else if (this._dragIterator == 2) {
				this._dragPoint2 = event.data.global.x;
			}
		}

		if (this._dragDistance <= 8) {
			for (let iterator:number = 0; iterator < this._logoArray.length; iterator++) {
				this._logoNameIterator++;
				if (this._touchDownPoint.x >= this._logoArray[iterator].x
					&& this._touchDownPoint.x <= this._logoArray[iterator].x + this._logoArray[iterator].width) {
					this.initImage(this._logoNameArray[this._logoNameIterator - 1]);
					break;
				}
			}
			this._logoNameIterator = 0;
		}
		this._touchDownPoint = null;
	}

	private initImage(text:string):void {
		if (this._pictureContainer) {
			this.removeChild(this._pictureContainer);
		}
		this._pictureContainer = new PIXI.Container;
		this.addChild(this._pictureContainer);
		let carPicture:Sprite = Sprite.from(text);
		let standartHeight:number = carPicture.height;
		carPicture.height = 440
		carPicture.width /= standartHeight / carPicture.height;
		carPicture.x = (this._windowWidth - carPicture.width) / 2;
		carPicture.y -= 450;

		this._pictureContainer.addChild(carPicture);
	}
}
