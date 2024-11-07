import { api, LightningElement, track } from 'lwc';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';

export default class SelectedArt extends LightningElement {
    @track showFlow = false;
    @track _selectedRecord;
    
    editMode = false;

    @track inputVariables;

    @api
    set selectedRecord(record) {
        this._selectedRecord = record;
        // Optionally, you can start the flow here if needed
        this.updateInputVariables();
        if (this._selectedRecord && this._selectedRecord.Id) {
            console.log('About to fire notifyFlowOfChange');
            this.notifyFlowOfChange();
        }
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