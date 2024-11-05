import { LightningElement, track, wire } from 'lwc';
import getArt from '@salesforce/apex/getArt.getArt';

export default class WebContainer extends LightningElement {
    artRecords;
    artRecordsMap = new Map();

    @track
    selectedRecord;

    connectedCallback() {
        getArt().then(result => {
            console.log('result: ');
            console.log(result);
            this.artRecords = result;

            result.forEach((record, index) => {
                this.artRecordsMap.set(index, record);
            });
        });
    }

    selectArt(event) {
        const itemDiv = event.currentTarget.attributes;
        const index = Number(event.currentTarget.getAttribute('data-index'));
        console.log(this.artRecordsMap.get(index));
        this.selectedRecord = this.artRecordsMap.get(index);
    }
}