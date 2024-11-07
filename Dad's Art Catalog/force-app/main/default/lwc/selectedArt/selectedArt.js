import { api, LightningElement, track } from 'lwc';

export default class SelectedArt extends LightningElement {
    @api
    selectedRecord;

    editMode = false;

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
}