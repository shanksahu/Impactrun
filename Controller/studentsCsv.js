var csv = require('csvtojson');
var path = require('path');
const studentCsvModel = require("../Schema/studentSchemas")



exports.studentcsv = (req, res) => {
try {
    csv()
        .fromFile(req.file.path)

        .then((jsonObj) => {
            //inserting file data into database
            studentCsvModel.create(jsonObj, (err, item) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ message:err })
                }
                else {

                    return res.status(201).send({message:"File successfully uploaded"})
                }
            });
        })
    
} catch (error) {
    res.status(400).json({error:error})
}
}


exports.getresult = async (req, res) => {
    try {
        // finding Id for collection
        const student = await studentCsvModel.findOne({ Id: req.params.id })
        //adding marks
        let totalGetMark = student.Mark1 + student.Mark2 + student.Mark3
        
        //sending response according to pass and fail
        //(assuming 100 total marks for Mark1, Mark2, Mark3 and passing marks is 35% which is 105)
        if (totalGetMark < 105) {
            res.status(200).json({
                Id: student.Id,
                Name: student.Name,
                Result: "Fail"
            })
            console.log(`Id: ${student.Id} is called `);

        } else {
            res.status(200).json({
                Id: student.Id,
                Name: student.Name,
                Result: "Pass"
            })
            console.log(`Id: ${student.Id} is called `);

        }
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

exports.getallresult = async (req, res) => {
    try {
        //retriving from collection
        const student = await studentCsvModel.find({})

        var Pass = []
        var Fail = []
        for (i = 0; i < student.length; i++) {
            // calculating all Id's marks
            var Total = student[i].Mark1 + student[i].Mark2 + student[i].Mark3
            //filtering pass and fail and pusing in to the arrays
            if (Total < 105) {
                Fail.push({ Id: student[i].Id, Name: student[i].Name, Age: student[i].Age, Result: "Fail" })
            } else if (Total >= 105) {
                Pass.push({ Id: student[i].Id, Name: student[i].Name, Age: student[i].Age, Result: "Pass" })
            }
        }
        
        //sending response according to the querystring
        if (req.query.resultStatus == "passed") {
            res.json({ Result: Pass })
            console.log("sent pass result");
        } else if (req.query.resultStatus == "failed") {
            res.json({ Result: Fail })
            console.log("sent fail result");

        }else {
            res.status(400).send("Bad Request")
        }
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

