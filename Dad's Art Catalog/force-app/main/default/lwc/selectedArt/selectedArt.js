import { api, LightningElement } from 'lwc';

export default class SelectedArt extends LightningElement {
    @api
    selectedRecord;

    editMode = false;

    toggleEditMode(){
        this.editMode = !this.editMode;
    }

    handleSuccess(){
        this.editMode = false;
    }
}