import { ISystemConfigRepository } from '@app/domain/index.js';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { SystemConfigEntity } from '../entities/index.js';

export class SystemConfigRepository implements ISystemConfigRepository {
  constructor(
    @InjectRepository(SystemConfigEntity)
    private repository: Repository<SystemConfigEntity>,
  ) {}

  load(): Promise<SystemConfigEntity[]> {
    return this.repository.find();
  }

  saveAll(items: SystemConfigEntity[]): Promise<SystemConfigEntity[]> {
    return this.repository.save(items);
  }

  async deleteKeys(keys: string[]): Promise<void> {
    await this.repository.delete({ key: In(keys) });
  }
}
