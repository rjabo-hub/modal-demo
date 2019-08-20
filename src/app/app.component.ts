import { Component, AfterViewInit } from '@angular/core';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { Contact } from './models/contact';
import { ModalService } from './modal.service';
import { EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ModalService]
})
export class AppComponent implements AfterViewInit {
  title = 'openarc-modal';
  private modal: HTMLElement;
  private contact: Contact;
  private allContacts: Contact[];
  private errorMessage: string;

  constructor(private modalService: ModalService){
    this.contact = new Contact();
    this.allContacts = new Array<Contact>();
  }

  ngAfterViewInit() {
    this.modal = document.getElementById("modal");
    const scope = this;
    window.onmousedown = function(event) {
      if (event.target == scope.modal) {       
        scope.hideModal();
      }
    }
  }

  openModal() {
    this.modal.style.display = "block";
  }

  hideModal() {
    this.modal.style.display = "none";
    this.contact = new Contact();
    this.errorMessage = null;
  }

  onSubmit() {
    this.errorMessage = null;
    this.modalService.createContact(this.contact).then(this.submitSuccess.bind(this))
      .catch(this.submitFail.bind(this));
  }

  submitFail(e) {
    this.errorMessage = e;
  }

  submitSuccess(result) {
    result = JSON.parse(result.object);
    this.allContacts.push(result);
    this.hideModal();
  }

}
