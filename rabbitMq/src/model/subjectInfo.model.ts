import {Schema,model,SchemaTypes} from 'mongoose';

const subjectSchema = new Schema<IStudent.SubjectInfo>({
    subjectName:{
        type:SchemaTypes.String
    },
    studentInfo:{
        name:{
            type:SchemaTypes.String
        },
        rollNo:{
            type:SchemaTypes.Number
        },
        email:{
            type:SchemaTypes.String
        },
    }
},{
    timestamps: true
  }
)

const Subject = model<IStudent.SubjectInfo>('Subject', subjectSchema);

export default Subject;