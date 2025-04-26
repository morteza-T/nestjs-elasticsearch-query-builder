import { PaginationOrder } from '../validation/enum/pagination-order.enum';
import { PaginationDTO } from '../validation/DTO/pagination.dto';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PaginationElasticDecoratorDTO } from '../validation/DTO/pagination-elastic-decorator.dto';

export const PaginationElasticQuery = createParamDecorator(
  (data: {}, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const { query } = request;

    const paginationOptions = (({
      limit,
      page,
      sort,
      order,
    }: PaginationDTO): PaginationElasticDecoratorDTO => ({
      limit: !Number.isNaN(Number(limit)) ? Number(limit) : 10,
      skip: ((page || 1) - 1) * (limit || 0),
      page: !Number.isNaN(Number(page)) ? Number(page) : 1,
      sort: sort ? { [sort]: order || PaginationOrder.Desc } : {},
    }))(query);

    return paginationOptions;
  },
);
