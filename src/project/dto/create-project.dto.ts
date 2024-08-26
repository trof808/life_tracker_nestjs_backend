import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: false })
  description: string;
}
