import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateReviewDto {
    @ApiProperty({
        description:"3",
        example:"4",
        required:true
    })
    @IsString()
    @IsNotEmpty()
    rating:string

    @ApiProperty({
        description:"yaxshi mahsulot",
        example:"ajoyib mahsulot",
        required:true
    })
    @IsString()
    @IsNotEmpty()
    comment:string
}
