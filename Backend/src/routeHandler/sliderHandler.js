const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const sliderSchema = require("../schemas/sliderSchema");
const Sliders = new mongoose.model("Sliders", sliderSchema);
var moment = require('moment');


router.post("/create-slider", async (req, res) => {

    try {
            const Already_exit = await Sliders.findOne({
                $and: [{
                    title: req.body.title
                }, {
                    subtitle: req.body.subtitle
                }, {
                    status: 1
                }]
            }, );

            if(Already_exit){
                return res.status(200).json({
                    status: true,
                    dataSet: "",
                    message: "already exists",
                });

            }else{

                if(req.body.title=="" || req.body.subtitle=="" || req.body.image==""){

                    if(req.body.title==""){
                        return res.status(200).json({
                            status: false,
                            dataSet: "",
                            message: "please enter title",
                        });
                    }
                    if(req.body.subtitle==""){
                        return res.status(200).json({
                            status: false,
                            dataSet: "",
                            message: "please enter sub title",
                        });
                    }
                    if(req.body.image==""){
                        return res.status(200).json({
                            status: false,
                            dataSet: "",
                            message: "please select image",
                        });
                    }

                }else{
                    const Sliders_new = new Sliders({
                        title: req.body.title,
                        subtitle: req.body.subtitle,
                        image: req.body.image,
                        status: 1,
                        createdAt: moment().format('x'),
                        updatedAt: null,
                    });
    
                    await Sliders_new.save();
                    
                    return res.status(200).json({
                        status: true,
                        dataSet: Sliders_new,
                        message: "Slider Created successfully!",
                    });
                }
                
            }

    } catch (err) {

        return res.status(500).json({
            message: "Signup failed!",
            err: err,
        });
    }
});

router.get('/carousel/:slides', async (req, res) => {

    var filter = {};

    filter= { status: { $in: [1]}};

    const sort = { createdAt: 'DESC' };

    try {

        if(req.params.slides<=10){
            
            const codes = await Sliders.find(filter).limit(req.params.slides);

            return res.status(200).json({
                status: true,
                dataSet: codes,
                message: "Data found"
            });

        }else{
            return res.status(200).json({
                status: false,
                dataSet: "",
                message: "you can use an only number of maximum 10 sliders"
            });
            
        }
       
    } catch (err) {
        
        return res.status(500).json({
            status: false,
            message: "There was an error on the server side!"
        });
    }
});

module.exports = router;