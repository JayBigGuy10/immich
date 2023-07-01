import { IMachineLearningRepository } from '@app/domain/index.js';

export const newMachineLearningRepositoryMock = (): jest.Mocked<IMachineLearningRepository> => {
  return {
    classifyImage: jest.fn(),
    encodeImage: jest.fn(),
    encodeText: jest.fn(),
    detectFaces: jest.fn(),
  };
};
