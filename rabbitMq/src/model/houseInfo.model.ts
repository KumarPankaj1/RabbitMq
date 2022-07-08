import {Schema,model,SchemaTypes} from 'mongoose';

const houseSchema = new Schema<IStudent.HouseInfo>({
    houseName:{
        type:SchemaTypes.String
    },
    event:{
        eventName:{
        type:SchemaTypes.String
        },
        prize:{
        type:SchemaTypes.String
        },
        participation:{
        type:SchemaTypes.Boolean
        }
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

const House = model<IStudent.HouseInfo>('House', houseSchema);

export default House;