import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CheckRoles } from 'src/decorators/role.decorator';
import { UserRoles } from 'src/constants';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/user.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(UserRoles.CUSTOMER)
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findById(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(UserRoles.CUSTOMER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(UserRoles.SUPER_ADMIN)
  @Patch(':id')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.delete(+id);
  }
}
