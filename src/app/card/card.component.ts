import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  title = 'Card Component';
  cards = [
    {
      title: 'ADM',
      description: 'Aeronautical Data Management module comprises of comprehensive aeronautical data solutions, streamline operations, improve accuracy, and empower your airline.',
      icon: 'fa-solid fa-file', 
    },
    {
      title: 'WxM',
      description: 'Weather Management module aims to provide precise, timely, and actionable weather insights ensuring safe and optimized operations for aviation professionals globally.',
      icon: 'fa-solid fa-cloud-sun-rain', 
    },
    {
      title: 'APM',
      description: 'Aircraft Performance Management module is engineered to optimize and monitor the performance of your fleet by providing detailed analytics and actionable insights, ensuring the highest standards of safety and reliability.',
      icon: 'fa-solid fa-plane-departure', 
    },
    {
      title: 'AIRWORTHINESS',
      description: 'Airworthiness management module is dedicated to ensuring the safety and compliance of your aircraft through meticulous monitoring, detailed records, and automated alerts.',
      icon: 'fa-solid fa-plane', 
    },
    {
      title: 'FPM',
      description: 'The Flight Planning Management module facilitates efficient, dependable, and smooth flight planning and management, enabling airlines to provide outstanding service on a global scale.',
      icon: 'fa-solid fa-map', 
    },
    {
      title: 'NOTAM Management',
      description: 'Simplifying NOTAM handling for safer flights. Streamline notifications, enhance safety, and ensure compliance.',
      icon: 'fa-solid fa-flag', 
    },
    {
      title: 'Aircraft Tracking',
      description: 'This module aims to deliver accurate, real-time aircraft tracking and management – enhancing operational efficiency and safety for aviation stakeholders worldwide.',
      icon: 'fa-solid fa-location-arrow', 
    },
    {
      title: 'Dashboard & Reports',
      description: 'Our report and dashboard management module is designed to provide comprehensive, real-time insights into your aviation operations by delivering customizable and intuitive dashboards.',
      icon: 'fa-solid fa-chart-bar', 
    }
  ];
}
