import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProduct = {
    _id: 'some-id',
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
  };

  const mockProductsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
      };
      mockProductsService.create.mockResolvedValue(mockProduct);
      const result = await controller.create(createProductDto);
      expect(service.create).toHaveBeenCalledWith(createProductDto);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      mockProductsService.findAll.mockResolvedValue([mockProduct]);
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockProduct]);
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      mockProductsService.findOne.mockResolvedValue(mockProduct);
      const result = await controller.findOne('some-id');
      expect(service.findOne).toHaveBeenCalledWith('some-id');
      expect(result).toEqual(mockProduct);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateProductDto: UpdateProductDto = { description: 'Updated Description' };
      const updatedProduct = { ...mockProduct, ...updateProductDto };
      mockProductsService.update.mockResolvedValue(updatedProduct);
      const result = await controller.update('some-id', updateProductDto);
      expect(service.update).toHaveBeenCalledWith('some-id', updateProductDto);
      expect(result).toEqual(updatedProduct);
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      mockProductsService.remove.mockResolvedValue(mockProduct);
      const result = await controller.remove('some-id');
      expect(service.remove).toHaveBeenCalledWith('some-id');
      expect(result).toEqual(mockProduct);
    });
  });
});
