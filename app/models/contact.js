var ContactSchema = new Schema({
      firstName: String,
      lastName: String,
      favourite: Boolean,
      bornDate: Date,
      phone: String,
      email: String,
      creationdDate: {type:Date, default:Date.now}
    });