import { CustomerSelectionModel } from "../customer/customer-selection.model";
import { OrderDetailsSelectionModel } from "../order-details/order-details-selection.model";
import { OrderHeaderModel } from "./order-header.model";

export interface OrderHeaderSelectionModel extends OrderHeaderModel {
    id: number;
    customer: CustomerSelectionModel;
    orderDetails: OrderDetailsSelectionModel[];
}
