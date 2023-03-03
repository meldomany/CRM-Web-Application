import { AddressCreationModel } from "../address/address-creation.model";
import { CustomerModel } from "./customer.model";

export interface CustomerCreationModel extends CustomerModel {
    addresses: AddressCreationModel[];
}