import { AddressEditionModel } from "../address/address-edition.model";
import { CustomerModel } from "./customer.model";

export interface CustomerEditionModel extends CustomerModel {
    id: number;
    addresses: AddressEditionModel[];
}
