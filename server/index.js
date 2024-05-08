const express= require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/users')

const app  = express()
app.use(cors())
app.use(express.json())

//read
app.get('/',(req,res)=>{
    UserModel.find({})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))    
})

//create
app.post('/create',(req,res)=>{
    UserModel.create(req.body)
    .then(users=>res.json(users))
    .catch(err=>res.json(err))    
})

//update
// app.put('/update',async(req,res)=>{
//     console.log(req.body)
//     const {id,...rest} =req.body
//     console.log(rest)
//     const data = await UserModel.updateOne({_id : id},rest)
//     res.send({success:true, message : "data updated successfully!", data: data})
// })

//update
app.put('/update', async (req, res) => {
    try {
        const { id, ...rest } = req.body; // Güncellenmiş veriyi ve belgenin kimliğini alın
        const updatedDocument = await UserModel.updateOne({ _id: id }, rest); // Belgeyi güncelle
        if (updatedDocument.nModified === 0) {
            return res.status(404).json({ success: false, message: "Belge bulunamadı veya güncellenmedi" });
        }
        res.json({ success: true, message: "Belge başarıyla güncellendi", data: updatedDocument });
    } catch (error) {
        res.status(500).json({ success: false, message: "Sunucu hatası", error: error });
    }
});

//delete
app.delete('/delete/:id',async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const data = await UserModel.deleteOne({_id : id})
    res.send({success:true, message : "data deleted successfully!", data: data})
})
//getuserByid
app.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    UserModel.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "Kullanıcı bulunamadı" });
            }
            res.json(user);
        })
        .catch(err => res.status(500).json({ message: "Sunucu hatası", error: err }));
});
mongoose.connect("mongodb://127.0.0.1:27017/Crud");

app.listen(3001, () =>{
    console.log("Server is running!")
})
