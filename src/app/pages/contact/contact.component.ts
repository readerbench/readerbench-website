import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../demo/api-request.service';
import { ContactData } from './contact.data';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ApiRequestService]
})
export class ContactComponent implements OnInit {

  formData: any;
  loading: boolean;
  showResponse: boolean;
  showSuccess: boolean;
  showError: boolean;

  response: any;
  message: any;

  constructor(private apiRequestService: ApiRequestService) {
    this.apiRequestService.setCommonService(ContactData.serviceName);
  }

  ngOnInit() {
    this.loading = false;
    this.formData = {
      'name': '',
      'email': '',
      'subject': '',
      'message': ''
    };
  }

  sendMessage() {
    this.showResponse = false;
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;

    var data = {
      name: this.formData.name,
      email: this.formData.email,
      subject: this.formData.subject,
      message: this.formData.message
    };

    var process = this.apiRequestService.process(data);
    process.subscribe(response => {
      this.response = response;
      this.loading = false;
      this.showResponse = true;

      if (response.success !== true) {
        this.message = response.data.errorMsg;
        this.showError = true;
        return;
      }

      this.message = response.data.message;
      this.showSuccess = true;
    });
  };

}
