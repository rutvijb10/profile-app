# Profile Builder
## Getting Started

#### 1. Clone and Install

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

#### 2. Start the Node Development Server

Run this command to start the development server :
```
yarn start
```

#### 3. Open Profile Builder App in your iOS simulator

After the development server has opened, run this command to start the app on iOS simulator:
```
yarn run:ios
```

Or, if you prefer Android:
```
yarn run:android
```