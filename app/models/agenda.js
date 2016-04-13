var AgendaSchema = new Schema({
      title: String,
      description: String,
      creationdDate: {type:Date, default:Date.now},
      contacts: [Contact.schema]
    });