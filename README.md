# Carousel Application  (Node Js/react Js)

This backend application has been developed to handle all the api's. for a example show slide with limitation, create slide with image,title and sub title , image upload api using cloudinary.


## Run Locally

Clone the project

```bash
  git clone https://github.com/suwendrarms/carouselApi.git
```

## Go to the project directory for Backend Application

```bash
  cd Backend
```
Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```
Your app should now be running on [localhost:3600](http://localhost:3600/).

## Go to the project directory for Frontend Application

```bash
  cd Frontend
```
Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```
Your app should now be running on [localhost:3000](http://localhost:3000/).

## API Documentation

Postman API collection can be located under, 

```http
  Backend/postman/postman_collection.json
```

Import that postman API collection to the postman.
Please refer https://learning.postman.com/docs/getting-started/importing-and-exporting-data/

## API Description

Get All active recode -
http://localhost:3600/api/carousel/:slide - GET

```bash
:slide - number of slide (Example - 1)
```

Image upload with  cloudinary-
http://localhost:3600/file/upload-images - Post

```bash
Request Body :

(form data append image file)
```


Save slide
http://localhost:3600/api/create-slider - POST
```bash
request body:
{
    "title":"Thrid Slide",
    "subtitle":"This is the Thrid slider Image of our carousel",
    "image":"http://res.cloudinary.com/dqwayoedj/image/upload/v1666340239/ImagesCarousel/lesoddyjfgsgrxi3emk3.jpg"
}
```

## Faced Issues

For support, `/issues/issues.md` or join our skype channel.
