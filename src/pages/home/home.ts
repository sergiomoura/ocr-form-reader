import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	private cameraOptions:CameraOptions;
	public imgData:string;

	constructor(
		private camera:Camera
	) {
		this.cameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			targetWidth:1536, // <== 2 * 768
			correctOrientation:false,
			allowEdit:true
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

	/**
	 * Gets the first dark pixel of the picture (top left)
	 */
}
