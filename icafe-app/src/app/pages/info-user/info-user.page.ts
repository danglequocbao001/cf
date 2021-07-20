import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService, UserSerivce } from 'src/app/@core-app';
import { AuthGuard } from 'src/app/@core-app/guard/auth.guard';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
    selector: 'app-info-user',
    templateUrl: './info-user.page.html',
    styleUrls: ['./info-user.page.scss'],
})
export class InfoUserPage implements OnInit {
    userInfo: User;
    formGroup: FormGroup;
    isEditUser: boolean = false;
    image_url: any;
    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private fb: FormBuilder,
        private userService: UserSerivce,
        private authGruand: AuthGuard, private router: Router,
        private camera: Camera,
        private userservice: UserSerivce,
        private alertCtrl: AlertController,
        private toastController: ToastController,
        ) { 
        
        }

    ngOnInit() {
        this.getUserInfo();
        this.createForm();
        this.userservice.getInfoUser().then((data)=> {

          // console.log(data['avatar']);
          if(data['avatar'] === null) {
            this.image_url = 'assets/images/user-info-green.svg';
          }
          else this.image_url = data['avatar'];
      })
      
    }
    ionViewWillLeave(){
      this.userservice.getInfoUser().then((data)=> {

        // console.log(data['avatar']);
        if(data['avatar'] === null) {
          this.image_url = 'assets/images/user-info-green.svg';
        }
        else this.image_url = data['avatar'];
        // console.log('imagee',this.image_url);
    })
    }
    getUserInfo() {
        this.authService.info().subscribe(res => {
          this.userInfo = res;
          if(this.userInfo.fullname == null || this.userInfo.fullname == '') {
            this.userInfo.fullname = this.userInfo.username;
          }
          // console.log(res);
        });
    }

    createForm() {
        this.formGroup = this.fb.group({
            fullname: new FormControl(this.userInfo.fullname, [Validators.required]),
            phone_number: new FormControl(this.userInfo.phone_number, [Validators.required]),
            email: new FormControl(this.userInfo.email, [Validators.required])
        })
    }

    changePassword() {
        this.router.navigate(['detail-user/change-password']);
    }

    changeUsers(){
      // console.log('data: ',this.formGroup.value);
      this.userService.editUser(this.formGroup.value).then( (res)=>{
          this.isEditUser = false;
      }).catch((error)=>{})
      this.router.navigateByUrl('main-menu');
      this.changeSuccess();
    }
    back(){
      this.userservice.getInfoUser().then((data)=>{
        this.router.navigate(['detail-user'],{
          queryParams:{
            data: JSON.stringify(data['avatar'])
          }
        });
        // console.log('a',data['avatar']);
        
      })
    }
    

    // HEADER
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
            formData.append('avatar', image);
            this.userservice.uploadphoto(formData).then(data =>{
              this.image_url = data['user']['avatar'];
            })
          }
        }).catch(() => {
          setTimeout(() => {
            
          }, 500);
        })
    }
    cancelUpdateUser() {
      this.router.navigate(['detail-user']);
      // console.log('wow');
    }

    async changeSuccess() {
      const toast = await this.toastController.create({
        message: 'Thành công, thông tin của bạn đã được lưu lại!',
        color: "success",
        duration: 2000
      });
      toast.present();
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