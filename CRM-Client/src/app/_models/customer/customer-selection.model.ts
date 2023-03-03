import { AddressSelectionModel } from "../address/address-selection.model";
import { CustomerModel } from "./customer.model";

export interface CustomerSelectionModel extends CustomerModel {
    id: number;
    addresses: AddressSelectionModel[];
}