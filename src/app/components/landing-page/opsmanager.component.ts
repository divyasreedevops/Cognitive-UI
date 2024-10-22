import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-opsmanager',
  templateUrl: './opsmanager.component.html',
  styleUrl: './opsmanager.component.css'
})
export class OpsManagerComponent {

  constructor(private sharedService: SharedService){}

    cards = [
        {
          title: 'ADM',
          description: 'Aeronautical Data Management module comprises of comprehensive aeronautical data solutions, streamline operations, improve accuracy, and empower your airline.',
          icon: '../../assets/icons/6.png',
          router: '/videoclip',
        },
        {
          title: 'WxM',
          description: 'Weather Management module aims to provide precise, timely, and actionable weather insights ensuring safe and optimized operations for aviation professionals globally.',
          icon: '../../assets/icons/7.png', 
          router: '/videoclip',
        },
        {
          title: 'APM',
          description: 'Aircraft Performance Management module is engineered to optimize and monitor the performance of your fleet by providing detailed analytics and actionable insights, ensuring the highest standards of safety and reliability.',
          icon: '../../assets/icons/4.png', 
          router: '/videoclip',
        },
        {
          title: 'AIRWORTHINESS',
          description: 'Airworthiness management module is dedicated to ensuring the safety and compliance of your aircraft through meticulous monitoring, detailed records, and automated alerts.',
          icon: '../../assets/icons/5.png', 
          router: 'opsmanager',
        },
        {
          title: 'FPM',
          description: 'The Flight Planning Management module facilitates efficient, dependable, and smooth flight planning and management, enabling airlines to provide outstanding service on a global scale.',
          icon: '../../assets/icons/1.png', 
          router: 'opsmanager',
        },
        {
          title: 'NOTAM Management',
          description: 'Simplifying NOTAM handling for safer flights. Streamline notifications, enhance safety, and ensure compliance.',
          icon: '../../assets/icons/3.png', 
          router: '/videoclip',
        },
        {
          title: 'Aircraft Tracking',
          description: 'This module aims to deliver accurate, real-time aircraft tracking and management – enhancing operational efficiency and safety for aviation stakeholders worldwide.',
          icon: '../../assets/icons/8.png', 
          router: 'opsmanager',
        },
        {
          title: 'Dashboard & Reports',
          description: 'Our report and dashboard management module is designed to provide comprehensive, real-time insights into your aviation operations by delivering customizable and intuitive dashboards.',
          icon: '../../assets/icons/2.png', 
          router: 'opsmanager',
        }
      ];

      onCardSelected(cardTitle: string) {
        console.log(cardTitle,"sdjcdbcuiwbhvhjvrivgbrvruiv")
        this.sharedService.updatenavbar(cardTitle);
      }
}