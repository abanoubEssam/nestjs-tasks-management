import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as firebase from 'firebase/app';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  const firebaseConfig = {
    apiKey: 'AIzaSyCGY6eSCibGbLdwb_PTzsWyqtloj_14mNI',
    authDomain: 'el-kas.firebaseapp.com',
    databaseURL: 'https://el-kas.firebaseio.com',
    projectId: 'el-kas',
    storageBucket: 'el-kas.appspot.com',
    messagingSenderId: '285290236847',
    appId: '1:285290236847:web:fc939a918fd79067',
  };

  await app.listen(port, () => {
    console.log(`we are listen on port ${port} .....`);
    firebase.initializeApp(firebaseConfig);
  });
}
bootstrap();
