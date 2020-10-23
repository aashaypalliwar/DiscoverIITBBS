const cron = require('node-cron');
const ObjectsToCsv = require('objects-to-csv');
const User = require('../model/dbModel/userModel');
const path = require('path');
const { sendEmail } = require('../utils/sendEmail');

const schedule = {
    hour: '20',
    minutes: '30',
    dayOfMonth: '1'
};

let months = ["jan", "feb", "mar", "apr", "may", "jun", "july", "aug", "sep", "oct", "nov", "dec"];


//Schedule Back Up
let backupTimer = `${schedule.minutes} ${schedule.hour} ${schedule.dayOfMonth} * *`;
cron.schedule(backupTimer, async () => {
    try{
        //Get users and store them in CSV file.
        let allUsers = await User.find({}).lean();
        const csv = new ObjectsToCsv(allUsers);

        let date = new Date();
        let month = date.getMonth();
        let year = date.getFullYear();
        let fileLocation = path.join(__dirname, `../csvFiles/${months[month]+year}.csv`);

        await csv.toDisk(fileLocation);

        //Email the CSV file to superAdmins
        let superAdmins = await User.find({role: "superAdmin"}).select({email: 1, _id:0}).lean();
        let superAdminEmails = superAdmins.map(superAdmin => superAdmin.email);

        await sendEmail({
            email: superAdminEmails,
            subject: `Backup - ${months[month]} ${year}`,
            message: "Hey SuperAdmin, PFA backup CSV.",
            attachments: [{"path": fileLocation}]
        })
        console.log("Backup created and sent successfully");       
    }
    catch(err){
        throw new Error("Error while creating and/or sending backup CSV file.");
    }
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});