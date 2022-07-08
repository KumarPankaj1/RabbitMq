import {Schema,model,SchemaTypes} from 'mongoose';

const studentSchema = new Schema<IStudent.StudentInfo>({
    name:{
        type:SchemaTypes.String,
        required: true
    },
    rollNo:{
        type:SchemaTypes.Number,
        required: true
    },
    email:{
        type:SchemaTypes.String,
        unique: true,
        required: true
    },
},{
    timestamps: true
  }
)

const Student = model<IStudent.StudentInfo>('Student', studentSchema);

export default Student;