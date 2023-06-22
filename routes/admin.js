var express = require('express');
var router = express.Router();
var boatModel = require('../model/boat_Model')
var routeModel = require('../model/RouteModel')
var JurneyModel = require('../model/JurneyModel')
let employeeModel =  require('../model/employeeModel')
let userModel = require('../model/userModel');
const bookingModel = require('../model/bookingModel');
let cargoModel = require('../model/addCargo')
const PDFDocument = require('pdfkit');
const fs = require('fs');
const { route } = require('.');
/* GET users listing. */
router.get('/', function(req, res, next) {
        res.render('admin/Login')
});
router.get('/home',async (req,res)=>{
        try {
                let employee = await  employeeModel.count();
                let emp = await employeeModel.find();
                let users = await userModel.count();
                let routes = await routeModel.count();
                let rt = await routeModel.find()
                let jurney = await JurneyModel.count();
                let jrny = await JurneyModel.find();
                let boats = await boatModel.find();
                let cargoItems = await cargoModel.find();
                console.log(employee,"hia") 
                if(req.session.availbleBoys){
                        let boys =  req.session.availbleBoys;
                        res.render('admin/home',{boys,employee,users,routes,jurney,routes,jrny,boats,emp,rt,cargoItems})

                }
                res.render('admin/home',{employee,users,routes,jurney,routes,jrny,boats,emp,rt,cargoItems})

        } catch (error) {
                console.log(error)      
        }
 
})
router.post('/add-boat',(req,res)=>{
    try {
        console.log(req.body)
            let addBoat = boatModel.create(req.body)
            console.log("boatadded")
            res.redirect('/admin/home')
    } catch (error) {
            console.log(error)
    }
})
router.post('/add-route',(req,res)=>{
    try {
            let addRoute = routeModel.create(req.body)
            console.log("route added")
            res.redirect('/admin/home')
    } catch (error) {
            console.log(error)
    }
})
router.post('/add-jurney',async(req,res)=>{
    try {
                let availableSeat =  req.body.Seat;
                req.body.availableSeat=availableSeat;
            let addRoute = await JurneyModel.create(req.body)
            console.log("jurney added")
            res.redirect('/admin/home')
    } catch (error) {
            console.log(error)
    }
})
router.get('/approve/:id', async(req,res)=>{
        try {
               let Cid = req.params.id;
              
               let approved = await cargoModel.findByIdAndUpdate({_id:Cid},{$set :{status:"Approved"}})
               console.log("Approved")
               res.redirect('/admin/home')
        } catch (error) {
                console.log(error)
        }
    })
router.post('/addpay',async(req,res)=>{
        try {
                let id = req.body.id;
                let payment = req.body.payment;
                let addpay = await cargoModel.findByIdAndUpdate({_id:id},{$set:{payment:payment}})  
                res.redirect('/admin/home')
        } catch (error) {
              console.log(error)  
        }
})
    router.get('/Empapprove/:id', async(req,res)=>{
        try {
               let Cid = req.params.id;
              
               let approved = await employeeModel.findByIdAndUpdate({_id:Cid},{$set :{status:"Approved"}})
               console.log("Approved")
               res.redirect('/admin/home')
        } catch (error) {
                console.log(error)
        }
    })
    router.get('/delete/:id', async(req,res)=>{
        try {
               let Uid = req.params.id;
              
               let approved = await JurneyModel.findByIdAndDelete({_id:Uid})
               console.log("deleted")
               res.redirect('/admin/home')
        } catch (error) {
                console.log(error)
        }
    })
    router.post('/login',(req,res)=>{
                let name ="admin";
                let password = "admin";
                if(req.body.name ==name && req.body.password==password){
                        res.redirect('/admin/home')
                }else{
                        res.redirect('/admin')
                }
    })
    router.get('/bookingReport',async(req,res)=>{
                try {
                        let booking = await bookingModel.find();
                        const doc = new PDFDocument();
                        doc.fontSize(16)
                        .text('Booking Report', { align: 'center' })
                        .moveDown();

                        booking.forEach(item => {
                                doc.fontSize(14)
                                //    .text(item.tickets, { underline: true })
                                   .moveDown()
                                   .fontSize(12)
                                   .text(`Tickets: ${item.tickets}`)
                                   .text(`userID: ${item.userId}`)
                                   .text(`payment: ${item.payment}`)
                                   .text(`employee: ${item.employee}`)
                                   .moveDown();
                              });
                              doc.pipe(fs.createWriteStream('Bookingreport.pdf'));
                              doc.end();
                          
                              console.log('Report generated successfully');
                        //       client.close();
                              res.redirect('/admin/home')
                } catch (error) {
                                console.log(error)
                }
    })



    router.get('/userReport',async(req,res)=>{
        try {
                let users = await userModel.find();
                const doc = new PDFDocument();
                doc.fontSize(16)
                .text('userReport Report', { align: 'center' })
                .moveDown();

                users.forEach(item => {
                        doc.fontSize(14)
                        //    .text(item.tickets, { underline: true })
                           .moveDown()
                           .fontSize(12)
                           .text(`Name: ${item.userName}`)
                           .text(`email: ${item.email}`)
                           .text(`mobile: ${item.mobile}`)
                           .text(`status: ${item.status}`)
                           .moveDown();
                      });
                      doc.pipe(fs.createWriteStream('userReport.pdf'));
                      doc.end();
                  
                      console.log('Report generated successfully');
                //       client.close();
                      res.redirect('/admin/home')
        } catch (error) {
                        console.log(error)
        }
})
router.get('/empReport', async(req,res)=>{
        try {
                let users = await userModel.find();
                const doc = new PDFDocument();
                doc.fontSize(16)
                .text('employee Report', { align: 'center' })
                .moveDown();

                users.forEach(item => {
                        doc.fontSize(14)
                        //    .text(item.tickets, { underline: true })
                           .moveDown()
                           .fontSize(12)
                           .text(`Name: ${item.userName}`)
                           .text(`email: ${item.email}`)
                           .text(`mobile: ${item.mobile}`)
                           .text(`status: ${item.status}`)
                           .moveDown();
                      });
                      doc.pipe(fs.createWriteStream('EmployeeReport.pdf'));
                      doc.end();
                  
                      console.log('Report generated successfully');
                //       client.close();
                      res.redirect('/admin/home')
        } catch (error) {
                        console.log(error)
        }  
})
router.get('/findBoys/:id',async(req,res)=>{
      
        let id = req.params.id;
                        try {
                                let boys = await employeeModel.find({availableStatus:"free"});
                                if(boys ==[]){
                                        res.json(SelectedBoy ==false) 
                                }
                                console.log(boys)
                                function getRandomNumber(limit) {
                                        return Math.floor(Math.random() * limit);
                                      }
                                      const limit = boys.length; // Specify the limit
                                      const randomNum = getRandomNumber(limit);
                                      console.log(randomNum);                                      
                                SelectedBoy =  boys[randomNum]; 
                                console.log(SelectedBoy)
                                let bosynme =SelectedBoy.userName;
                                let boynumber = SelectedBoy.mobile;
                                let boyid = SelectedBoy._id;
                                console.log(id,"----------")

                                let updatedData = await cargoModel.findByIdAndUpdate({_id:id},{$set :{number:boynumber}});
                                let updatedData2 = await cargoModel.findByIdAndUpdate({_id:id},{$set :{Dboy:bosynme}});
                                let updatedData3 = await cargoModel.findByIdAndUpdate({_id:id},{$set :{boyId:boyid}});

                                res.json(SelectedBoy)
                               

                        } catch (error) {
                          console.log(error)      
                        }
})
    router.get('/logout',(req,res)=>{
        req.session.destroy();
        res.redirect('/')
    })
module.exports = router;
