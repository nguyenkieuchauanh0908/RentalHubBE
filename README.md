- This repo is the backend server for my graduation thesis websites (Basically, it's a platform where people go to search for rental apartments. There are three main roles: Users/Hosts who are looking for rental flats or rental homeowners who want to let apartment seekers know of their places. The management roles are inspector and admin with the main functions to sensor posts from hosts).
- You can go to https://github.com/nguyenkieuchauanh0908/RentalHubFE and https://github.com/nguyenkieuchauanh0908/FE_RentalHubInspector and https://github.com/nguyenkieuchauanh0908/FE_RentalHubAdmin to take a look at the other three repos for the user websites
- To run this repo, follow the steps:

1.  Clone this repo and open the terminal (make sure the directories point to this repo)
2.  Open this repo and run <pre><code>npm install</code></pre> to install all necessary libraries or packages
3.  Create a .env file with the same level as the app folder:
    <pre><code>
      USERNAME = team2
      PASSWORD = team2
      DB_URI = mongodb+srv://team2:team2@cluster1.convg0f.mongodb.net/rental_houses?retryWrites=true&w=majority
      SECRET_KEY = 'team2_eWeb_access_secret'
      SECRET_KEY_FRESH = 'team2_eWeb_refresh_secret'
      SECRET_KEY_FORGOT_PASSWORD = 'team2_eWeb_forgot_password_secret'
      EMAIL_PASSWORD=enxgbqpymrmxkoja
      EMAIL_USERNAME=hoangduyen02052k2@gmail.com
      TWILIO_ACCOUNT_SID=AC789ee3c6aad440d8571fa2e7ff3b13f4
      TWILIO_AUTH_TOKEN=eb2e015719b9d3eb858b0154a5800a11
      TWILIO_VERIFY_SID=VAd4ee9304f7ac0c6b71c7bd00003fd7bc
      API_KEY_ID_RECOGNITION=wktDC61tbuKitbpJJwioMQqwsDgUi6XD
      GOOGLE_CLIENT_ID= 1061309958717-1jpppjgfdofde0b548hrer48mjn0l31i.apps.googleusercontent.com
      GOOGLE_CLIENT_SECRET= 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
      VNPAY_TMN_CODE=KZLB45RG
      VNPAY_SECURE_SECRET=UYDK6K1FZCZA73OKCAVEXJT8PJ16RXC5
      VNPAY_RETURN_URL=http://localhost:3000/vnpay-return
      VNP_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
      VNP_API=https://sandbox.vnpayment.vn/merchant_webapi/api/transaction
      VNP_RETURN_URL=http://localhost:3000/order/vnpay_return
    </code></pre>

4.  Run <pre><code>npm run dev</code></pre> hoặc <pre><code>yarn dev</code></pre>
5.  Demo account for users
    - email: duyen2k2@yopmail.com
    - password: duyen59@
 6. Demo account for admin:
    - email: 20110234@student.hcmute.edu.vn
    - password: chauanh@123
 7. Demo account for inspector:
    - email: hoangvu@yopmail.com
    - password: duyen59@
8. Demo VNPay account:
   - Tài khoản thành toán: Tài khoản test VNPAY:
    - Bank name:	NCB
    - Series 	9704198526191432198
    - username:	NGUYEN VAN A
    - Issue date:	07/15
