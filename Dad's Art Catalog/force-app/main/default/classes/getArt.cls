public class getArt {
    @AuraEnabled(cacheable=true)
    public static List<Art__c> getArt(){
        List<Art__c> art = [SELECT 	Title__c, Artist__c, Date_Acquired__c, Backup_Image_File_Location__c, Backup_Image_File_Path__c, Estimated_Value__c, Imugr_Link__c, Location__c, Purchase_Price__c FROM Art__c];
		return art;
    }
}