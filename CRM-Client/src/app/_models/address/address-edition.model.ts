import { AddressModel } from "./address.model";

export interface AddressEditionModel extends AddressModel {
    id: number;
    customerId: number;
}
