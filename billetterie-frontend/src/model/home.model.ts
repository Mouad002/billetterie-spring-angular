import { Category } from "./Category.model";


// Interface for EventDTO
export interface AppEvent {
  id: number;
  title: string;
  description: string;
  location: string;
  image: string;
  category: Category;
  dateEvent: string;
  heure: Date;
  status: Status;
  price : number;
  currentPage: number;
    totalPages: number;
   pageSize: number;
}
enum Status {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  Pending = 'PENDING',
  SoldOut = 'SOLD_OUT'
}