import Mail from '../controllers/../models/mail.model.js'
import User from '../models/user.model.js'
import SpecificMail from '../models/specificMail.model.js'

const sendMail = async (req, res) => {
  try {
    const { receiverMail, subject, message } = req.body

    const senderId = req.user.user_id

    const mailReceiver = await User.findOne({ email: receiverMail });
    if (!mailReceiver) {
      return res.status(201).json({ message: "receiver mail not exists" })
    }
    const receiverId = mailReceiver._id

    // console.log(`sender:${senderId}, receiverid: ${receiverId}`);

    const newMsg = new Mail({
      senderId,
      receiverId,
      subject,
      message,
      isRead:false
    })

    newMsg.save()

    // store send mail in specific mail model
    const senderMail = await User.findById(req.user.user_id)
    console.log(`sender mail ${senderMail.email}`);
    const sendMailExists = await SpecificMail.findOne({ email: senderMail.email })
    if (sendMailExists) {
      sendMailExists.sendMail.push(newMsg._id)
      await sendMailExists.save();
    } else {
      const storeMailUserSpecific = new SpecificMail({
        email: senderMail.email,
        sendMail: [newMsg._id],
      })
      await storeMailUserSpecific.save()
    }

    // store receive mail in specific mail model
    const receivedMailExists = await SpecificMail.findOne({ email: mailReceiver.email })
    console.log(`received mail ${mailReceiver.email}`);
    if (receivedMailExists) {
      receivedMailExists.receiveMail.push(newMsg._id)
      await receivedMailExists.save();
    } else {
      const storeMailUserSpecific = new SpecificMail({
        email: mailReceiver.email,
        receiveMail: [newMsg._id],
      })
      await storeMailUserSpecific.save()
    }


    res.status(200).json({ message: "send msg successfully", user: req.body })
  } catch (error) {

    console.log(`error in send mail ${error}`);
  }
}


const allSendMail = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const user = await User.findOne({ _id: userId });


    const allSendMail = await SpecificMail.findOne({ email: user.email }).populate("sendMail");

    console.log(allSendMail ? allSendMail.sendMail : []);
    res.status(200).json(allSendMail ? allSendMail.sendMail : []);

  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};



const allReceiveMails = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const allReceivedMail = await SpecificMail.findOne({ email: user.email }).populate("receiveMail");
    if (allReceivedMail) {
      res.status(200).json(allReceivedMail.receiveMail);
      console.log(allReceivedMail.receiveMail);
    } else {
      res.status(201).json({ message: 'No received mails found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}


const individualMail = async (req, res) => {

  try {
    const { id } = req.params;
    const userId = req.user.user_id
    const authUser = await User.findOne({ _id: userId })
    const authEmail = await SpecificMail.findOne({ email: authUser.email }).populate("receiveMail").populate("sendMail")

    const allMail = [
      ...authEmail.receiveMail, ...authEmail.sendMail,
    ]

    const mail = allMail.find((mail) => mail._id.toString() === id)
    mail.isRead = true
    await mail.save()
    const senderMail = await User.findOne({_id:mail.senderId})    
    const receiverMail = await User.findOne({_id:mail.receiverId})    


    if (mail) {
      res.status(201).json({data:mail,senderMail,receiverMail})
    }else{
      res.status(404).json({ message: 'Mail not found' })
    }


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


const deleteMail = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.user_id
    const authUser = await User.findById(userId)
    const authEmail = await SpecificMail.findOne({ email: authUser.email }).populate("receiveMail").populate("sendMail")


    authEmail.receiveMail = authEmail.receiveMail.filter(mail => mail._id.toString() !== id);
    authEmail.sendMail = authEmail.sendMail.filter(mail => mail._id.toString() !== id);

    await authEmail.save();

    res.status(200).json({ message: "Mail deleted successfully", id: `${id}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error in deleting mail' });
  }
};


export { sendMail, allSendMail, allReceiveMails, individualMail, deleteMail }