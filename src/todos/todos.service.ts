import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,) { }
  async create(dto: CreateTodoDto) {
    const todo = this.todoRepository.create(dto)

    return await this.todoRepository.save(todo)
  }

  findMany() {
    return this.todoRepository.find()
  }

  async update(id: number, dto: CreateTodoDto) {
    const todo = await this.todoRepository.findOne({ where: { id } })
    // check that record exists
    Object.assign(todo, dto)

    return await this.todoRepository.save(todo)
  }

  async delete(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id } })
    this.todoRepository.remove(todo)
    return 'successfully deleted id ' + id
  }
}
