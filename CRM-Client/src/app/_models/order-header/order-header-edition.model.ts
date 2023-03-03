import { CustomerSelectionModel } from "../customer/customer-selection.model";
import { OrderDetailsEditionModel } from "../order-details/order-details-edition.model";
import { OrderHeaderModel } from "./order-header.model";

export interface OrderHeaderEditionModel extends OrderHeaderModel {
    id: number;
    customer: CustomerSelectionModel;
    orderDetails: OrderDetailsEditionModel[];
}
