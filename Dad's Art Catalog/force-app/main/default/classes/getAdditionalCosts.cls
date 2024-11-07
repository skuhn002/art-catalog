public class getAdditionalCosts {
    @AuraEnabled(cacheable=true)
    public static List<Additional_Cost__c> getCosts(ID artId){
        return [SELECT Description__c, Amount__c FROM Additional_Cost__c WHERE Art__c = :artId];
    }
}