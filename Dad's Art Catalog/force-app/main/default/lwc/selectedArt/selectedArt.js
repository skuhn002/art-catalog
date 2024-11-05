import { api, LightningElement } from 'lwc';

export default class SelectedArt extends LightningElement {
    @api
    selectedRecord;

    connectedCallback() {
        // console.log('TEST 1');
        // console.log('(Child) selectedRecord: ');
        // console.log(this.selectedRecord.Title__c);
    }

    // selectedRecord.Title__c
    // selectedRecord.Imugr_Link__c
    // selectedRecord.Artist__c
    // selectedRecord.Purchase_Price__c
    // selectedRecord.Estimated_Value__c
    // selectedRecord.Date_Acquired__c
    // selectedRecord.Location__c
}