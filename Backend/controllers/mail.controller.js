import Mail from '../controllers/../models/mail.model.js'
import User from '../models/user.model.js'
import SpecificMail from '../models/specificMail.model.js'

const sendMail = async (req, res) => {
    try {
        const { receiverMail, subject, message } = req.body

        const senderId = req.user.user_id
    
        const mailReceiver = await User.findOne({ email: receiverMail });
        if(!mailReceiver){
            return res.status(400).json({ message: "User not found" })
        }
        const receiverId = mailReceiver._id
 
        console.log(`sender:${senderId}, receiverid: ${receiverId}`);

       const newMsg = new Mail({
            senderId,
            receiverId,
            subject,
            message,
       })

       newMsg.save()

       // store send mail in specific mail model
       const senderMail = await User.findById(req.user.user_id)
       console.log(`sender mail ${senderMail.email}`);
       const sendMailExists = await SpecificMail.findOne({email:senderMail.email})
       if(sendMailExists){
        sendMailExists.sendMail.push(newMsg._id)
        await sendMailExists.save();
       }else{
        const storeMailUserSpecific = new SpecificMail({
          email :senderMail.email,
          sendMail :[ newMsg._id],
        })
        await  storeMailUserSpecific.save()
       }
       
      // store receive mail in specific mail model
      const receivedMailExists = await SpecificMail.findOne({email:mailReceiver.email})
      console.log(`received mail ${mailReceiver.email}`);
      if(receivedMailExists){
        receivedMailExists.receiveMail.push(newMsg._id)
        await receivedMailExists.save();
      }else{
       const storeMailUserSpecific = new SpecificMail({
         email :mailReceiver.email,
         receiveMail : [newMsg._id],
       })
      await storeMailUserSpecific.save()
      }
      

      res.status(200).json({message:"send msg successfully",user:req.body})
    } catch (error) {
        console.log(`error in send mail ${error}`);
    }
}


const allSendMail = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const user = await User.findOne( {_id:userId} );
        const allSendMail = await SpecificMail.findOne( {email:user.email} ).populate("sendMail");
        console.log(allSendMail.sendMail);
        res.status(201).json(allSendMail.sendMail)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}


const allReceiveMails = async (req,res)=>{
      try {
        const userId = req.user.user_id;
        const user = await User.findOne( {_id:userId} );
        const allReceivedMail = await SpecificMail.findOne( {email:user.email} ).populate("receiveMail");
        console.log(allReceivedMail.receiveMail);
        res.status(201).json(allReceivedMail.receiveMail)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

const individualMail = async (req, res) => {

    try {
      const { id } = req.params;
      const userId = req.user.user_id
      const authUser = await User.findOne({_id:userId})
      const authEmail = await SpecificMail.findOne({email:authUser.email}).populate("receiveMail").populate("sendMail")
      
      const allMail = [
        ...authEmail.receiveMail,...authEmail.sendMail,
      ]
    
      const mail = allMail.filter((mail)=>mail._id.toString() === id)

      if(mail.length >0){
        res.status(201).json(mail)
      }
      res.status(401).json({message:"something went wrong"})
     
  
    } catch (error) {
      console.error(error);
      res.status(500).send('something went wrong please retry');
    }
  };


  const deleteMail = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.user_id
      const authUser = await User.findById(userId)
      const authEmail = await SpecificMail.findOne({email:authUser.email}).populate("receiveMail").populate("sendMail")
      

      authEmail.receiveMail = authEmail.receiveMail.filter(mail => mail._id.toString() !== id);
      authEmail.sendMail = authEmail.sendMail.filter(mail => mail._id.toString() !== id);
  
      await authEmail.save();
  
      res.status(200).json({ message: "Mail deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error in deleting mail');
    }
  };
  

export  {sendMail,allSendMail,allReceiveMails,individualMail,deleteMail}