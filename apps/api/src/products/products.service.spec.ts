import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let model: Model<ProductDocument>;

  const mockProduct = {
    _id: 'some-id',
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
  };

  const mockProductModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    save: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product.name),
          useValue: mockProductModel,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    model = module.get<Model<ProductDocument>>(getModelToken(Product.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
      };
      mockProductModel.create.mockResolvedValue(mockProduct as any);
      const result = await service.create(createProductDto);
      expect(model.create).toHaveBeenCalledWith(createProductDto);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
        mockProductModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue([mockProduct]),
      } as any);
      const result = await service.findAll();
      expect(model.find).toHaveBeenCalled();
      expect(result).toEqual([mockProduct]);
    });
  });

  describe('findOne', () => {
    it('should find and return a single product by ID', async () => {
        mockProductModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockProduct),
      } as any);
      const result = await service.findOne('some-id');
      expect(model.findById).toHaveBeenCalledWith('some-id');
      expect(result).toEqual(mockProduct);
    });
  });

  describe('update', () => {
    it('should update and return a product', async () => {
      const updateProductDto: UpdateProductDto = { description: 'Updated Description' };
      const updatedProduct = { ...mockProduct, ...updateProductDto };
      mockProductModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedProduct),
      } as any);
      const result = await service.update('some-id', updateProductDto);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith('some-id', updateProductDto, { new: true });
      expect(result).toEqual(updatedProduct);
    });
  });

  describe('remove', () => {
    it('should remove a product and return it', async () => {
        mockProductModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockProduct),
      } as any);
      const result = await service.remove('some-id');
      expect(model.findByIdAndDelete).toHaveBeenCalledWith('some-id');
      expect(result).toEqual(mockProduct);
    });
  });
});
