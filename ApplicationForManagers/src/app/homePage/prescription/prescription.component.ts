import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from 'src/app/service/prescription.service';
import { Medicine } from 'src/app/shared/medicine.model';
import { MedicineService } from 'src/app/shared/medicine.service';
import { PrescriptionModel } from 'src/app/shared/prescription.model';
import { SendingPrescriptionModel } from 'src/app/shared/sendingPrescription.model';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {

  prescriptions: PrescriptionModel[] = [];
  isAvailable: boolean = true;
  method: string = "";

  constructor(public service: PrescriptionService, public medicineService: MedicineService) { }

  ngOnInit(): void {
    this.prescriptions = this.service.prescriptions;
  }

  checkAvailability(prescription: PrescriptionModel){
    var quantity: number = +prescription.Quantity;
    var medicine : Medicine = {
      name: prescription.MedicineName,
      quantity: quantity
    }
    this.medicineService.checkMedicine(medicine);
    this.isAvailable = true;
  }

  sendPrescription(prescription: PrescriptionModel){
    var sending: SendingPrescriptionModel = {
      Prescription: prescription,
      Method: this.method
    }
    console.log(sending)
    this.service.sendPrescription(sending);
  }

}
