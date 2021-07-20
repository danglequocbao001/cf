import { Component, OnInit, Input } from '@angular/core';
import { NavController,AlertController   } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UserSerivce } from 'src/app/@core-app/providers';
@Component({
    selector: 'app-head-title',
    templateUrl: './head-title.component.html',
    styleUrls: ['./head-title.component.scss'],
})
export class HeadTitleComponent implements OnInit {
    @Input() title: string = '';
    @Input() isCheck: boolean = false;
    @Input() isCheckInfo: boolean = false;
    @Input() isCheckLogin: boolean = false;
    @Input() isCheckRegister: boolean = false;
    @Input() isMainMenu: boolean = false;
    @Input() isNoContent: boolean = false;
    @Input() isReward: boolean = false;
    image_url: any;
    constructor(
        private navCtrl: NavController,
        private router: Router,
        private camera: Camera,
        private alertCtrl: AlertController,
        private userservice: UserSerivce,
        ) { }

    ngOnInit() { 
      
      this.userservice.getInfoUser().then((data)=> {

          // console.log(data['avatar']);
          if(data['avatar'] === null) {
            this.image_url = 'assets/images/user-info-green.svg';
          }
          else this.image_url = data['avatar'];
      })
      
      
    }

    backPage(){
        this.navCtrl.pop();
    }

    detailUser(){
        this.router.navigate(['detail-user']);   
    }
    back(){
        this.router.navigateByUrl('detail-user');
    }
    
    async changeAvatar(){
        let alert = await this.alertCtrl.create({
            message: 'Thay đổi ảnh đại diện',
            buttons: [
              {
                text: 'Chọn ảnh có sẵn',
                role: 'destructive', 
                handler: () => {
                  this.uploadAvatar();
                }
              },
              {
                text: 'Chụp ảnh mới',
                handler: () => {
                  this.takephoto();
                }
              }
            ]
          });
          await alert.present();
    }
    uploadAvatar(){
        const options = {
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            correctOrientation: true
          }
          this.camera.getPicture(options).then(async (dataUrl) => {
            if (dataUrl) {
              var dataUri = "data:image/jpeg;base64," + dataUrl;

              var image = dataURItoBlob(dataUri);
              let formData = new FormData;
              formData.append('avatar', image);
                this.userservice.uploadphoto(formData).then((data)=>{
                  // console.log(data)

                  this.image_url = data['user']['avatar'];
                  // console.log(this.image_url);
                })
            }
          }).catch(() => {
            setTimeout(() => {
            }, 500);
          })
    }
   
    takephoto() {
        const options = {
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          sourceType: this.camera.PictureSourceType.CAMERA,
          correctOrientation: true
        }
        this.camera.getPicture(options).then(async (dataUrl) => {
    
          if (dataUrl) {
            var dataUri = "data:image/jpeg;base64," + dataUrl;
            var image = dataURItoBlob(dataUri);
            let formData = new FormData;
            formData.append('files', image);
            this.userservice.uploadphoto(formData).then(data =>{

                // console.log('data',data);
                
            })
          }
        }).catch(() => {
          setTimeout(() => {
            
          }, 500);
        })
      }
    
}
function dataURItoBlob(dataURI) {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    }
    else {
      byteString = encodeURI(dataURI.split(',')[1]);
    }
  
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }
  