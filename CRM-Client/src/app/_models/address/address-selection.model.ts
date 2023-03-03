import { AddressModel } from "./address.model";

export interface AddressSelectionModel extends AddressModel {
    id: number;
    customerId: number;
}
