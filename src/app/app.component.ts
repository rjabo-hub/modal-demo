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
    let contact: Contact = JSON.parse(result.object);
    contact.date = this.formatDate(new Date());
    this.allContacts.push(contact);
    this.hideModal();
  }

  formatDate(date) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();   
    return mm + '/' + dd + '/' + yyyy;
  }

}
