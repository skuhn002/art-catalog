import { LightningElement, track, wire } from 'lwc';
import getArt from '@salesforce/apex/getArt.getArt';

export default class WebContainer extends LightningElement {
    @track
    artRecords;

    @track
    artRecordsMap = new Map();

    @track _selectedRecord;

    set selectedRecord(record){
        this._selectedRecord = record;
    };

    get selectedRecord(){
        return this._selectedRecord;
    }

    connectedCallback() {
        getArt().then(result => {
            // console.log('result: ');
            // console.log(result);
            this.artRecords = result;

            result.forEach((record, index) => {
                this.artRecordsMap.set(index, record);
            });
        });
    }

    selectArt(event) {
        const itemDiv = event.currentTarget.attributes;
        const index = Number(event.currentTarget.getAttribute('data-index'));
        // console.log(this.artRecordsMap.get(index));
        this.selectedRecord = this.artRecordsMap.get(index);
    }

    handleArtUpdate(event){
        // console.log('event.detail: ');
        // console.log(event.detail);

        getArt().then(result => {
            // console.log('result: ');
            // console.log(result);
            this.artRecords = result;

            result.forEach((record, index) => {
                this.artRecordsMap.set(index, record);
            });
        });
    }
}