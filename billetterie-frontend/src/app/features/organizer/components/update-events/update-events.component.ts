import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-events',
  standalone: false,
  templateUrl: './update-events.component.html',
  styleUrl: './update-events.component.css'
})
export class UpdateEventsComponent implements OnInit{

  eventFormGroup! : FormGroup;
  eventId! : number;

  constructor(private eventService : EventsService, private router : Router, private fb : FormBuilder, private route : ActivatedRoute){}


  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.eventFormGroup = this.fb.group({
      title: [''], // c'est la méme chose que ca : title : this.fb.control(null),
      description: [''],
      date: [''],
      time: [''],
      location: [''],
      category: [''],
      capacity: [''],
      image: [null]
    })
  }
}
