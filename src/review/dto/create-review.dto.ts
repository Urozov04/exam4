import { ApiProperty } from "@nestjs/swagger";

export class CreateReviewDto {
    @ApiProperty({
    })
    rating:string

    @ApiProperty({
    })
    comment:string
}
