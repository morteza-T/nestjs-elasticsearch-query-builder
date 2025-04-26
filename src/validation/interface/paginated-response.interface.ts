import { PaginationResDTO } from '../../utils/paginated-response';
import { PaginationDecoratorDTO } from '../DTO/pagination-decorator.dto';

export interface PaginatedResTransformer<T, P = PaginationDecoratorDTO> {
  transform(
    list: Array<Partial<T>>,
    count: number,
    paginationParam: P,
  ): PaginationResDTO<T>
}
