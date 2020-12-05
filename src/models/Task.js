import {Schema, model} from 'mongoose';
import mongosePaginate from 'mongoose-paginate-v2'

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    done:{
        type: Boolean,
        default: false
    }
}, {
    versionKey: false, //evita el __V en el id
    timestamps: true //me genera el createdAt y el updateAt 
})

taskSchema.plugin(mongosePaginate);
export default model('Task', taskSchema);
