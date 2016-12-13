import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { CurrentUserService } from '../current-user.service';


@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.css']
})
export class CurrentUserComponent implements OnInit {
  user: User = new User();

  constructor(private currentUserService: CurrentUserService) { }

  ngOnInit() {
    //this.user = this.currentUserService.getDummyUser();
    this.currentUserService.getCurrentUser().subscribe(user => { this.user = user });

  }

}
