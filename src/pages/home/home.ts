import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as Tesseract from "tesseract.js";

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	private cameraOptions:CameraOptions;
	public imgData:string;
	public imgText:string;

	constructor(
		private camera:Camera
	) {
		this.cameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			//targetWidth:3072, // <== 2 * 768
			correctOrientation:true,
			allowEdit:true,
			saveToPhotoAlbum:false
		}
	}

	onGetFormPictureClick() {
		this.camera.getPicture(this.cameraOptions)
		.then(
			(imageData) => {
				this.imgData = 'data:image/jpeg;base64,' + imageData;
			},
			(err) => {
			}
		);
	}

	onRecognizeFieldsClick() {
		Tesseract.recognize(this.imgData,'por')
		.catch(
			err => {
				console.error(err);
			}
		)
		.progress(
			progress => {
				console.dir(progress);
			}
		)
		.then(
			result => {
				this.imgText = result.text;
				console.dir(result);
			}
		)
	}
}
