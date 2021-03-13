# Profile Builder
## Getting Started

#### 1. Clone and Install
Make sure that node and yarn are installed:
```bash
# Clone the repo
git clone https://github.com/rutvijb10/profile-app

# Navigate to clonned folder and Install dependencies
cd profile-app && yarn install

# Install Pods For iOS
cd ios && pod install && cd ..

# Gradle Clean for Android
cd android && ./gradlew clean && cd ..
```

#### 2. Fix Images for IOS >= 14

```
cd scripts && sh fix-image.sh && cd ..
```
#### 3. Start the Node Development Server

Run this command to start the development server :
```
yarn start
```

#### 4. Open Profile Builder App in your iOS simulator

After the development server has opened, run this command to start the app on iOS simulator:
```
yarn run:ios
```

Or, if you prefer Android:
```
yarn run:android
```