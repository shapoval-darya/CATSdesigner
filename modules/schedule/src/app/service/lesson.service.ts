import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Lesson} from '../model/lesson.model';
import {LESSONS} from '../mock/lesson-mock';
import {Login} from '../../../../admin/src/app/model/login';


@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient) {
  }

  getLessons(): Observable<Lesson[]> {
    return of(LESSONS);
  }


  getAllLessons(username: string ): Observable<any> {
    return this.http.post<any>('/Profile/GetProfileInfoCalendar', {userLogin: username});
  }

  getAllSubjects(username: string ): Observable<any> {
    return this.http.post<any>('/Profile/GetProfileInfoSubjects', {userLogin: username});
  }
}
