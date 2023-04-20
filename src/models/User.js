import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },

        senha: {
            type: String,
            required: true
        },

        senhaConfirm: {
            type: String,
            required: true
        },

        dataNascimento: {
            type: Date,
            required: true
        },

        nome: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model('User', userSchema);