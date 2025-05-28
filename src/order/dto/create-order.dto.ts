import {IsNotEmpty,IsString} from 'class-validator'
import { ApiProperty } from "@nestjs/swagger";


export class CreateOrderDto{
    @ApiProperty({
        description:"234000.00",
        example:"245000.00",
        required:true
    })
    @IsString()
    @IsNotEmpty()
    totalPrice:string

    @ApiProperty({
        description:'Televizor,kondisioner',
        example:'Velisoped,kondisioner',
        required:true
    })
    @IsString()
    @IsNotEmpty()
    totalProduct:string

    @ApiProperty({
        description:'Poygoh kochasi 24-xonadon',
        example:'Shuxrat kochasi 21-xonadon',
        required:true,
    })
    @IsString()
    @IsNotEmpty()
    address:string

    @ApiProperty({
        description:'3',
        example:'4',
        default:'5',
        required:true
    })
    @IsString()
    @IsNotEmpty()
    paymentType:string

    @ApiProperty({
        description:'3',
        example:'4',
        default:'5',
        required:true
    })
    @IsString()
    @IsNotEmpty()
    status:string
}
