import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { TenderService } from 'src/app/service/tender.service';
import { Tender, TenderOffer, TenderOfferItem} from 'src/app/shared/tender.model';

@Component({
  selector: 'app-tenders',
  templateUrl: './tenders.component.html',
  styleUrls: ['./tenders.component.css']
})
export class TendersComponent implements OnInit {

  tenders : Tender[] = [];
  tenderOffers: TenderOffer[] =[];
  selectedTenderOffers: TenderOffer[] =[];
  showingTenderOffers: boolean =false;
  closingTender: boolean=false;

  constructor(public service: TenderService) { }

  ngOnInit(): void {
    this.service.GetTenders()
    .subscribe(res => this.tenders = res);
    this.GetTenderOffers();
    console.log(this.tenderOffers)
  }

  GetTenderOffers(){
    this.service.GetTenderOffers()
    .subscribe(res => this.tenderOffers = res);
    console.log(this.tenderOffers)
  }

  ShowTenderOffers(tenderId: number){

    if(this.showingTenderOffers == true){
      this.showingTenderOffers = false;
      this.selectedTenderOffers = [];
      return;
    }
    for(var offer of this.tenderOffers){
      if(offer.tenderId == tenderId){
        this.selectedTenderOffers.push(offer)
      }
    }
    console.log(this.selectedTenderOffers)
    this.showingTenderOffers = true;
  }

  TotalOfferPrize(offer: TenderOffer){

    let ret = 0
    for(var item of offer.tenderOfferItems){
      ret += item.quantity * item.price;
    }
    return ret;
  }

  ClosingTender(){
    this.closingTender = true;
  }
  CancelClosingTender(){
    this.closingTender = false;
  }
  CloseTender(offer: TenderOffer){
    this.service.CloseTender(offer)
    .subscribe(res => this.ngOnInit());
  }


}
