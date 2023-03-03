import { CustomerCreationModel } from "../customer/customer-creation.model";
import { OrderDetailsCreationModel } from "../order-details/order-details-creation.model";
import { OrderHeaderModel } from "./order-header.model";

export interface OrderHeaderCreationModel extends OrderHeaderModel {
    customer: CustomerCreationModel;
    orderDetails: OrderDetailsCreationModel[];
}
