const User = require('../model/dbModel/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const { sendEmail } = require('../utils/sendEmail');

exports.unpublish = catchAsync(async(req,res,next)=>{
   
    const emails_to_depublish= req.body.emails;
    // console.log(emails_to_depublish);
    if(!emails_to_depublish){
        return next(new AppError('There are no emails in the request',401));
    }
    roles = ['user'];
    if(req.user.role==="superAdmin"){
        roles.push('Admin');
    }
    const updatedResponse = await User.updateMany({email : {$in : emails_to_depublish},role:{$in : roles},publishStatus:{$eq : true}},{$set : {publishStatus : false}})
    .catch(err=>console.log(err));
    
    
    const unPublishFailedUsers = await User.find({email : {$in :emails_to_depublish}});
    // console.log(updatedUsers);
    unpublish_failed_user_emails = [];
    unpublish_success_user_emails = [];

    for ( let user of unPublishFailedUsers){
        if(user.publishStatus)unpublish_failed_user_emails.push(user.email);
        else unpublish_success_user_emails.push(user.email);
    }
    
   
        await sendEmail({
            email : unpublish_success_user_emails,
            subject : "From Discovery Portal",
            message : "You are unpublished by the superAdmin",
           
        });
    
    if(unpublish_failed_user_emails.length===0)
    {
          res.status(200).json({
                  status:'success',
      
            });
    }
    else{
        res.status(200).json({
            unpublish_failed : unpublish_failed_user_emails
        })
    }


});

exports.publish = catchAsync(async(req,res,next)=>{
   
    const emails_to_publish = req.body.emails;
    // console.log(emails_to_publish);
    if(!emails_to_publish){
        return next(new AppError('There are no emails in the request',401));
    }
    
    const updatedResponse = await User.updateMany({email : {$in : emails_to_publish},role:{$in : ['user','admin']},publishStatus:{$eq : false}},{$set : {publishStatus : true}})
    .catch(err=>console.log(err));
    
    
    const PublishFailedUsers = await User.find({email : {$in :emails_to_publish},publishStatus:{$eq : false}});
    // console.log(updatedUsers);
    publish_failed_user_emails = [];
    for ( let user of PublishFailedUsers){
        publish_failed_user_emails.push(user.email);
    }
    
    if(publish_failed_user_emails.length===0)
    {
          res.status(200).json({
                  status:'success',
      
            });
    }
    else{
        res.status(200).json({
            publish_failed : publish_failed_user_emails
        })
    }


});


exports.unverify = catchAsync(async(req,res,next)=>{
   
    const emails_to_unverify = req.body.emails;
    // console.log(emails_to_);
    if(!emails_to_unverify){
        return next(new AppError('There are no emails in the request',401));
    }
    roles = ['user'];
    if(req.user.role==="superAdmin"){
        roles.push('Admin');
    }
    const updatedResponse = await User.updateMany({email : {$in : emails_to_unverify},role:{$in : roles},verifyStatus:{$eq : true}},{$set : {verifyStatus : false}})
    .catch(err=>console.log(err));
    
    
    const unverifyFailedUsers = await User.find({email : {$in :emails_to_unverify},verifyStatus:{$eq : true}});
    // console.log(updatedUsers);
    unverify_failed_user_emails = [];
    for ( let user of unverifyFailedUsers ){
        unverify_failed_user_emails.push(user.email);
    }
    
    if(unverify_failed_user_emails.length===0)
    {
          res.status(200).json({
                  status:'success',
      
            });
    }
    else{
        res.status(200).json({
            unpublish_failed : unverify_failed_user_emails
        })
    }


});

exports.verify = catchAsync(async(req,res,next)=>{
   
    const emails_to_verify = req.body.emails;
    // console.log(emails_to_verify);
    if(!emails_to_verify){
        return next(new AppError('There are no emails in the request',401));
    }
    roles = ['user'];
    if(req.user.role==="superAdmin"){
        roles.push('Admin');
    }
    const updatedResponse = await User.updateMany({email : {$in : emails_to_verify},role:{$in : roles},verifyStatus:{$eq : false}},{$set : {verifyStatus : true}})
    .catch(err=>console.log(err));
    
    
    const verifyFailedUsers = await User.find({email : {$in :emails_to_verify},verifyStatus:{$eq : false}});
    // console.log(updatedUsers);
    verify_failed_user_emails = [];
    for ( let user of verifyFailedUsers){
        verify_failed_user_emails.push(user.email);
    }
    
    if(verify_failed_user_emails.length===0)
    {
          res.status(200).json({
                  status:'success',
      
            });
    }
    else{
        res.status(200).json({
            verify_failed : verify_failed_user_emails
        })
    }


});
