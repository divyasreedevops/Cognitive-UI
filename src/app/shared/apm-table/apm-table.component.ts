import { Component } from '@angular/core';

@Component({
  selector: 'app-apm-table',
  templateUrl: './apm-table.component.html',
  styleUrl: './apm-table.component.scss'
})
export class ApmTableComponent {
  aircraftData = [
    {
      regNo: 'VT-IIU',
      type: 'A320-215N',
      cityPairs: [
        { departure: 'VAJL', destination: 'VAAB', isHighlighted: false },
        { departure: 'VIDP', destination: 'VEVU', isHighlighted: false },
        { departure: 'VEVU', destination: 'VIBK', isHighlighted: false },
        { departure: 'VIDN', destination: 'VOCP', isHighlighted: false },
        { departure: 'VRAH', destination: 'VIDP', isHighlighted: false } ,
        
      ]
    },
    {
      regNo: 'A9C-DHS',
      type: 'B767-323',
      cityPairs: [
        { departure: 'VYAS', destination: 'VIDP', isHighlighted: false },
        { departure: 'VIDP', destination: 'VECC', isHighlighted: false },
        { departure: 'VECC', destination: 'VTSS', isHighlighted: false },
        { departure: 'VTPH', destination: 'VIDP', isHighlighted: false } 
      ]
    },
    // Add more data similarly...
  ];
  
}
