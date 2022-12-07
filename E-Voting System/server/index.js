const express = require("express");
const bodyParser = require("body-parser");
const cors= require("cors");
const app = express();
const mysql = require("mysql");
const multer = require("multer");
let x = '';
let propr = false;
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
   database: 'evoting'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads');     
    },
    filename: (req, file, callBack) => {
            callBack(null, `${Date.now()}.${file.originalname}`)
        
    }
})
 
const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }
    else{
        callback(null,Error("only image is allowed"))
    }
}
var upload = multer({
    storage: storage,
    fileFilter: isImage
});

app.get("/getCredentials/:id",(req,res)=>{    
    const cms = req.params.id;
     console.log(cms);
    db.query(`Select userlogin.cms_id, userlogin.password, student.semester from userlogin join student on userlogin.cms_id = student.cms_id where userlogin.cms_id='${cms}'`,(err,result)=>{
       res.send(result);
    })    
});
app.get("/getExistRecord/:id",(req,res)=>{    
    const idd = req.params.id;
    
     //console.log(idd);
    db.query(`Select Exists(SELECT * FROM paneldetails where submittedBy='${idd}') as result`,(err,result)=>{
       res.send(result);
       //console.log(result)
    })    
});
app.get("/getAdminCredentials/:id",(req,res)=>{
    const cms = req.params.id;
    db.query(`Select * from admin where Employee_id = '${cms}'`,(err,result)=>{
       res.send(result);
    })    
});
app.get("/getPendingPanels",(req,res)=>{
    db.query("Select panel_id, submittedBy from paneldetails where Status='Pending'",(err,result)=>{
       res.send(result);
    })    
});
app.get("/getApprovedPanels",(req,res)=>{
    db.query("Select panel_id, submittedBy from paneldetails where Status='Approved'",(err,result)=>{
       res.send(result);
    })    
});
app.get("/getStatus/:id",(req,res)=>{
    const cms = req.params.id;
    db.query(`Select feedback, Status FROM paneldetails where submittedBy='${cms}'`,(err,result)=>{
       res.send(result);
    })    
});
app.get("/getRejectedPanels",(req,res)=>{
    db.query("Select panel_id, submittedBy from paneldetails where Status='Rejected'",(err,result)=>{
       res.send(result);
    })    
});
app.post("/sendId",(req,res)=>{
    x = req.body.panelId;
});

app.get("/getAllPanels",(req,res)=>{
    db.query("SELECT candidates.cms_id, paneldetails.submittedBy, student.name,student.fatherName,student.email,student.department,student.semester,student.cgpa,student.contact_num,candidates.picture, posts.postName FROM paneldetails join candidates on paneldetails.submittedBy=candidates.panel_id join student on candidates.cms_id = student.cms_id join posts on candidates.post_id = posts.post_id where candidates.panel_id = ?",x,(err,result)=>{
        res.send(result);
        
        // console.log(result);
    })
})
app.get("/getPosts",(req,res)=>{
    db.query("Select * from posts",(err,result)=>{
      res.send(result);
    })    
});
app.get("/getStudentInfo",(req,res)=>{
    const sqlInsert = "Select * from student";
    db.query(sqlInsert,(err,result)=>{
       res.send(result);
    })    
});
app.get("/getId",(req,res)=>{
    db.query("SELECT * FROM paneldetails",(err,result)=>{
        res.send(result);
    })
});
app.post("/submitFeedback",(req,res)=>{
    const fb = req.body.feedback;
    console.log(fb);
   db.query(`Update paneldetails SET feedback= '${fb}' where submittedBy='${x}'`,(err,result)=>{
    console.log(err);
        res.send(result);
    })
});

app.post("/insert", upload.array("myImage",10), (req,res)=>{
    const obj = JSON.parse(req.body.tags); 
    const filename = req.files;  
    const prrid = JSON.parse(req.body.PrId);
    db.query("Insert into panelDetails SET ?",{panelName:null,symbol:null,submittedBy:prrid,Status:'Pending'},(err,result)=>{
        console.log(err);
    })  
 for(let i=0;i<obj.length;i++)
 {
    db.query("Insert into candidates SET ?",{picture:filename[i].filename
        ,cms_id:obj[i].cms_id,post_id:obj[i].post_id , panel_id:prrid}, (err,result)=>{
       console.log(err);
       
    })   
}
})

app.post("/giveDetails", upload.single("myImage"), (req,res)=>{
    const name = JSON.parse(req.body.name); 
    const {filename} = req.file;  
    db.query(`Update panelDetails SET panelName='${name}', symbol='${filename}', Status='Approved' where submittedBy = '${x}'`,(err,result)=>{
        console.log(err);
    })  
});
app.post("/reject", (req,res)=>{
    db.query(`Update panelDetails SET Status='Rejected' where submittedBy='${x}'`,(err,result)=>{
        console.log(err);
    })  
});
app.get("/getCandidateDetails",(req,res)=>{
    db.query("SELECT paneldetails.panelName, paneldetails.symbol from paneldetails where Status = 'Approved'",(err,result)=>{
        res.send(result);
     })
});
app.listen(3001, ()=>{
    console.log("running on port 3001");
}) 