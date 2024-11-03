import { LightningElement, wire } from 'lwc';
import getArt from '@salesforce/apex/getArt.getArt';

export default class WebContainer extends LightningElement {
    artRecords;

    connectedCallback() {
        getArt().then(result => {
            console.log('result: ');
            console.log(result);
            this.artRecords = result;
        });
    }
}