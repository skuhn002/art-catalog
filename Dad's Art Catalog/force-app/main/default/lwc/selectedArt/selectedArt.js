import { api, LightningElement, track, wire } from 'lwc';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';
import getCosts from '@salesforce/apex/getAdditionalCosts.getCosts';

export default class SelectedArt extends LightningElement {
    @track showFlow = false;
    @track _selectedRecord;
    @track additionalCostRecords = [];
    additionalCostSum;
    
    editMode = false;

    @track inputVariables;

    @api
    set selectedRecord(record) {
        this._selectedRecord = record;
        // Optionally, you can start the flow here if needed
        this.updateInputVariables();
        if (this._selectedRecord && this._selectedRecord.Id) {
            //Flow Stuff - may or may not still need this - probably not, but don't mess with it right now
            console.log('About to fire notifyFlowOfChange');
            this.notifyFlowOfChange();

            getCosts({artId: this._selectedRecord.Id}).then(result => {
                this.additionalCostRecords = Array.isArray(result) ? result : [result];
                console.log('additionalCostRecords: ');
                console.log(this.additionalCostRecords);
                this.additionalCostSum = this.calculateTotalAdditionalCosts();
            });
        }
    }

    calculateTotalAdditionalCosts(){
        var total = 0;
        if (!this.additionalCostRecords) {
            return 0;
        }
        
        this.additionalCostRecords.forEach(record => {
            total += record.Amount__c;
        });

        return total;
    }

    get selectedRecord() {
        return this._selectedRecord;
    }

    notifyFlowOfChange() {
        console.log('Inside notifyFlowOfChange');
        console.log('this.selectedRecord.Id: ' + this.selectedRecord.Id);
        const attributeChangeEvent = new FlowAttributeChangeEvent('Related_Art_Id', this.selectedRecord.Id);
        this.dispatchEvent(attributeChangeEvent);
    }

    updateInputVariables() {
        if (this.selectedRecord) {
            this.inputVariables = [{
                name: "Related_Art_Id",
                type: "String",
                value: this.selectedRecord.Id
            }];
            this.toggleFlowVisibility();
        } else {
            this.inputVariables = [];
        }
    }

    toggleFlowVisibility() {
        // This will cause the flow to re-render with new variables
        this.showFlow = false;
        setTimeout(() => {
            this.showFlow = true;
        }, 100); // A small delay to ensure the DOM updates
    }

    toggleEditMode(){
        this.editMode = !this.editMode;
    }

    handleSuccess(){
        this.editMode = false;

        const updateEvent = new CustomEvent('updated', {
            detail: { message: 'ART UPDATED' }
        });

        // Dispatch the event
        this.dispatchEvent(updateEvent);
    }

    get imgurLiveLink(){
        let theId = this.selectedRecord.Imugr_Link__c.split('_d')[0].split('/').at(-1);
        let theLink = 'https://imgur.com/' + theId;

        return theLink;
    }
}