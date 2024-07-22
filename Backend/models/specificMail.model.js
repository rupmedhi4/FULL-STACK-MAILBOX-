import mongoose from 'mongoose';
import Mail from './mail.model.js';

const specificMailSchema = mongoose.Schema({
  email: {
    type: String,
  },
  sendMail: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mail",
    }
  ],
  receiveMail: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mail",
    }
  ],
});

const SpecificMail = mongoose.model('SpecificMail', specificMailSchema);

export default SpecificMail;
