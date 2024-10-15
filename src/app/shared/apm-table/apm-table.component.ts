import { Component } from '@angular/core';
import { SharedService } from 'src/app/service/Apm/shared.service';

@Component({
  selector: 'app-apm-table',
  templateUrl: './apm-table.component.html',
  styleUrl: './apm-table.component.scss'
})
export class ApmTableComponent {

  addMoreData:any=[];
  constructor(private service:SharedService){

  }

  ngOnInit(){
    this.service.filterData$.subscribe((data:any) => {

    })

    this.service.addMoreData$.subscribe((data:any)=>{
        this.addMoreData=data;
        this.updateAircraftData(this.addMoreData);
    })
  }
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
  ];
  
  updateAircraftData(incomingAircraft: any) {
    // Destructure the incoming object
    const { aircraftregistration, aircrafttype, departureairport, destinationairport } = incomingAircraft;
  
    // Check if the aircraft already exists in the aircraftData array
    const aircraftIndex = this.aircraftData.findIndex(
      (aircraft) =>
        aircraft.regNo === aircraftregistration && aircraft.type === aircrafttype
    );
  
    // If the aircraft exists in the array
    if (aircraftIndex > -1) {
      // Get the aircraft object
      const selectedAircraft = this.aircraftData[aircraftIndex];
  
      // Check if the city pair already exists
      const cityPairExists = selectedAircraft.cityPairs.some(
        (pair) => pair.departure === departureairport && pair.destination === destinationairport
      );
  
      // If the city pair doesn't exist, add the new city pair
      if (!cityPairExists) {
        selectedAircraft.cityPairs.push({
          departure: departureairport,
          destination: destinationairport,
          isHighlighted: false
        });
      }
    } else {
      // If the aircraft does not exist, create a new object and append it to the array
      const newAircraft = {
        regNo: aircraftregistration,
        type: aircrafttype,
        cityPairs: [
          {
            departure: departureairport,
            destination: destinationairport,
            isHighlighted: false
          }
        ]
      };
  
      // Push the new aircraft object to the aircraftData array
      this.aircraftData.push(newAircraft);
    }
  
    // Log or return the updated aircraftData for confirmation
    console.log(this.aircraftData);
  }


}
