import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nk-cronometro',
  template: `
  <div class="tab">
    <button class="tablinks" (click)="openTab($event, 'Hora')">Hora Local</button>
    <button class="tablinks" (click)="openTab($event, 'Cronometro')">Cronómetro</button>
    <button class="tablinks" (click)="openTab($event, 'CuentaAtras')">Cuenta Atrás</button>
  </div>
  <!-- Tab content -->
  <div id="Hora" class="tabcontent">
    <h1>{{ hora }}</h1>
  </div>
  <div id="Cronometro" class="tabcontent">
    <h1>
      {{ minutes | number: '2.' }} : {{ seconds | number: '2.' }} : {{ mileseconds | number: '2.' }}
    </h1>
    <p>
      <button (click)='reset()'> Reset </button>
      <button (click)='paused()'>{{ buttonLabel }}</button>
    </p>
  </div>
  <div id="CuentaAtras" class="tabcontent">
  <h1>
  {{ minutes2 | number: '2.' }} : {{ seconds2 | number: '2.' }}
  </h1>
  <p>
    <button (click)='resetCuenta()'> Reset </button>
    <button (click)='pausedCuenta()'>{{ buttonLabel2 }}</button>
  </p>
  </div>
  `,
  styles:[
    `
    .tab {
      width:350px;
      overflow: hidden;
      border: 1px solid #ccc;
      background-color: #f1f1f1;
      margin-right:auto;
      margin-left auto
    }
    .tab button {
      background-color: inherit;
      float: left;
      border: none;
      outline: none;
      cursor: pointer;
      padding: 14px 16px;
      transition: 0.3s;
    }
    .tab button:hover {
      background-color: #ddd;
    }
    
     .tab button.active {
      background-color: #ccc;
    }
    .tabcontent {
      text-align:center;
      justify-content:center;
      width:326px;
      display: none;
      padding: 6px 12px;
      border: 1px solid #ccc;
      border-top: none;
      margin-right:auto;
      margin-left auto
    }
  `
  ] 
})
export class CronometroComponent implements OnInit {
public minutes:number;
public mileseconds:number;
public seconds:number;
public minutes2:number;
public seconds2:number;
public isPaused:boolean;
public isPaused2:boolean;
public buttonLabel:string;
public buttonLabel2:string;
public hora;
  constructor() { 
    this.resetTimer();
    this.resetTimerCuenta();
    //interval en 1000 para 1 segundo
    setInterval(()=>this.cronoNK(),10);
    setInterval(()=>this.cuentaNK(),1000);
    setInterval(()=>this.time(),1000);
  }
  ngOnInit(): void {
    console.log(this.time());
    //Muestra la hora por defecto de primero
    let tabcontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    tabcontent[0].style.display = "active";
    document.getElementById('Hora').style.display = "block";
  }
  public time(){
    //traemos la fecha cada segundo
    let hoy = new Date();
    let h= hoy.getHours()+':'+hoy.getMinutes()+':'+hoy.getSeconds();
    this.hora=h;
  }
  private cronoNK():void{
    //realiza el conteo
    if(!this.isPaused){
      this.buttonLabel = 'Stop';
      if(++this.mileseconds >99){
        this.mileseconds=0;
        if(++this.seconds >59 ){
          this.seconds=0;
          if(++this.minutes >59){
            this.resetTimer();
          }
        }
      }
      
    }
  }
  private cuentaNK():void{
    //realiza la cuenta atras
    if(!this.isPaused2){
      this.buttonLabel2 = 'Stop';
      if(--this.seconds2 <0 ){
        this.seconds2=59;
        if(--this.minutes2 <0){
          this.resetTimerCuenta();
        }
      }
    }
  }
  reset(){
    //resetea cuando se presiona el boton reset
    this.minutes=0;
    this.seconds=0;
    this.mileseconds=0;
    this.buttonLabel='Play';
    this.isPaused=true;
  }
  resetCuenta(){
    //resetea cuando se presiona el boton reset
    this.minutes2=59;
    this.seconds2=59;
    this.buttonLabel2='Play';
    this.isPaused2=true;
  }
  resetTimer(){
    //resetea cuando se usa el contador
    this.minutes=0;
    this.seconds=0;
    this.mileseconds=0;
    this.buttonLabel='Play';
    this.paused();
  }
  resetTimerCuenta(){
    //resetea cuando se usa el contador
    this.minutes2=59;
    this.seconds2=59;
    this.buttonLabel2='Play';
    this.pausedCuenta();
  }
  paused(){
    //alterna entre Play : Stop siempre que este menor que 60
    this.isPaused = !this.isPaused;
    if(this.minutes<60 || this.seconds <60 || this.mileseconds <100){
      this.buttonLabel = this.isPaused ? 'Play':'Stop';
    }
  }
  pausedCuenta(){
    //alterna entre Play : Stop siempre que este menor que 59
    this.isPaused2 = !this.isPaused2;
    if(this.minutes2 <59 || this.seconds2 <59){
      this.buttonLabel2 = this.isPaused2 ? 'Play':'Stop';
    }
  }
  openTab(evt, tabName) {  
    let i, tabcontent, tablinks;
    // Ocultar todas las clases con  class="tabcontent" 
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    // Trae todos los elementos con class="tablinks" y remueve  "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Muestra el contenido segun el boton presionado
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }
}
