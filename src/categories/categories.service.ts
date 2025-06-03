import {
  ConflictException,
  Injectable,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.models';
import { catchError } from 'src/utils/catch-error';
import { sucResponse } from 'src/utils/success-response';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private model: typeof Category) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const { name } = createCategoryDto;
      const lower = String(name).toLowerCase();
      const existCategory = await this.model.findOne({
        where: { name: lower },
      });
      if (existCategory) {
        throw new ConflictException('This category is already exists');
      }
      const category = await this.model.create({
        ...createCategoryDto,
        name: lower,
      });
      return sucResponse('Category created successfully', category);
    } catch (error) {
      return catchError(error);
    }
  }

  async findAll() {
    try {
      const allCategories = await this.model.findAll();
      return sucResponse('All users', allCategories);
    } catch (error) {
      return catchError(error);
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.model.findByPk(id);
      if (!category) {
        throw new NotFoundException(`Category not found which that id ${id}`);
      }
      return sucResponse('success', category);
    } catch (error) {
      return catchError(error);
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const categoryById = await this.model.findByPk(id);
      if (!categoryById) {
        throw new NotFoundException('Not found');
      }
      let { name } = updateCategoryDto;
      if (name) {
        name = String(name).toLowerCase();
      }
      const existCategory = await this.model.findOne({ where: { name } });
      if (existCategory) {
        throw new ConflictException('This category already exists');
      }
      const category = await this.model.update(
        { ...updateCategoryDto, name },
        { where: { id }, returning: true },
      );
      return sucResponse('success', category);
    } catch (error) {
      return catchError(error);
    }
  }

  async delete(id: number) {
    try {
      const category = await this.model.findByPk(id);
      if (!category) {
        throw new NotFoundException(`Category not found which that id ${id}`);
      }
      await this.model.destroy({ where: { id } });
      return sucResponse('Category deleted', {});
    } catch (error) {}
  }
}
