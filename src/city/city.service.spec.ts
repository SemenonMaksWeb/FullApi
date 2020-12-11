import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { CityService } from './city.service';
import { City } from './city.entity';
const catArray = [new City('Балаково'), new City('Самара'), new City('Питер')];
describe('CityService', () => {
  let service: CityService;
  // let repository: Repository<City>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: getRepositoryToken(City),
          useValue: {
            find: jest.fn().mockResolvedValue(catArray),
          },
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    // repository = module.get<Repository<City>>(getRepositoryToken(City));
  });

  it('Настройка теста', () => {
    expect(service).toBeDefined();
  });
  describe('findAll', () => {
    it('Показывает коректно массив городов', async () => {
      const cats = await service.findAll(undefined);
      expect(cats).toEqual(catArray);
    });
  });
});
