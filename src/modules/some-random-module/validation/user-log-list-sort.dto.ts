import { PaginationOrder } from '../../../validation/enum/pagination-order.enum';

export class UserLogListSortDTO {
  registrationDate?: PaginationOrder.Desc | PaginationOrder.Asc;

  timestamp?: PaginationOrder.Desc | PaginationOrder.Asc;
}
