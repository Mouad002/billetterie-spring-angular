import { Category } from './Category.model'; // si nécessaire


export interface Event {
    id:number;
    title:String;
    description:String;
    location:String;
    image:String;
    category:Category;

    
    status:String;

    
    startDate:Date;

    
    endDate:Date;

  }