import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://jangamjagan123:Mohan123@cluster0.miai4.mongodb.net/yatrayaan',
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log('DB Connected')
  } catch (err) {
    console.error('DB Connection Error:', err)
    process.exit(1)
  }
}
