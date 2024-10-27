Guide for successfully cloning and running Flora web application.

STEP 1: Download and install Visual Studio from the official Microsoft website.

STEP 2: After the IDE installation, go to section Code, which is located on a green button around the start of the repository. Click on it.

<div align="center">
    <img src="https://github.com/user-attachments/assets/9ff2a2e6-6b59-45d7-a3b7-a64cb15b80c5" width="500"/>
</div>

STEP 3: Copy the presented link from the HTTPS section.

<div align="center">
    <img src="https://github.com/user-attachments/assets/61ce43c8-058b-4605-947f-8762e0fe9812" width="500"/>
</div>

STEP 4: Open the terminal and go to the directory of your choosing. Type git clone and CTRL + V (which pastes the link for the application), and press enter.

<div align="center">
    <img src="https://github.com/user-attachments/assets/259d1444-6261-474d-ba07-59017798f938" width="500"/>
</div>

STEP 5: Open the folder called "Flora". Inside it you'll find .sln file called "Flora" as well, which opens Visual Studio with the source code for the application.

<div align="center">
    <img src="https://github.com/user-attachments/assets/561c1f3b-c0d6-4d5e-aea0-61e49bbcd38e" width="500"/>
</div>

STEP 6: Click on the https button, which will start the application on a local level.

<div align="center">
    <img src="https://github.com/user-attachments/assets/601ca490-c7a5-49c1-be71-c2d7c314764a" width="500"/>
</div>

STEP 7: Two terminals will open. Look at the one that has list of three components. The first one is named "Local". Copy the https URL and paste it into your browser.

<div align="center">
    <img src="https://github.com/user-attachments/assets/d95bdaa8-0491-4a6e-8b41-74f1eb0d30d3" width="500"/>
</div>

<h1 align="center">LAUNCH:</h1>
<h3>1) Login Form:</h3>
<p>This is the initial page that appears when launching the application: the user login form.</p>
<p>As shown in these pictures, three forms have been created: Login, Registration, and Forgot Password.</p>
<p>They are set up to handle cases of empty user credentials or when incorrect ones are provided.</p>

| ![Image 1](https://github.com/user-attachments/assets/a535bf56-df7c-4dbd-8a8e-d0bfceed9ef0) | ![Image 2](https://github.com/user-attachments/assets/bb483896-5802-4b49-b2c2-2e10cdca2efe) | ![Image 3](https://github.com/user-attachments/assets/b3f144a2-6ec2-4676-8eac-25064a909092) |
|:---:|:---:|:---:|

<h3>2) Main page:</h3>
<p>This is the page users see after logging in. As shown in the image, there is a navigation bar with four navigation links.</p>
<p>After logging in or clicking the "Main" anchor, the user is navigated to the main page where the wiki articles about nature are posted!</p>
<p>It's a wiki page for nature, meaning that there's a lot of different articles about plants. 😊</p>
<p>When the user clicks on the article, they are taken to the article's page. It contains information about the article and an image showing the appearance of the plant.</p>
<p>At the bottom of the article, the author's name and profile picture are displayed, along with two buttons: Save and Delete (if you are the article's creator).</p>
<p>There's also an algorithm, implemented for managing pagination on the main page. And a search filter for articles, used by typing in an input box located at the top of the page.</p>

| ![Image 1](https://github.com/user-attachments/assets/773768fa-ddb5-4eb5-915a-17ad73c30c24) | ![Image 2](https://github.com/user-attachments/assets/c4f09564-3f3e-4ea3-9310-59789271e799) |
|:---:|:---:|

<h3>3) Create Article:</h3>
<p>Upon clicking the "Create Article" navigation link, the user is redirected to the article creation section</p>
<p>In this section, he can specify the title, write a description, set the estimated reading time in minutes for the article, and export an image that shows the appearance of the plant.</p>
<p>The page implements an algorithm for managing empty data or data exceeding the limit.</p>

| ![Image 1](https://github.com/user-attachments/assets/c301aa2d-06ed-4413-ae9b-498f7081dcd3) |
|:---:|

<h3>4) Account:</h3>
<p>Upon clicking the "Account" navigation link, the user is redirected to his account information.</p>
<p>He can view his user credentials and change the default or last exported profile picture.</p>

| ![Image 1](https://github.com/user-attachments/assets/c2a22478-4fb6-4f95-9aff-28a2a11182b0) |
|:---:|

<h3>5) Saved Articles:</h3>
<p>Upon clicking the "Saved Articles" navigation link, the user is redirected to the page with his saved articles.</p>
<p>This page also incorporates pagination and filtering for articles which the user has saved.</p>
<p>The user can click on his saved articles and read them thoroughly as many times as he wants! 😊</p>
<p>At the bottom of the article section, a button is created to remove the article from the saved collection.</p>
