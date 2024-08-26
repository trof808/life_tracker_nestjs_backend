import { Injectable, Logger } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);

  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    this.logger.log(createProjectDto);
    try {
      const mewProject = this.projectRepository.create(createProjectDto);
      return this.projectRepository.save(mewProject);
    } catch (e) {
      this.logger.log(e);
      return Promise.reject(e);
    }
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  async update(id: number, project: UpdateProjectDto): Promise<UpdateResult> {
    this.logger.log(project);
    try {
      return this.projectRepository.update(+id, project);
    } catch (e) {
      this.logger.log(e);
      return Promise.reject(e);
    }
  }

  async remove(id: number): Promise<void> {
    await this.projectRepository.delete(+id);
  }
}
