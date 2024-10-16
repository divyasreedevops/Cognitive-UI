import { Component } from '@angular/core';
import { SharedService } from 'src/app/service/Apm/shared.service';

@Component({
  selector: 'app-apm-table',
  templateUrl: './apm-table.component.html',
  styleUrl: './apm-table.component.scss'
})
export class ApmTableComponent {

  addMoreData:any=[];
  p: number = 1;
  total: number =0;
  constructor(private service:SharedService){

  }

  ngOnInit(){
    this.service.filterData$.subscribe((data:any) => {
        console.log(data);
        this.filterAircraftData(data);
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

  // filterAircraftData(filterCriteria: any) {
  //   const { aircraftregistration, aircrafttype, departureairport, destinationairport } = filterCriteria;
  
  //   // Filter the aircraft data based on the registration and type
  //   const filteredData = this.aircraftData
  //     .map(aircraft => {
  //       // Check if the aircraft's registration and type match any of the provided values
  //       const registrationMatch = aircraftregistration.includes(aircraft.regNo.trim());
  //       const typeMatch = aircrafttype.includes(aircraft.type.trim());
  
  //       if (registrationMatch && typeMatch) {
  //         // Filter the cityPairs to find only the matching city pair (departure/destination)
  //         const matchingCityPairs = aircraft.cityPairs.filter(
  //           city => city.departure === departureairport && city.destination === destinationairport
  //         );
  
  //         // Return only the object with the matching city pair
  //         if (matchingCityPairs.length > 0) {
  //           return {
  //             ...aircraft,
  //             cityPairs: matchingCityPairs // Only include the matching city pair
  //           };
  //         }
  //       }
  //       return null; // Return null if there's no match
  //     })
  //     .filter(aircraft => aircraft !== null); // Filter out null entries
  
  //   // Log or return the filtered data
  //   console.log(filteredData);
  // }

  filterAircraftData(filterCriteria: any) {
    const { aircraftregistration, aircrafttype, departureairport, destinationairport } = filterCriteria;
  
    // Filter the aircraft data based on the registration and type
    const filteredData = this.aircraftData
      .map(aircraft => {
        // Check if the aircraft's registration and type match any of the provided values
        const registrationMatch = aircraftregistration.includes(aircraft.regNo.trim());
        const typeMatch = aircrafttype.includes(aircraft.type.trim());
  
        if (registrationMatch && typeMatch) {
          // Filter the cityPairs to find only the matching city pair (departure/destination)
          const matchingCityPairs = aircraft.cityPairs.filter(
            city => city.departure === departureairport && city.destination === destinationairport
          );
  
          // Return the aircraft object with cityPairs: either matching cityPairs or an empty array
          return {
            regNo: aircraft.regNo,
            type: aircraft.type,
            cityPairs: matchingCityPairs.length > 0 ? matchingCityPairs : [] // Empty array if no match
          };
        }
        return null; // Return null if there's no match
      })
      .filter(aircraft => aircraft !== null); // Filter out null entries
  
    // Log or return the filtered data
    console.log(filteredData);
  }
  onPageChnage($event:any){

    this.p=$event;
   
   }
 
}
