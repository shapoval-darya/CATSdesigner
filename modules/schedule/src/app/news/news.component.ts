import { Component, OnInit } from '@angular/core';
import {NewsService} from '../service/news.service';
import {LessonService} from '../service/lesson.service';
import {MatDialog} from '@angular/material/dialog';
import {NewsInfoComponent} from '../modal/news-info/news-info.component';
import {Message} from '../../../../../container/src/app/core/models/message';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  user: any;
  news: any;
  subjects: any[] = [];
  subject: any;
  isEnableNews = true;

  constructor(private newsService: NewsService,
              private lessonservice: LessonService,
              private dialog: MatDialog) { }

  ngOnInit() {
    localStorage.setItem('currentUser', JSON.stringify({id: 10031, role: 'lector', userName: 'popova'}));
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.lessonservice.getAllSubjects(this.user.userName).subscribe(subjects => {
      this.subjects = subjects;
      this.newsService.getAllNews(this.user.userName).subscribe(news => {
        this.news = news;
        if (news !== null && news !== undefined) {
          if (news.length === 0) {
            this.isEnableNews = false;
          }
        } else {
          this.isEnableNews = false;
        }
      });
    });
  }

  public openItemInfo(item: any) {
    const dialogRef = this.dialog.open(NewsInfoComponent, {width: '700px',  position: {top: '10%'}, data: {itemNews: item}});
  }

  public getSubjectShortName(id: number) {
    this.subject = this.subjects.find(subject => subject.Id === id);
    if (this.subject != null) {
      return this.subject.ShortName;
    }
    return '';
  }

  getToolTip(item: any): any {
    this.subject = this.subjects.find(subject => subject.Id == item.SubjectId);
    if (this.subject != null) {
      return this.subject.Name;
    }
  }

  public rerouteToSubject(item: any) {
    const message: Message = new Message();
    message.Value = '/Subject?subjectId=' + item.SubjectId;
    message.Type = 'Route';
    this.sendMessage(message);
  }

  public sendMessage(message: Message): void {
    window.parent.postMessage([{channel: message.Type, value: message.Value}], '*');
  }

  public calcColor(item: any): any {
    this.subject = this.subjects.find(subject => subject.Id == item.SubjectId);
    if (this.subject != null) {

      return '4px solid ' + this.subject.Color;
    }
  }

}