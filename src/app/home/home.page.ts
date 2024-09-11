import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonItem, IonList, IonText, IonLabel, IonTextarea, IonFooter, IonIcon } from '@ionic/angular/standalone';
import { FirebaseRTBService } from '../services/firebase-rtb.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageBadgeComponent } from '../message-badge/message-badge.component';
import { addIcons } from 'ionicons';
import { send, arrowBackCircleOutline } from "ionicons/icons";

const ALIAS_KEY = "USER";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonIcon, IonFooter, IonTextarea, IonLabel, IonText, FormsModule, CommonModule, IonList, IonItem, IonButton, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, MessageBadgeComponent],
})

export class HomePage {
  public mensajes: any[] = [];
  public from: string = "";
  public to: string = "";
  public message: string = "";
  public registrado = false;
  constructor(public firebaseService: FirebaseRTBService) {
    this.mensajes = this.firebaseService.mensajes;
    addIcons({ arrowBackCircleOutline, send });
    let alias = localStorage.getItem(ALIAS_KEY);
    if (alias != null) {
      this.registrado = true;
      this.from = alias;
    }
  }
  public enviar() {
    this.firebaseService.enviarMensaje(this.from, this.message);
  }

  public registrarUsuario() {
    this.registrado = true
    localStorage.setItem(ALIAS_KEY, this.from);
  }
}
