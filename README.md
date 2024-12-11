# Crypto Tracker App

## Overview
This application is built with React Native to display live cryptocurrency data. It provides real-time updates and detailed descriptions of various cryptocurrencies.

## Features
1. Live crypto data fetched from the Messari API.
2. Displays cryptocurrency data, including:
   - Description of the cryptocurrency.
   - Changes in the last 1 hour.
   - Changes in the last 24 hours.
3. Backend powered by Node.js and Socket.IO for real-time updates.

## Technology Stack
- **Frontend:** React Native
- **Backend:** Node.js, Socket.IO
- **API:** Messari API


## Installation Guide

### Step 1: Clone the Repository
  ```bash
  git clone https://github.com/AshitomW/CryptoPrice.git
  cd cryptoprice
  ```

2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the backend directory and add the following environment variables:
    ```env
    LIST_URL="?fields=id,slug,symbol,metrics/market_data/price_usd"
    BASE_URL="https://data.messari.io/api/v2/assets"
    BASE_URL_V1="https://data.messari.io/api/v1/assets"
    PORT=3000
    API_KEY=<your_messari_api_key>
    PROFILE_URL="/profile"
    MARKET_URL="/metrics/market-data"
    ```
4. Start the backend server:
    ```bash
    npm start
    ```

### Step 3: Set Up the Frontend
1. Navigate to the frontend directory:
    ```bash
    cd crypt
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the React Native using expo:
    ```bash
    npx expo start
    ```
 ### Running the App
- Make sure both the backend server and the React Native app are running.
- Use an emulator or a physical device to view the app.

## Credits
- **API Source:** [Messari API](https://messari.io)
