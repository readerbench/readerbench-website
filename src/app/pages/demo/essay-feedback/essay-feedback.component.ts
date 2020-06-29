import { Component, OnInit, Input } from '@angular/core';
import { DemoMenuComponent } from '../sections/menu/menu.component';
import { DefaultInputData } from '../demo.component.data';
import { ApiRequestService } from '../api-request.service';
import { DemoComponent } from '../demo.component';
import { ReaderBenchService } from '../../../readerbench.service';
import { EssayFeedbackData } from './essay-feedback.data';
import { Language } from '../languages.data';

@Component({
  selector: 'app-demo-essay-feedback',
  templateUrl: './essay-feedback.component.html',
  styleUrls: ['./essay-feedback.component.css'],
  providers: [ApiRequestService, ReaderBenchService]
})

export class EssayFeedbackComponent implements OnInit {

  componentTitle: string;
  formData: any;
  @Input() advanced: boolean;
  loading: boolean;
  showResults: boolean;
  languages: any;
  language: any;

  response: any;
  score = 0;

  defaultRoText = "Maturizarea literară a lui Mihail Sadoveanu a determinat îndepărtarea tot mai puternică a scriitorului de planurile concrete ale vieții și apropierea de istorie și natură pentru a găsi datele esențiale ale ființei etnice românești. Autorul permanentizează un spațiu și un timp arhaic nedefinit în care natura, omul și celelalte viețuitoare trăiesc într-o armonie aproape deplină după o înțelepciune primordială. Conflictul din Nopțile de Sânziene se rezumă la încercarea misterioasă de apărare a unei păduri în fața amenințării de a fi tăiată de un străin, putând fi asimilat cu un conflict între natură și antinatură sau mai concret între viață și moarte.";

  constructor(private apiRequestService: ApiRequestService, private readerbenchService: ReaderBenchService) {
    this.apiRequestService.setApiService(EssayFeedbackData.serviceName);
  }

  ngOnInit() {
    this.componentTitle = EssayFeedbackData.componentTitle;
    this.languages = EssayFeedbackData.languages;
    this.language = EssayFeedbackData.defaultLanguage;

    this.formData = {
      'text': this.defaultRoText,
      // 'language': DefaultInputData.defaultLanguage()
    };

    this.advanced = false;
    this.loading = false;
    this.showResults = false;

  }

  advancedEmitter($event) {
    this.advanced = $event;
  }

  languageEmitter($event) {
    this.language = $event;
  }

  process() {
    this.loading = true;
    this.showResults = false;

    const data = {
      'text': this.formData['text'],
      // 'language': this.formData['language'].value
    };

    const process = this.apiRequestService.process(data);
    process.subscribe(response => {
     
      this.loading = false;

      if (response.success !== true) {
        alert('Server error occured!');
        return;
      }

      this.response = response.data.feedback;
      this.score = response.data.score;

      this.showResults = true;
    });
  }

}
