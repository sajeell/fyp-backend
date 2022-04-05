import { Test, TestingModule } from '@nestjs/testing'
import { IntermediaryController } from './intermediary.controller'

describe('IntermediaryController', () => {
  let controller: IntermediaryController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntermediaryController],
    }).compile()

    controller = module.get<IntermediaryController>(IntermediaryController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
