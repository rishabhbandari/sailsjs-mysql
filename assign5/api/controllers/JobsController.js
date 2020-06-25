/**
 * JobsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// const Jobs = require("../models/Jobs");

module.exports = {
    getJobsInfo:function(req,res){
        Jobs.find()
        .exec(function(err,result){
                if(err)
                {
                    return res.json(err);

                }
                res.view("\\pages\\viewData", {jobs:result})
        })
    },
    addData: async function(req, res) {
      
            let jid = req.body.id
            let job = req.body.name
            let qty = req.body.quant 
            var check = await Jobs.find().where({
            and: 
       [
            {jobID: jid},
            {jobName: job},
            {qty: qty}
            ]
            });        
                  
            if (check.length == 0){
            Jobs.create({ID: 50,jobID:jid, jobName:job,qty: qty}).exec(function(err){
            if(err){
            res.json(err)
            }
            res.redirect("/viewData")
            })
            }
            else{
            return res.json("There is a similar field already presen, please do not duplicate")
            }
        },
        updateData:async function(req, res) {

            let jid = req.body.id
            let job = req.body.name
            let qty = req.body.quant 
            var check = await Jobs.find().where({
            and: 
       [ {jobID: jid},
            {jobName: job},
            {qty: qty}
            ]
            });
              if (check.length > 0){
            Jobs.update({ jobName: job})
            .set({
             qty:qty
            }).exec(function(err){
                if(err){
                res.json(err)
                }
                res.redirect("/viewData")
                })
            }
            }
            };
            


