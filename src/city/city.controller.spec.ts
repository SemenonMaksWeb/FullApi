import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CreateCityDto } from "./dto/create-city.dto"

describe('CityController', () => {
  let controller: CityController;
  let service: CityService;
  let dataAll  = [
    {name: "Балаково"},
    {name: "Самара"},
    {name: "Питер"}
  ]
  beforeEach(async () => {
    const city: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [
        {
          provide: CityService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(dataAll)
          }
        }
      ],
    }).compile();

    controller = city.get<CityController>(CityController);
    service = city.get<CityService>(CityService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
  describe('root', () => {
    // it('findAll показвает все города', () => {
    //   expect(controller.findAll(undefined)).resolves.toEqual(
    //     {
    //       data:dataAll
    //     }
    //   )
    // });
  });
});
