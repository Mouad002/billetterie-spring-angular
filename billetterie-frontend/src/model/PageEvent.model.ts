import { AppEvent } from "./event.model";
export interface PageEvent {
  content: AppEvent[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}