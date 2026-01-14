import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productModel.create(createProductDto);
  }

  findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
  }

  remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
